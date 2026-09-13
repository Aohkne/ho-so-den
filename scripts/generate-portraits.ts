/**
 * CLI entry: `bun run gen:portraits`.
 * Vite itself also runs this via a plugin hook (see vite.config.ts) so it
 * self-generates regardless of how `vite`/`vite build` gets invoked — this
 * script is just a convenient manual/standalone way to run the same thing.
 */
import { generatePortraits } from "./generate-portraits-lib.ts";

const count = generatePortraits();
console.log(`[gen:portraits] wrote ${count} portraits to public/portraits/`);
