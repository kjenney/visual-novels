# visual-novels

A collection of visual novels. Each novel is an independent [Pixi'VN](https://pixi-vn.com)
project (React + Vite + TypeScript), created from the official
[ Pixi'VN visual-novel template](https://github.com/DRincs-Productions/visual-novel-template).

## Available novels

| Name                   | Folder                              | Description                                              |
| ---------------------- | ----------------------------------- | -------------------------------------------------------- |
| `little-red-riding-hood` | [`web/`](web/)                    | The story of Little Red Riding Hood                       |
| `my-visual-novel`      | [`my-visual-novel/`](my-visual-novel/) | A new starter novel created from the Pixi'VN template |

The list of novels is registered in [`novels.json`](novels.json) — that file is what
`scripts/novel.mjs` and `scripts/create-novel.mjs` use to know what exists here.

## Choosing a novel to run

Each novel is a standalone Vite app with its own dependencies, so "choosing a novel"
means choosing which dev server to start. From the repo root:

```bash
# List all registered novels
node scripts/novel.mjs
# (same thing)
npm run list

# Start a novel's dev server — the default action
node scripts/novel.mjs my-visual-novel
node scripts/novel.mjs little-red-riding-hood
# (npm aliases)
npm run dev:my-visual-novel
npm run dev:little-red-riding-hood
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

Any other npm script of a novel works the same way:

```bash
node scripts/novel.mjs my-visual-novel build
node scripts/novel.mjs my-visual-novel preview
node scripts/novel.mjs install my-visual-novel
```

You can also simply `cd` into a novel's folder and use npm directly:

```bash
cd web && npm run dev
```

To run two novels at the same time, start one in each of two terminals — Vite
automatically moves the second server to the next free port (5174, 5175, …).

## Creating a new novel

```bash
node scripts/create-novel.mjs my-new-novel "One-line description"
```

This will:

1. clone the latest Pixi'VN template (main branch of
   [DRincs-Productions/visual-novel-template](https://github.com/DRincs-Productions/visual-novel-template)),
2. fill in the project name and description,
3. run `npm install` and the shadcn UI theme init,
4. register the new novel in `novels.json`.

Afterwards, add a convenience alias to the root `package.json`:

```json
"dev:my-new-novel": "node scripts/novel.mjs my-new-novel"
```

Prefer the official interactive CLI? Run `npx create-pixi-vn@latest` in the folder
where you want the novel — it scaffolds the same default template and walks you
through naming, UI theme and git init.

## Writing a novel

The story lives in TypeScript "label" files inside each novel:

- `src/content/labels/start.label.ts` — the opening scene (entry point)
- `src/content/labels/second.label.ts` — a continuation scene
- `src/content/characters.ts` — character definitions
- `src/assets/` — backgrounds, character sprites and other assets
- `src/routes/` — the main menu and game screen pages

Each novel's own `README.md` has its full project documentation.

## Requirements

- Node.js 18+ (Node 22 recommended) and npm
