#!/usr/bin/env node
/**
 * Create a new visual novel in this repo from the official Pixi'VN template.
 *
 * Usage:
 *   node scripts/create-novel.mjs <name> [description] [--skip-install]
 *
 *   <name>          kebab-case folder/package name, e.g. "the-hollow-crown"
 *   description     one-line description (default: "A new visual novel")
 *   --skip-install  skip `npm install` and the shadcn UI init
 *
 * Template: https://github.com/DRincs-Productions/visual-novel-template
 * (the same default template that `npx create-pixi-vn` scaffolds from)
 */
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    renameSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import os from "node:os";
import process from "node:process";

const TEMPLATE_REPO = "https://github.com/DRincs-Productions/visual-novel-template.git";
const TARBALL_URL =
    "https://api.github.com/repos/DRincs-Productions/visual-novel-template/tarball/main";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "novels.json");

function fail(message) {
    console.error(`Error: ${message}`);
    process.exit(1);
}

function step(message) {
    console.log(`\n==> ${message}`);
}

function run(cmd, args, opts = {}) {
    const result = spawnSync(cmd, args, { stdio: "inherit", ...opts });
    if (result.status !== 0) {
        fail(`${cmd} ${args.join(" ")} exited with code ${result.status}`);
    }
}

function parseArgs(argv) {
    let name = null;
    let description = "A new visual novel";
    let skipInstall = false;
    for (const arg of argv) {
        if (arg === "--skip-install") {
            skipInstall = true;
        } else if (!name) {
            name = arg;
        } else if (description === "A new visual novel") {
            description = arg;
        }
    }
    if (!name) {
        fail("usage: node scripts/create-novel.mjs <name> [description] [--skip-install]");
    }
    if (!/^[a-z0-9][a-z0-9\-_~]*$/.test(name)) {
        fail(`invalid name "${name}" (use lowercase letters, digits, dashes; e.g. my-new-novel)`);
    }
    return { name, description, skipInstall };
}

async function fetchTemplate(targetDir) {
    step("Fetching the latest Pixi'VN visual-novel template...");
    const git = spawnSync("git", [
        "clone",
        "--depth",
        "1",
        TEMPLATE_REPO,
        targetDir,
    ]);
    if (git.status === 0) {
        rmSync(join(targetDir, ".git"), { recursive: true, force: true });
        return;
    }
    console.log("git clone failed, falling back to the GitHub tarball...");
    const response = await fetch(TARBALL_URL, { redirect: "follow" });
    if (!response.ok) {
        fail(`could not download template: ${response.status} ${response.statusText}`);
    }
    const tarball = join(os.tmpdir(), `pixi-vn-template-${Date.now()}.tar.gz`);
    writeFileSync(tarball, Buffer.from(await response.arrayBuffer()));
    const extracted = join(os.tmpdir(), `pixi-vn-extract-${Date.now()}`);
    mkdirSync(extracted, { recursive: true });
    run("tar", ["xzf", tarball, "-C", extracted]);
    const entry = readdirSync(extracted)[0];
    rmSync(targetDir, { recursive: true, force: true });
    renameSync(join(extracted, entry), targetDir);
    rmSync(extracted, { recursive: true, force: true });
    rmSync(tarball, { force: true });
}

async function main() {
    const { name, description, skipInstall } = parseArgs(process.argv.slice(2));
    const targetDir = join(root, name);

    if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
        fail(`"${targetDir}" already exists and is not empty`);
    }

    await fetchTemplate(targetDir);

    step("Filling in the project name and description...");
    const projectName = name
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    const replacements = {
        "my-app-package-name": name,
        "my-app-description": description,
        "my-app-project-name": projectName,
    };
    for (const file of ["package.json", "index.html", "vite.config.ts", "README.md"]) {
        const path = join(targetDir, file);
        if (!existsSync(path)) {
            continue;
        }
        let content = readFileSync(path, "utf8");
        for (const [from, to] of Object.entries(replacements)) {
            content = content.split(from).join(to);
        }
        writeFileSync(path, content);
    }
    rmSync(join(targetDir, "package-lock.json"), { force: true });

    if (!skipInstall) {
        step("Installing dependencies (this can take a few minutes)...");
        run("npm", ["install", "--include=optional"], { cwd: targetDir });
        step("Initializing the shadcn UI theme...");
        run("npm", ["run", "ui:reinit"], { cwd: targetDir });
    } else {
        console.log("\n(skipped install/UI init; run `npm install --include=optional` and `npm run ui:reinit` in the novel folder later)");
    }

    step("Registering the new novel in novels.json...");
    const registry = JSON.parse(readFileSync(registryPath, "utf8"));
    registry.novels = registry.novels ?? [];
    if (!registry.novels.some((novel) => novel.name === name)) {
        registry.novels.push({ name, dir: name, description });
        writeFileSync(registryPath, `${JSON.stringify(registry, null, 4)}\n`);
    }

    console.log(`
Done! A new novel "${name}" was created in ${targetDir}.

Next steps:
  1. Add an alias to the root package.json scripts, e.g.:
       "dev:${name}": "node scripts/novel.mjs ${name}"
  2. Start writing the story in ${targetDir}/src/content/labels/
  3. Run it with:
       node scripts/novel.mjs ${name}
       npm run dev:${name}   (after adding the alias)
`);
}

main().catch((err) => fail(err.message));
