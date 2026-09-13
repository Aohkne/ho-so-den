# AGENTS.md

Guide for AI coding agents working in this repo.

## Stack

Vite + TypeScript + Three.js, package-managed and run with **Bun** (`bun.lock` — never generate `package-lock.json`).

## Architecture

Feature-driven, under `src/`:

```
src/
  main.ts                    entry point — loads fonts, boots GameState/ArchiveScene/GameFlow
  data/                      pure game content, no DOM / Three.js
    case-types.ts            CaseFile / Suspect / Evidence / Choice / CaseLink interfaces
    characters.ts             portrait definitions (skin/hair/face/...) keyed by id
    cases/                    one file per case + index.ts aggregating them
  features/
    scene-room/               3D room: cabinets, desk, camera shots, raycasting (scene.ts, props.ts)
    investigation/            game loop: state.ts (save/progress), flow.ts (screen routing), board.ts (evidence board)
    portraits/                portraits.ts (SVG string generator, build-time only) + portrait-assets.ts (runtime URL/cache, never redraws SVG)
    audio/                    Web Audio synth, no external libs
  styles/style.css
scripts/
  generate-portraits.ts       CLI entry, calls generate-portraits-lib.ts
  generate-portraits-lib.ts   reads data/characters.ts, writes public/portraits/*.svg
public/portraits/             generated, gitignored — never commit
```

Portraits are pre-rendered **once** at dev/build time (`gen:portraits`, wired into both `predev`/`prebuild` scripts *and* a Vite `buildStart` plugin hook in `vite.config.ts`) and served as static `.svg` files. Never import `features/portraits/portraits.ts` into browser-run code — it exists solely for build-time SVG generation.

## Conventions

- Import via the `@/` alias (`@/data/...`, `@/features/...`) — configured in both `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`). Never use relative `../` imports inside `src/` (files under `scripts/` are outside the alias and correctly use relative imports).
- Code comments: English, short (2-3 words where possible), only when the *why* isn't obvious.
- Game content and UI copy: Vietnamese. Do not translate strings shown to players — only code comments.
- No feature flags, no speculative abstractions — this is a small, finished game, not a platform.

## Known pitfalls (paid for in real bugs — don't reintroduce)

1. `#experience` must **not** get `position: relative` + `z-index`. That creates its own stacking context, so children's z-index can never be compared against `.hud` / `.status-bar` outside it (previously caused the pager button to be covered by the footer, unclickable).
2. `[hidden] { display: none !important }` in `style.css` must stay. If another rule sets `display` on the same element, it silently defeats the `hidden` attribute.
3. Full-screen overlays must be `pointer-events: none`, with `auto` re-enabled only on interactive children — otherwise they block raycasting into the WebGL canvas.
4. Canvas/SVG text only renders in the right font **after webfonts finish loading** — `main.ts` calls `document.fonts.load()` with an accented sample string (`ẤỆỘỢỮỰ`) so Google Fonts actually fetches the `vietnamese` subset. DM Sans/DM Mono/Instrument Serif do **not** have that subset; the project uses Be Vietnam Pro / IBM Plex Mono / Playfair Display instead.
5. Global keyboard shortcuts must bail out when `dialog[open]` exists, or Escape closes the dialog *and* the screen behind it.
6. Hidden search props must sit outside the desk's top-down projection, or the desk occludes them during the search-mode camera shot.
7. Evidence-board strings must render above the card elements (SVG stacking), or the cards cover most of the string.
8. Hidden search props must default to invisible and only the two belonging to the currently open case become visible/pickable (`scene.enterSearch(activePropIds)`). Showing all of them always leaks other cases' evidence and can put props outside `SEARCH_SHOT`'s camera frame, blocking required-evidence collection — this was only caught via Playwright, not by reading the code.
9. The 4 hidden search-prop meshes are **reused across cases** — `SearchProp.reset()` must run every time a case closes, or the previous case's revealed shape (geometry/material/scale) sticks into the next case.
10. Vite's `configureServer` hook writing to `publicDir` is not reliable within the same dev-server session if the directory didn't exist when the static middleware initialized. Dev correctness relies on `predev` running before Vite starts; `configureServer` is only a same-session self-heal. Production correctness relies on the `buildStart` plugin hook, since hosting platforms' zero-config build commands (e.g. Vercel's Vite preset) skip npm lifecycle scripts entirely.

## Verifying changes

There's no unit-test suite. Verify with:

```bash
bun run typecheck
bun run build
```

For gameplay-affecting changes, drive the app with Playwright (chromium headless) through a full case loop: open case → collect evidence → search room → link evidence board → accuse → verdict. Check `console` for errors — curl/text-only checks can produce false positives (e.g. a 200 response serving `index.html` instead of the expected asset).
