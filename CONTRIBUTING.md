# Contributing

## Setup

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Dev server (pre-generates portraits via `predev`) |
| `bun run build` | Production build into `dist/` |
| `bun run preview` | Preview a production build |
| `bun run typecheck` | `tsc -b`, no emit |
| `bun run gen:portraits` | Pre-render character portraits to `public/portraits/*.svg` |

## Code style

- Import from `src/` using the `@/` alias (`@/data/...`, `@/features/...`), never relative `../` paths.
- Comments are English, short, and only where the *why* isn't obvious from the code.
- Game content (case files, UI copy) stays in Vietnamese — only code comments are English.
- No `package-lock.json` — this project uses Bun (`bun.lock`) exclusively.

## Architecture

Feature-driven layout — see [AGENTS.md](AGENTS.md) for the full breakdown of `src/data/` vs `src/features/`.

## Adding a new case

1. Add character portraits (victim + suspects) to `src/data/characters.ts`.
2. Create `src/data/cases/case-XX.ts` following the `CaseFile` shape in `src/data/case-types.ts` — use `case-01.ts` as a template: brief pages, suspects, evidence (some `source: "file"`, at least a couple `source: "room"` with a `roomProp`), testimonies, `links` for the evidence board, `methods`/`motives`, and `solution`.
3. Register it in the `cases` array in `src/data/cases/index.ts`.
4. Assign a unique `slot: { cabinet, drawer }` — each drawer slot belongs to exactly one case.

## Before submitting

- `bun run typecheck` and `bun run build` must both pass clean.
- If you touch gameplay flow (`features/investigation/`, `features/scene-room/`), manually run through at least one case end-to-end (open → search → board → accuse → verdict).

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat(...):`, `fix(...):`, `refactor(...):`, etc.) with a short, imperative description.
