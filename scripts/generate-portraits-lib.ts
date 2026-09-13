/**
 * Shared logic to pre-render every character portrait (defined in
 * src/data/characters.ts) into static .svg files under public/portraits/.
 *
 * Called from two places:
 * - scripts/generate-portraits.ts — CLI entry (`bun run gen:portraits`).
 * - vite.config.ts — a plugin hook, so portraits are (re)generated no matter
 *   which command actually invokes Vite. This matters because hosts like
 *   Vercel's zero-config Vite preset run a bare `vite build`, skipping
 *   package.json's `prebuild` npm-lifecycle hook entirely — the old setup
 *   (relying only on `predev`/`prebuild`) silently produced a build with no
 *   portraits, and therefore broken images on the deployed site.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { characters } from "../src/data/characters.ts";
import { portraitSVG } from "../src/features/portraits/portraits.ts";

const here = dirname(fileURLToPath(import.meta.url));
const defaultOutDir = join(here, "..", "public", "portraits");

export function generatePortraits(outDir: string = defaultOutDir): number {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  let count = 0;
  for (const [id, look] of Object.entries(characters)) {
    const svg = portraitSVG(look, { size: 240 });
    writeFileSync(join(outDir, `${id}.svg`), svg, "utf-8");
    count++;
  }
  return count;
}
