import { cases } from "@/data/cases";
import { GameFlow } from "@/features/investigation/flow";
import { GameState } from "@/features/investigation/state";
import type { LabelStatus } from "@/features/scene-room/props";
import { ArchiveScene } from "@/features/scene-room/scene";

// Preload fonts
async function loadFonts() {
  if (!("fonts" in document)) return;
  const sample = "ẤỆỘỢỮỰăâđêôơư";
  try {
    await Promise.all([
      document.fonts.load(`400 40px "IBM Plex Mono"`, sample),
      document.fonts.load(`500 40px "IBM Plex Mono"`, sample),
      document.fonts.load(`500 44px "Playfair Display"`, sample),
      document.fonts.load(`400 16px "Be Vietnam Pro"`, sample),
    ]);
    await document.fonts.ready;
  } catch {
    // Fallback fonts
  }
}

async function boot() {
  const world = document.getElementById("world");
  if (!world) throw new Error("Missing #world");

  await loadFonts();

  const state = new GameState();
  const scene = new ArchiveScene(world, cases, (c) => state.statusOf(c) as LabelStatus);
  const flow = new GameFlow(scene, state);

  scene.start();
  flow.start();
}

boot();
