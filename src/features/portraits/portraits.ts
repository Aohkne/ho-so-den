// SVG portrait generator

export interface PortraitLook {
  skin: string;
  hair: string;
  hairStyle: "bob" | "bun" | "short" | "thin" | "hidden";
  cloth: string;
  accent: string;
  /** Face shape */
  face?: "oval" | "long" | "square";
  hat?: "fedora" | "cap";
  mustache?: boolean;
  glasses?: boolean;
  lips?: boolean;
}

function headShape(look: PortraitLook): string {
  switch (look.face) {
    case "long":
      return `<ellipse cx="60" cy="70" rx="22" ry="32" fill="${look.skin}"/>`;
    case "square":
      return `<path d="M38 58 Q38 41 60 41 Q82 41 82 58 L82 79 Q82 99 60 99 Q38 99 38 79 Z" fill="${look.skin}"/>`;
    default:
      return `<ellipse cx="60" cy="70" rx="24" ry="29" fill="${look.skin}"/>`;
  }
}

const WALL = "#c4bda0";
const WALL_LINE = "#a49d82";
const FRAME = "#3a4133";
const DARK = "#2a2f26";

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (n & 255) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function hairShape(look: PortraitLook): string {
  const h = look.hair;
  const dark = shade(h, -22);
  switch (look.hairStyle) {
    case "bob":
      return `
        <path d="M60 37 C39 37 33 52 33 70 L33 87 Q33 91 37 91 L39 70 Q41 57 60 55 Q79 57 81 70 L83 91 Q87 91 87 87 L87 70 C87 52 81 37 60 37 Z" fill="${h}"/>
        <path d="M45 42 Q60 48 76 43 Q68 39 60 39 Q52 39 45 42 Z" fill="${dark}"/>`;
    case "bun":
      return `
        <circle cx="60" cy="33" r="10" fill="${h}"/>
        <path d="M60 39 Q36 39 36 63 Q41 51 60 51 Q79 51 84 63 Q84 39 60 39 Z" fill="${h}"/>
        <path d="M60 39 Q46 39 40 50 Q52 45 60 45 Q68 45 80 50 Q74 39 60 39 Z" fill="${dark}"/>`;
    case "short":
      return `<path d="M35 66 Q35 39 60 39 Q85 39 85 66 Q80 49 60 49 Q40 49 35 66 Z" fill="${h}"/>`;
    case "thin":
      return `
        <path d="M35 72 Q35 55 45 49 Q39 60 39 73 Z" fill="${h}"/>
        <path d="M85 72 Q85 55 75 49 Q81 60 81 73 Z" fill="${h}"/>
        <path d="M43 47 Q60 41 77 47 Q60 44 43 47 Z" fill="${h}"/>`;
    default:
      return "";
  }
}

function hatShape(look: PortraitLook): string {
  if (!look.hat) return "";
  const c = shade(look.cloth, -28);
  const band = shade(c, -26);
  if (look.hat === "fedora") {
    return `
      <path d="M40 47 Q40 21 60 21 Q80 21 80 47 Z" fill="${c}"/>
      <rect x="39" y="38" width="42" height="7" fill="${band}"/>
      <ellipse cx="60" cy="47" rx="43" ry="8" fill="${c}"/>
      <ellipse cx="60" cy="45" rx="43" ry="6" fill="${shade(c, 12)}"/>`;
  }
  return `
    <path d="M38 45 Q38 25 60 25 Q82 25 82 45 Z" fill="${c}"/>
    <rect x="37" y="38" width="46" height="7" fill="${band}"/>
    <rect x="55" y="28" width="10" height="8" fill="${look.accent}"/>
    <ellipse cx="60" cy="46" rx="32" ry="6" fill="${band}"/>`;
}

/** Builds SVG string */
export function portraitSVG(look: PortraitLook, opts: { placard?: string; size?: number } = {}): string {
  const skinDark = shade(look.skin, -26);
  const hairDark = shade(look.hair, -30);
  const width = opts.size ?? 120;
  const height = Math.round(width * 1.25);

  const lines = [30, 55, 80, 105]
    .map(
      (y) =>
        `<line x1="0" y1="${y}" x2="120" y2="${y}"/><line x1="6" y1="${y - 12}" x2="14" y2="${y - 12}"/>`,
    )
    .join("");

  const numbers = [30, 55, 80, 105]
    .map((y, i) => `<text x="4" y="${y - 2}" font-size="5" fill="${WALL_LINE}">${6 - i}'</text>`)
    .join("");

  const placard = opts.placard
    ? `<g><rect x="28" y="125" width="64" height="17" fill="#e8e2cd" stroke="${FRAME}" stroke-width="0.9"/>
       <text x="60" y="137" font-size="9" text-anchor="middle" fill="${DARK}" font-family="monospace" letter-spacing="0.5">${opts.placard}</text></g>`
    : "";

  const mouth = look.lips
    ? `<path d="M53 86 Q60 82.5 67 86 Q60 91 53 86 Z" fill="#8d3b34"/>`
    : `<path d="M54 87 Q60 89.5 66 87" stroke="${skinDark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;

  const glasses = look.glasses
    ? `<g fill="none" stroke="${DARK}" stroke-width="1.2" opacity="0.85">
         <circle cx="51" cy="68" r="7"/><circle cx="69" cy="68" r="7"/>
         <line x1="58" y1="68" x2="62" y2="68"/>
       </g>`
    : "";

  const mustache = look.mustache
    ? `<path d="M50 83 Q60 79 70 83 Q60 86.5 50 83 Z" fill="${hairDark}"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" width="${width}" height="${height}" role="img">
  <rect width="120" height="150" fill="${WALL}"/>
  <g stroke="${WALL_LINE}" stroke-width="0.7" opacity="0.9">${lines}</g>
  <g font-family="monospace" opacity="0.9">${numbers}</g>

  <path d="M6 150 Q6 115 60 115 Q114 115 114 150 Z" fill="${look.cloth}"/>
  <path d="M44 117 L60 133 L76 117 L70 115 L60 125 L50 115 Z" fill="${shade(look.cloth, 26)}"/>
  <path d="M57 126 L63 126 L65 150 L55 150 Z" fill="${look.accent}"/>

  <rect x="52" y="92" width="16" height="26" rx="4" fill="${skinDark}"/>
  ${headShape(look)}
  <ellipse cx="36" cy="73" rx="4" ry="6" fill="${look.skin}"/>
  <ellipse cx="84" cy="73" rx="4" ry="6" fill="${look.skin}"/>

  ${hairShape(look)}

  <path d="M45 60 Q51 57.5 57 60" stroke="${hairDark}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
  <path d="M63 60 Q69 57.5 75 60" stroke="${hairDark}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
  <ellipse cx="51" cy="68" rx="2.4" ry="2.9" fill="${DARK}"/>
  <ellipse cx="69" cy="68" rx="2.4" ry="2.9" fill="${DARK}"/>
  ${glasses}
  <path d="M60 70 L57 79 L61.5 79.5" stroke="${skinDark}" stroke-width="1.3" fill="none" stroke-linejoin="round"/>
  ${mouth}
  ${mustache}
  ${hatShape(look)}

  <path d="M120 0 L120 150 L74 150 Z" fill="#000" opacity="0.11"/>
  ${placard}
  <rect x="1" y="1" width="118" height="148" fill="none" stroke="${FRAME}" stroke-width="2"/>
</svg>`;
}

