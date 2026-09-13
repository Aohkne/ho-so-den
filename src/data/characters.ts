import type { PortraitLook } from "../features/portraits/portraits";

/**
 * Toàn bộ chân dung nhân vật trong game, theo id.
 * Chỉ dùng bởi `scripts/generate-portraits.ts` (build-time) — không import
 * vào bất kỳ module nào chạy trong trình duyệt. Runtime chỉ cần biết id để
 * dựng URL `/portraits/<id>.svg` (xem `features/portraits/portrait-assets.ts`).
 */
export const characters: Record<string, PortraitLook> = {
  detective: { skin: "#c9a583", hair: "#3b3229", hairStyle: "hidden", face: "square", cloth: "#5b5f4e", accent: "#934235", hat: "fedora" },

  // ── Vụ 01 — Ngọn đèn tắt lúc 21:47 ──
  "c1-victim": { skin: "#c9a17c", hair: "#7d7468", hairStyle: "thin", face: "square", cloth: "#33383f", accent: "#8a8f7f", glasses: true },
  "c1-cross": { skin: "#e0bb96", hair: "#4a3227", hairStyle: "bob", face: "oval", cloth: "#6b5a72", accent: "#c6ae7e", lips: true },
  "c1-hale": { skin: "#d3a87e", hair: "#2f2a24", hairStyle: "short", face: "square", cloth: "#3f4a5a", accent: "#934235", hat: "fedora", mustache: true },
  "c1-pym": { skin: "#cba585", hair: "#b8b3a5", hairStyle: "thin", face: "long", cloth: "#4a5a3f", accent: "#c6ae7e", hat: "cap", glasses: true },
  "c1-renn": { skin: "#e3c6a4", hair: "#5a3f2e", hairStyle: "bun", face: "long", cloth: "#7a3f3a", accent: "#e8e6d9", lips: true },

  // ── Vụ 02 — Người đàn bà ở bến 9 ──
  "c2-victim": { skin: "#e6c9a3", hair: "#8a2f2f", hairStyle: "bun", face: "oval", cloth: "#5a2f4a", accent: "#c6ae7e", lips: true },
  "c2-marsh": { skin: "#c9977a", hair: "#4a4038", hairStyle: "short", face: "square", cloth: "#4a3f35", accent: "#c6ae7e", mustache: true },
  "c2-fenn": { skin: "#d8b795", hair: "#2a2320", hairStyle: "short", face: "oval", cloth: "#35424a", accent: "#8a8f7f", glasses: true },
  "c2-adler": { skin: "#b98f6c", hair: "#8f8b7f", hairStyle: "thin", face: "square", cloth: "#4a5a4a", accent: "#934235", hat: "cap" },
  "c2-doyle": { skin: "#caa07a", hair: "#2f261e", hairStyle: "short", face: "square", cloth: "#2e3a44", accent: "#c6ae7e", mustache: true },

  // ── Vụ 03 — Ba phát súng, hai vỏ đạn ──
  "c3-victim": { skin: "#c49a76", hair: "#3a352e", hairStyle: "short", face: "square", cloth: "#26301f", accent: "#c6ae7e", mustache: true },
  "c3-reed": { skin: "#e8caa4", hair: "#1f1a17", hairStyle: "bob", face: "oval", cloth: "#7a1f2f", accent: "#c6ae7e", lips: true },
  "c3-kane": { skin: "#dcb890", hair: "#3f2f22", hairStyle: "short", face: "oval", cloth: "#4a4034", accent: "#8a8f7f" },
  "c3-orsini": { skin: "#e1c19a", hair: "#241a16", hairStyle: "bun", face: "long", cloth: "#3a2a3f", accent: "#c6ae7e", lips: true, glasses: true },
  "c3-brody": { skin: "#a97b56", hair: "#4a3a2f", hairStyle: "short", face: "square", cloth: "#2a2f26", accent: "#934235", mustache: true },

  // ── Vụ 04 — Khách trọ phòng 4B ──
  "c4-victim": { skin: "#cba384", hair: "#4a3a2e", hairStyle: "thin", face: "long", cloth: "#3f3a34", accent: "#8a8f7f", glasses: true },
  "c4-lang": { skin: "#d0ab88", hair: "#9a9284", hairStyle: "bun", face: "square", cloth: "#5a4a3a", accent: "#c6ae7e", glasses: true },
  "c4-price": { skin: "#c79a72", hair: "#2f2620", hairStyle: "short", face: "oval", cloth: "#4a3f35", accent: "#934235" },
  "c4-hollis": { skin: "#dcb996", hair: "#5a5248", hairStyle: "thin", face: "square", cloth: "#2e3540", accent: "#8a8f7f", glasses: true },
  "c4-vance": { skin: "#c9a583", hair: "#1c1815", hairStyle: "short", face: "long", cloth: "#26262a", accent: "#934235", hat: "fedora" },

  // ── Vụ 05 — Chuyến tàu không người lái ──
  "c5-victim": { skin: "#b98d64", hair: "#332a22", hairStyle: "short", face: "square", cloth: "#2e3a30", accent: "#c6ae7e", hat: "cap" },
  "c5-tate": { skin: "#c9a17c", hair: "#4a3a2c", hairStyle: "short", face: "oval", cloth: "#3a3530", accent: "#8a8f7f" },
  "c5-corwin": { skin: "#e3c6a4", hair: "#3a2f28", hairStyle: "bob", face: "square", cloth: "#4a3f4a", accent: "#c6ae7e", glasses: true },
  "c5-pratt": { skin: "#d3a87e", hair: "#2a2420", hairStyle: "short", face: "oval", cloth: "#35302a", accent: "#8a8f7f" },
  "c5-sikes": { skin: "#c49a76", hair: "#1f1b18", hairStyle: "short", face: "square", cloth: "#2a2f3a", accent: "#934235", hat: "fedora", mustache: true },

  // ── Vụ 06 — Bức ảnh chụp lúc rạng sáng ──
  "c6-victim": { skin: "#e6c9a3", hair: "#3a2f28", hairStyle: "short", face: "oval", cloth: "#3f4a44", accent: "#c6ae7e" },
  "c6-krantz": { skin: "#cba384", hair: "#8f8b80", hairStyle: "thin", face: "square", cloth: "#3a3f4a", accent: "#8a8f7f", glasses: true },
  "c6-shaw": { skin: "#d8b795", hair: "#b0aca0", hairStyle: "bun", face: "long", cloth: "#5a4a4a", accent: "#c6ae7e", glasses: true },
  "c6-lowe": { skin: "#b98f6c", hair: "#2a251f", hairStyle: "short", face: "long", cloth: "#26262c", accent: "#934235", hat: "fedora" },
  "c6-boy": { skin: "#a9784f", hair: "#221c17", hairStyle: "short", face: "oval", cloth: "#4a3a2a", accent: "#c6ae7e" },

  // ── Vụ 07 — Hồ sơ niêm phong ──
  "c7-wade": { skin: "#c9a583", hair: "#4a3a2c", hairStyle: "short", face: "square", cloth: "#3f4a3f", accent: "#c6ae7e", glasses: true },
  "c7-wren": { skin: "#d3ab86", hair: "#8f8a7d", hairStyle: "thin", face: "oval", cloth: "#2a2e38", accent: "#c6ae7e", glasses: true },
  "c7-halloway": { skin: "#e1c19a", hair: "#2a221c", hairStyle: "bun", face: "long", cloth: "#3a2f2a", accent: "#8a8f7f", glasses: true },
  "c7-bell": { skin: "#b07d55", hair: "#221d18", hairStyle: "short", face: "square", cloth: "#26261f", accent: "#934235", mustache: true },
  "c7-lin": { skin: "#dcb896", hair: "#1c1814", hairStyle: "bob", face: "oval", cloth: "#3a3a44", accent: "#8a8f7f" },
};

export type CharacterId = keyof typeof characters;
