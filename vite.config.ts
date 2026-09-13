import { defineConfig, type Plugin } from "vite";
import { generatePortraits } from "./scripts/generate-portraits-lib";

/**
 * `buildStart` is the real fix for production: a host's zero-config Build
 * Command (e.g. Vercel's Vite preset runs bare `vite build`) skips
 * package.json's `prebuild` script entirely, which used to ship a build with
 * no portrait images at all. Rollup's own public-dir copy step runs after
 * `buildStart`, so files written here are picked up correctly.
 *
 * `configureServer` is NOT an equivalent fix for `vite dev` — Vite's static
 * middleware for publicDir is set up before this hook's write finishes, so a
 * directory that doesn't exist yet at that exact moment won't be found for
 * the rest of that server session. Local dev correctness instead relies on
 * the `predev` npm-lifecycle script (package.json) running first; this hook
 * is just a same-session self-heal for a subsequent restart.
 */
function portraitsPlugin(): Plugin {
  return {
    name: "generate-portraits",
    buildStart() {
      generatePortraits();
    },
    configureServer() {
      generatePortraits();
    },
  };
}

export default defineConfig({
  plugins: [portraitsPlugin()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
        },
      },
    },
  },
});
