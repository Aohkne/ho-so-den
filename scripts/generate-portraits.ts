/**
 * Tiền-render toàn bộ chân dung nhân vật (định nghĩa ở src/data/characters.ts)
 * thành file .svg tĩnh trong public/portraits/ — chạy một lần lúc dev/build,
 * KHÔNG vẽ lại trong trình duyệt của người chơi mỗi lần tải trang.
 *
 * Chạy: `bun run gen:portraits` (đã gắn vào predev/prebuild trong package.json).
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { characters } from "../src/data/characters.ts";
import { portraitSVG } from "../src/features/portraits/portraits.ts";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "portraits");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [id, look] of Object.entries(characters)) {
  const svg = portraitSVG(look, { size: 240 });
  writeFileSync(join(outDir, `${id}.svg`), svg, "utf-8");
  count++;
}

console.log(`[gen:portraits] đã ghi ${count} chân dung vào public/portraits/`);
