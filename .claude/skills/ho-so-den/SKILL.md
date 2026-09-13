---
name: ho-so-den
description: Run and drive the Hồ Sơ Đen detective game (Vite + Three.js) locally for manual testing or Playwright-driven regression checks.
---

# Running Hồ Sơ Đen

Vite + TypeScript + Three.js game, run with Bun.

## Launch

```bash
bun install       # first time only
bun run dev        # starts Vite dev server, pre-generates portraits via `predev`
```

Open `http://localhost:5173` (Vite prints the actual port if 5173 is busy).

```bash
bun run build && bun run preview   # production build + preview
bun run typecheck                  # tsc -b, no emit
```

## Driving it (Playwright)

This is a WebGL/canvas app — there's no accessible DOM tree for the 3D room, so verification happens through screenshots and the DOM overlay (HUD, dialogs, screens), not `console.log` of internal state.

Key selectors (see `src/features/investigation/flow.ts` for the full list):
- `#btn-new` / `#btn-continue` — start/resume from the title screen
- `#btn-accept` — briefing → room
- Drawer meshes are inside the WebGL canvas — click case cards via the `object-prompt` / `#object-action` button that appears on hover, not by clicking the canvas blindly
- `#btn-search`, `#btn-search-done` — enter/exit room-search mode
- `#btn-board`, `#btn-accuse`, `#btn-submit` — evidence board and accusation flow
- `#index-button` → `#index-dialog` — case index / save-progress overview

A full 7-case regression loop (open → collect file evidence → search room for hidden evidence → link evidence board → accuse → verdict, repeated per case) is the strongest signal that a change didn't break gameplay. Always launch a **fresh** page load and avoid editing source files while a Playwright run is in flight — Vite's HMR full-reloads the page on file changes, which reads as a false regression (element detached from DOM, unexpected navigation).

## Known pitfalls

See [AGENTS.md](../../../AGENTS.md) at the repo root — section "Known pitfalls" — before touching `scene.ts`, `props.ts`, `style.css`, or the font-loading gate in `main.ts`.
