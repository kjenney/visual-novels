#!/usr/bin/env node
/**
 * Select a visual novel in this repo and run one of its npm scripts.
 *
 * Usage:
 *   node scripts/novel.mjs                      list all registered novels
 *   node scripts/novel.mjs <name>               start <name>'s dev server
 *   node scripts/novel.mjs <name> <script>      run another script of <name>
 *                                               (build, preview, start, ...)
 *   node scripts/novel.mjs install <name>       install <name>'s dependencies
 *
 * The registry lives in novels.json at the repo root.
 */
import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import process from "node:process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "novels.json");

function fail(message) {
    console.error(`Error: ${message}`);
    process.exit(1);
}

function loadNovels() {
    if (!existsSync(registryPath)) {
        fail(`no novels.json found in ${root}`);
    }
    const registry = JSON.parse(readFileSync(registryPath, "utf8"));
    return Array.isArray(registry.novels) ? registry.novels : [];
}

function printList(novels) {
    console.log(`Visual novels in ${root}:\n`);
    for (const novel of novels) {
        const dir = join(root, novel.dir);
        const missing = existsSync(join(dir, "package.json")) ? "" : "  (missing!)";
        console.log(`  ${novel.name}`);
        console.log(`      folder: ${novel.dir}${missing}`);
        if (novel.description) {
            console.log(`      ${novel.description}`);
        }
    }
    console.log("\nRun one with:  node scripts/novel.mjs <name> [npm-script]");
    console.log("Examples:     node scripts/novel.mjs my-visual-novel");
    console.log("              node scripts/novel.mjs my-visual-novel build");
}

function runNpm(npmArgs, cwd) {
    // Run npm in its own process group so killing this script (Ctrl+C, `kill <pid>`)
    // also stops the dev server npm started, which npm itself may not forward to.
    const detached = process.platform !== "win32";
    const child = spawn("npm", npmArgs, { cwd, stdio: "inherit", detached });
    const forward = (signal) => {
        try {
            process.kill(detached ? -child.pid : child.pid, signal);
        } catch {
            child.kill(signal);
        }
    };
    for (const signal of ["SIGINT", "SIGTERM"]) {
        process.on(signal, forward);
    }
    child.on("error", (err) => fail(err.message));
    child.on("close", (code) => process.exit(code ?? 0));
}

const args = process.argv.slice(2);

if (args.length === 0) {
    printList(loadNovels());
    process.exit(0);
}

const novels = loadNovels();

if (args[0] === "install") {
    const name = args[1];
    if (!name) {
        fail(`install requires a novel name (one of: ${novels.map((n) => n.name).join(", ")})`);
    }
    const novel = novels.find((n) => n.name === name);
    if (!novel) {
        fail(`unknown novel "${name}" (available: ${novels.map((n) => n.name).join(", ")})`);
    }
    const dir = join(root, novel.dir);
    if (!existsSync(join(dir, "package.json"))) {
        fail(`no package.json found in ${dir}`);
    }
    runNpm(["install", "--include=optional"], dir);
    process.exit(0);
}

const [name, script = "dev", ...rest] = args;
const novel = novels.find((n) => n.name === name);
if (!novel) {
    fail(`unknown novel "${name}" (available: ${novels.map((n) => n.name).join(", ")})`);
}
const dir = join(root, novel.dir);
if (!existsSync(join(dir, "package.json"))) {
    fail(`no package.json found in ${dir}`);
}

const npmArgs = ["run", script];
if (rest.length > 0) {
    npmArgs.push("--", ...rest);
}
runNpm(npmArgs, dir);
