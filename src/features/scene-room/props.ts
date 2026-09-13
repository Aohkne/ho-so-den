import * as THREE from "three";
import { loadPortraitImage } from "@/features/portraits/portrait-assets";
import type { EvidenceShapeKind } from "@/data/case-types";

// Vietnamese-subset fonts
const MONO = '"IBM Plex Mono", monospace';
const SERIF = '"Playfair Display", Georgia, serif';

export type LabelStatus = "unsolved" | "active" | "solved" | "coming-soon" | "sealed";

const STATUS_STAMP: Record<LabelStatus, { text: string; color: string } | null> = {
  unsolved: null,
  active: { text: "ĐANG ĐIỀU TRA", color: "#8a6d1f" },
  solved: { text: "ĐÃ KHÉP LẠI", color: "#3f6b45" },
  "coming-soon": { text: "CHƯA GIẢI MẬT", color: "#8a8f7f" },
  sealed: { text: "NIÊM PHONG", color: "#934235" },
};

/** Drawer label texture */
export function makeLabelTexture(
  title: string,
  subtitle: string,
  status: LabelStatus = "unsolved",
): THREE.CanvasTexture {
  const width = 640;
  const height = 200;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ece4cf";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#c6ae7e";
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, width - 6, height - 6);

  ctx.textBaseline = "middle";
  ctx.fillStyle = "#2a2f26";
  ctx.font = `500 ${Math.round(height * 0.2)}px ${MONO}`;
  ctx.fillText(title.toUpperCase(), width * 0.05, height * 0.38, width * 0.9);

  ctx.fillStyle = "#8a8f7f";
  ctx.font = `400 ${Math.round(height * 0.1)}px ${MONO}`;
  ctx.fillText(subtitle.toUpperCase(), width * 0.05, height * 0.62, width * 0.9);

  const stamp = STATUS_STAMP[status];
  if (stamp) {
    ctx.save();
    ctx.translate(width * 0.74, height * 0.8);
    ctx.rotate(-0.06);
    ctx.strokeStyle = stamp.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(-110, -18, 220, 36);
    ctx.fillStyle = stamp.color;
    ctx.font = `500 20px ${MONO}`;
    ctx.textAlign = "center";
    ctx.fillText(stamp.text, 0, 1);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/** Folder cover texture */
export function makeFolderTexture(
  title: string,
  subtitle: string,
  tag: string,
  portraitId?: string,
): THREE.CanvasTexture {
  const width = 512;
  const height = 660;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const paint = (portrait?: HTMLImageElement) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#d9c9a3";
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = "left";
    ctx.strokeStyle = "rgba(42,47,38,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 150);
    ctx.lineTo(width - 40, 150);
    ctx.stroke();

    ctx.fillStyle = "#544a36";
    ctx.font = `500 22px ${MONO}`;
    ctx.fillText(tag.toUpperCase(), 40, 60);

    ctx.fillStyle = "#2a2f26";
    ctx.font = `500 44px ${SERIF}`;
    wrapText(ctx, title, 40, 112, width - 80, 50);

    ctx.fillStyle = "#544a36";
    ctx.font = `400 19px ${MONO}`;
    ctx.fillText(subtitle.toUpperCase(), 40, 192, width - 80);

    if (portrait) {
      const w = 190;
      const h = w * 1.25;
      const x = width - w - 46;
      const y = 250;
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(-0.03);
      ctx.fillStyle = "rgba(42,47,38,0.25)";
      ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12);
      ctx.drawImage(portrait, -w / 2, -h / 2, w, h);
      ctx.restore();

      ctx.fillStyle = "#544a36";
      ctx.font = `400 15px ${MONO}`;
      ctx.fillText("NẠN NHÂN", x, y + h + 26);
    }

    ctx.save();
    ctx.translate(width * 0.32, height * 0.72);
    ctx.rotate(-0.08);
    ctx.strokeStyle = "#934235";
    ctx.lineWidth = 4;
    ctx.strokeRect(-120, -26, 240, 52);
    ctx.fillStyle = "#934235";
    ctx.font = `500 22px ${MONO}`;
    ctx.textAlign = "center";
    ctx.fillText("HỒ SƠ MẬT", 0, 8);
    ctx.restore();
  };

  paint();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  if (portraitId) {
    loadPortraitImage(portraitId).then((img) => {
      paint(img);
      texture.needsUpdate = true;
    });
  }

  return texture;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let dy = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + dy);
      line = word;
      dy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y + dy);
}

export function makeSignTexture(title: string, subtitle: string): THREE.CanvasTexture {
  const width = 768;
  const height = 220;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#1b241d";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#e8e6d9";
  ctx.font = `500 ${Math.round(height * 0.3)}px ${SERIF}`;
  ctx.fillText(title.toUpperCase(), width * 0.05, height * 0.46);
  ctx.fillStyle = "#a0a89a";
  ctx.font = `400 ${Math.round(height * 0.11)}px ${MONO}`;
  ctx.fillText(subtitle.toUpperCase(), width * 0.05, height * 0.76);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function makeFloorTexture(): THREE.CanvasTexture {
  const size = 512;
  const tiles = 8;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const tile = size / tiles;
  for (let y = 0; y < tiles; y++) {
    for (let x = 0; x < tiles; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? "#232c24" : "#1e261f";
      ctx.fillRect(x * tile, y * tile, tile, tile);
    }
  }
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  for (let i = 0; i <= tiles; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tile, 0);
    ctx.lineTo(i * tile, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * tile);
    ctx.lineTo(size, i * tile);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export interface DrawerConfig {
  id: string;
  title: string;
  subtitle: string;
  status: LabelStatus;
}

export interface DrawerHandle {
  id: string;
  group: THREE.Group;
  labelMesh: THREE.Mesh;
  openTarget: number;
  openCurrent: number;
  labelWorldPosition: () => THREE.Vector3;
  setStatus: (title: string, subtitle: string, status: LabelStatus) => void;
}

const CABINET_GREEN = 0x4a5a3f;
const CABINET_GREEN_DARK = 0x3a4832;
const BRASS = 0xc6ae7e;

/** Red seal tape */
function makeSealTape(width: number, height: number): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x9c3b30, roughness: 0.7 });
  for (const angle of [0.42, -0.42]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, height * 0.13, 0.01), mat);
    strip.rotation.z = angle;
    strip.position.z = 0.075;
    group.add(strip);
  }
  return group;
}

/** Drawer cabinet */
export function makeCabinet(configs: DrawerConfig[]): { group: THREE.Group; drawers: DrawerHandle[] } {
  const group = new THREE.Group();
  const drawerHeight = 0.62;
  const width = 1.1;
  const depth = 0.9;
  const drawers: DrawerHandle[] = [];

  const bodyMat = new THREE.MeshStandardMaterial({ color: CABINET_GREEN, roughness: 0.55, metalness: 0.35 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(width, drawerHeight * configs.length, depth), bodyMat);
  body.position.y = (drawerHeight * configs.length) / 2;
  group.add(body);

  configs.forEach((cfg, i) => {
    const y = drawerHeight * configs.length - drawerHeight * i - drawerHeight / 2;
    const drawerGroup = new THREE.Group();
    drawerGroup.position.set(0, y, depth / 2);
    drawerGroup.userData.roomId = cfg.id;

    const frontMat = new THREE.MeshStandardMaterial({ color: CABINET_GREEN_DARK, roughness: 0.45, metalness: 0.4 });
    const front = new THREE.Mesh(new THREE.BoxGeometry(width - 0.04, drawerHeight - 0.06, 0.06), frontMat);
    front.position.z = 0.03;
    drawerGroup.add(front);

    const handleMat = new THREE.MeshStandardMaterial({ color: BRASS, roughness: 0.3, metalness: 0.7 });
    const handle = new THREE.Mesh(new THREE.BoxGeometry(width * 0.5, 0.05, 0.06), handleMat);
    handle.position.set(0, -drawerHeight * 0.28, 0.09);
    drawerGroup.add(handle);

    const labelMat = new THREE.MeshStandardMaterial({
      map: makeLabelTexture(cfg.title, cfg.subtitle, cfg.status),
      roughness: 0.6,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.72, drawerHeight * 0.42), labelMat);
    labelMesh.position.set(0, drawerHeight * 0.06, 0.065);
    drawerGroup.add(labelMesh);

    const tape = makeSealTape(width, drawerHeight);
    tape.visible = cfg.status === "sealed";
    drawerGroup.add(tape);

    group.add(drawerGroup);
    drawers.push({
      id: cfg.id,
      group: drawerGroup,
      labelMesh,
      openTarget: 0,
      openCurrent: 0,
      labelWorldPosition: () => {
        const v = new THREE.Vector3();
        labelMesh.getWorldPosition(v);
        return v;
      },
      setStatus: (title, subtitle, status) => {
        labelMat.map?.dispose();
        labelMat.map = makeLabelTexture(title, subtitle, status);
        labelMat.needsUpdate = true;
        tape.visible = status === "sealed";
      },
    });
  });

  return { group, drawers };
}

// Reveal shapes
export type { EvidenceShapeKind };

interface EvidenceVisual {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | THREE.Material[];
  /** Extra rotation */
  extraRotationX?: number;
}

function stdMat(color: number, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6, ...extra });
}

function texMat(map: THREE.CanvasTexture, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ map, roughness: 0.65, ...extra });
}

function canvas2d(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Button texture */
function makeButtonTexture(): THREE.CanvasTexture {
  const size = 128;
  const { canvas, ctx } = canvas2d(size, size);
  ctx.fillStyle = "#ece1c0";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#b7a672";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#5a4f36";
  const holeR = size * 0.045;
  const off = size * 0.14;
  for (const [dx, dy] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]) {
    ctx.beginPath();
    ctx.arc(size / 2 + dx * off, size / 2 + dy * off, holeR, 0, Math.PI * 2);
    ctx.fill();
  }
  return toTexture(canvas);
}

/** Photo texture */
function makePhotoTexture(): THREE.CanvasTexture {
  const w = 160,
    h = 200;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = "#f0e8d4";
  ctx.fillRect(0, 0, w, h);
  const pad = 12;
  const picH = h - pad * 2 - 26;
  const grad = ctx.createLinearGradient(0, pad, 0, pad + picH);
  grad.addColorStop(0, "#7c8b91");
  grad.addColorStop(0.55, "#b8bfa0");
  grad.addColorStop(1, "#59564a");
  ctx.fillStyle = grad;
  ctx.fillRect(pad, pad, w - pad * 2, picH);
  ctx.fillStyle = "#332f27";
  ctx.fillRect(pad, pad + picH * 0.6, w - pad * 2, picH * 0.05);
  ctx.fillStyle = "#211e18";
  ctx.beginPath();
  ctx.ellipse(w * 0.4, pad + picH * 0.56, 6, 17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.58, pad + picH * 0.56, 6, 17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#211e18";
  ctx.font = `italic 12px ${SERIF}`;
  ctx.fillText("declassified", pad + 2, h - 8);
  return toTexture(canvas);
}

/** Document texture */
function makeDocumentTexture(): THREE.CanvasTexture {
  const w = 160,
    h = 200;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = "#e7dcb9";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(60,50,30,0.32)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 7; i++) {
    const y = 22 + i * 24;
    ctx.beginPath();
    ctx.moveTo(14, y);
    ctx.lineTo(w - 14 - (i % 2 === 0 ? 0 : 34), y);
    ctx.stroke();
  }
  return toTexture(canvas);
}

/** Book texture */
function makeBookTexture(): THREE.CanvasTexture {
  const w = 140,
    h = 190;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = "#4a3a26";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  for (let i = 0; i < 4; i++) ctx.fillRect(8 + i * 32, 0, 2, h);
  ctx.fillStyle = "#d9c9a0";
  ctx.fillRect(w * 0.18, h * 0.36, w * 0.64, h * 0.2);
  ctx.strokeStyle = "#2a2015";
  ctx.lineWidth = 2;
  ctx.strokeRect(w * 0.18, h * 0.36, w * 0.64, h * 0.2);
  return toTexture(canvas);
}

/** Reel top texture */
function makeReelTopTexture(): THREE.CanvasTexture {
  const size = 128;
  const { canvas, ctx } = canvas2d(size, size);
  ctx.fillStyle = "#1c1a17";
  ctx.fillRect(0, 0, size, size);
  const cx = size / 2,
    cy = size / 2;
  for (let r = size * 0.46; r > size * 0.09; r -= size * 0.065) {
    ctx.strokeStyle = Math.round(r / (size * 0.065)) % 2 === 0 ? "#3c372c" : "#141210";
    ctx.lineWidth = size * 0.045;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = "#0b0a08";
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.08, 0, Math.PI * 2);
  ctx.fill();
  return toTexture(canvas);
}

/** Reel side texture */
function makeReelSideTexture(): THREE.CanvasTexture {
  const w = 256,
    h = 32;
  const { canvas, ctx } = canvas2d(w, h);
  ctx.fillStyle = "#15130f";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#e3ddc6";
  const holeCount = 16,
    holeW = 8,
    holeH = 12;
  for (let i = 0; i < holeCount; i++) {
    const x = (i + 0.5) * (w / holeCount) - holeW / 2;
    ctx.fillRect(x, (h - holeH) / 2, holeW, holeH);
  }
  const tex = toTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

/** Build evidence shape */
function buildEvidenceVisual(kind: EvidenceShapeKind): EvidenceVisual {
  switch (kind) {
    case "button": {
      const face = texMat(makeButtonTexture(), { roughness: 0.5 });
      const side = stdMat(0xd8cba0, { roughness: 0.7 });
      return { geometry: new THREE.CylinderGeometry(0.05, 0.05, 0.012, 24), material: [side, face, face] };
    }
    case "ring":
      return {
        geometry: new THREE.TorusGeometry(0.035, 0.011, 12, 28),
        material: stdMat(0xd8bd82, { metalness: 0.85, roughness: 0.25 }),
        extraRotationX: Math.PI / 2,
      };
    case "loop":
      // Magnifying loop
      return {
        geometry: new THREE.TorusGeometry(0.042, 0.008, 12, 28),
        material: stdMat(0xb9c2c4, { metalness: 0.6, roughness: 0.15 }),
        extraRotationX: Math.PI / 2,
      };
    case "photo": {
      const top = texMat(makePhotoTexture(), { roughness: 0.55 });
      const side = stdMat(0xede3c8, { roughness: 0.85 });
      return { geometry: new THREE.BoxGeometry(0.2, 0.01, 0.25), material: [side, side, top, side, side, side] };
    }
    case "book": {
      const top = texMat(makeBookTexture(), { roughness: 0.7 });
      const side = stdMat(0x3a2f22, { roughness: 0.8 });
      return { geometry: new THREE.BoxGeometry(0.13, 0.03, 0.18), material: [side, side, top, side, side, side] };
    }
    case "bar":
      return {
        geometry: new THREE.CylinderGeometry(0.013, 0.013, 0.3, 14),
        material: stdMat(0x2e2c28, { metalness: 0.7, roughness: 0.4 }),
      };
    case "roll": {
      const side = texMat(makeReelSideTexture(), { roughness: 0.6 });
      const top = texMat(makeReelTopTexture(), { roughness: 0.5 });
      return { geometry: new THREE.CylinderGeometry(0.06, 0.06, 0.045, 28), material: [side, top, top] };
    }
    default: {
      // Paper default
      const top = texMat(makeDocumentTexture(), { roughness: 0.75 });
      const side = stdMat(0xd9cca0, { roughness: 0.85 });
      return { geometry: new THREE.BoxGeometry(0.22, 0.01, 0.16), material: [side, side, top, side, side, side] };
    }
  }
}

function disposeMeshMaterial(material: THREE.Material | THREE.Material[]) {
  const mats = Array.isArray(material) ? material : [material];
  mats.forEach((m) => {
    (m as THREE.MeshStandardMaterial).map?.dispose();
    m.dispose();
  });
}

export interface SearchProp {
  id: string;
  object: THREE.Object3D;
  setFound: (found: boolean) => void;
  setHighlighted: (on: boolean) => void;
  /** Reveal true shape */
  reveal: (kind: EvidenceShapeKind) => void;
  /** Reset to base shape */
  reset: () => void;
}

export interface DeskProps {
  group: THREE.Group;
  folderMesh: THREE.Mesh;
  folderAnchor: THREE.Vector3;
  searchProps: SearchProp[];
  /** Lamp shade mesh */
  lampMesh: THREE.Object3D;
  setFolderVisible: (visible: boolean) => void;
  setFolderContent: (title: string, subtitle: string, tag: string, portraitId?: string) => void;
  setLampOn: (on: boolean) => void;
  isLampOn: () => boolean;
}

/** Hidden clue prop */
function makeSearchProp(id: string, mesh: THREE.Mesh, baseColor: number): SearchProp {
  mesh.userData.propId = id;

  // Keep original for reset
  const originalGeometry = mesh.geometry;
  const originalMaterial = mesh.material;
  const originalRotation = mesh.rotation.clone();
  const originalScale = mesh.scale.clone();

  const singleMat = (): THREE.MeshStandardMaterial | null =>
    Array.isArray(mesh.material) ? null : (mesh.material as THREE.MeshStandardMaterial);

  return {
    id,
    object: mesh,
    setFound: (found) => {
      const mat = singleMat();
      if (!mat) return;
      mat.color.setHex(found ? 0xc6ae7e : baseColor);
      mat.emissive.setHex(0x000000);
      mat.emissiveIntensity = 0;
    },
    setHighlighted: (on) => {
      const mat = singleMat();
      if (!mat) return;
      mat.emissive.setHex(on ? 0xc6ae7e : 0x000000);
      mat.emissiveIntensity = on ? 0.55 : 0;
    },
    reveal: (kind) => {
      const visual = buildEvidenceVisual(kind);
      mesh.geometry.dispose();
      mesh.geometry = visual.geometry;
      disposeMeshMaterial(mesh.material);
      mesh.material = visual.material;
      mesh.rotation.copy(originalRotation);
      mesh.rotation.x += visual.extraRotationX ?? 0;
      mesh.userData.revealedAt = performance.now();
    },
    reset: () => {
      if (mesh.geometry !== originalGeometry) mesh.geometry.dispose();
      mesh.geometry = originalGeometry;
      if (mesh.material !== originalMaterial) disposeMeshMaterial(mesh.material);
      mesh.material = originalMaterial;
      mesh.rotation.copy(originalRotation);
      mesh.scale.copy(originalScale);
      delete mesh.userData.revealedAt;
    },
  };
}

export function makeDesk(): DeskProps {
  const group = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x5b4530, roughness: 0.7 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.3), woodMat);
  top.position.y = 0.78;
  group.add(top);

  const legGeo = new THREE.BoxGeometry(0.09, 0.76, 0.09);
  const legOffsets: [number, number][] = [
    [-1.2, -0.55],
    [1.2, -0.55],
    [-1.2, 0.55],
    [1.2, 0.55],
  ];
  legOffsets.forEach(([x, z]) => {
    const leg = new THREE.Mesh(legGeo, woodMat);
    leg.position.set(x, 0.38, z);
    group.add(leg);
  });

  const blotterMat = new THREE.MeshStandardMaterial({ color: 0x35513f, roughness: 0.85 });
  const blotter = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.02, 1.0), blotterMat);
  blotter.position.y = 0.83;
  group.add(blotter);

  // Desk lamp
  const brassMat = () => new THREE.MeshStandardMaterial({ color: BRASS, metalness: 0.7, roughness: 0.3 });
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.03, 24), brassMat());
  lampBase.position.set(0.9, 0.85, 0.32);
  group.add(lampBase);

  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12), brassMat());
  lampPole.position.set(0.9, 1.07, 0.32);
  group.add(lampPole);

  // Click to toggle
  const lampShadeMat = new THREE.MeshStandardMaterial({
    color: 0x2f5a3a,
    side: THREE.DoubleSide,
    roughness: 0.35,
    metalness: 0.15,
    emissive: 0x4a3a18,
    emissiveIntensity: 0.35,
  });
  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.17, 0.16, 24), lampShadeMat);
  lampShade.rotation.x = 0.22;
  lampShade.position.set(0.9, 1.3, 0.3);
  lampShade.userData.lampToggle = "desk-lamp";
  group.add(lampShade);

  const lampLight = new THREE.PointLight(0xfff0c4, 1.4, 4, 2);
  lampLight.position.set(0.9, 1.22, 0.3);
  group.add(lampLight);

  let lampOn = true;
  const setLampOn = (on: boolean) => {
    lampOn = on;
    lampLight.intensity = on ? 1.4 : 0;
    lampShadeMat.emissiveIntensity = on ? 0.35 : 0;
  };

  // Mug
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.09, 16),
    new THREE.MeshStandardMaterial({ color: 0xe8e6d9, roughness: 0.6 }),
  );
  mug.position.set(-0.85, 0.885, 0.28);
  group.add(mug);

  // Case folder
  const folderTexture = makeFolderTexture("Hồ sơ", "PHÒNG LƯU TRỮ", "FILE NO. AL–000");
  const folderMat = new THREE.MeshStandardMaterial({ map: folderTexture, roughness: 0.8 });
  const folderMesh = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.02, 0.82), folderMat);
  folderMesh.position.set(0, 0.855, -0.05);
  folderMesh.rotation.y = -0.05;
  folderMesh.visible = false;
  group.add(folderMesh);

  // Hidden clues

  // Outside desk projection; shown per-case in enterSearch()
  const paperColor = 0xd9cfae;
  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.014, 0.2),
    new THREE.MeshStandardMaterial({ color: paperColor, roughness: 0.9 }),
  );
  paper.position.set(-0.7, 0.02, 1.05);
  paper.rotation.y = 0.4;
  paper.visible = false;
  group.add(paper);

  const boxColor = 0x6b5334;
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.24, 0.3),
    new THREE.MeshStandardMaterial({ color: boxColor, roughness: 0.85 }),
  );
  box.position.set(-1.62, 0.12, 0.35);
  box.rotation.y = -0.25;
  box.visible = false;
  group.add(box);

  const keyColor = 0xc6ae7e;
  const key = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.1, 10),
    new THREE.MeshStandardMaterial({ color: keyColor, roughness: 0.4, metalness: 0.6 }),
  );
  key.position.set(-1.15, 0.02, 0.55);
  key.rotation.z = Math.PI / 2.4;
  key.visible = false;
  group.add(key);

  const noteColor = 0xd6cca6;
  const note = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.03, 0.16),
    new THREE.MeshStandardMaterial({ color: noteColor, roughness: 0.95 }),
  );
  note.position.set(-0.35, 0.03, 0.65);
  note.rotation.set(0.3, 0.5, 0.2);
  note.visible = false;
  group.add(note);

  return {
    group,
    folderMesh,
    folderAnchor: new THREE.Vector3(0, 0.86, -0.05),
    searchProps: [
      makeSearchProp("under-desk", paper, paperColor),
      makeSearchProp("evidence-box", box, boxColor),
      makeSearchProp("floor-key", key, keyColor),
      makeSearchProp("crumpled-note", note, noteColor),
    ],
    lampMesh: lampShade,
    setFolderVisible: (visible: boolean) => {
      folderMesh.visible = visible;
    },
    setFolderContent: (title, subtitle, tag, portraitId) => {
      folderMat.map?.dispose();
      folderMat.map = makeFolderTexture(title, subtitle, tag, portraitId);
      folderMat.needsUpdate = true;
    },
    setLampOn,
    isLampOn: () => lampOn,
  };
}

export function makeWallSign(title: string, subtitle: string): THREE.Mesh {
  const texture = makeSignTexture(title, subtitle);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.63),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 }),
  );
  return mesh;
}

export function makeCeilingLight(): THREE.Group {
  const group = new THREE.Group();
  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.04, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x2a2f26, roughness: 0.6 }),
  );
  group.add(bar);
  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.02, 0.06),
    new THREE.MeshStandardMaterial({ color: 0xfff3d6, emissive: 0xfff3d6, emissiveIntensity: 1.4 }),
  );
  glow.position.y = -0.02;
  group.add(glow);
  const light = new THREE.PointLight(0xfff3d6, 0.6, 8);
  light.position.y = -0.1;
  group.add(light);
  return group;
}
