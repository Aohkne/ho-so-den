import * as THREE from "three";
import type { CaseFile } from "@/data/case-types";
import {
  makeCabinet,
  makeDesk,
  makeWallSign,
  makeCeilingLight,
  makeFloorTexture,
  type DrawerHandle,
  type LabelStatus,
  type SearchProp,
  type EvidenceShapeKind,
} from "@/features/scene-room/props";

const CLICK_MAX_DRAG = 6; // Click threshold
const CLICK_MAX_MS = 400;

type Mode = "idle" | "browsing" | "reading" | "search";

interface Shot {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

const IDLE_SHOT: Shot = {
  position: new THREE.Vector3(0.4, 2.5, 4.4),
  target: new THREE.Vector3(0, 0.9, -1.2),
};

// Offset from lamp
const ENTERED_SHOT: Shot = {
  position: new THREE.Vector3(0.05, 1.95, 3.25),
  target: new THREE.Vector3(0.0, 1.05, -1.5),
};

const SEARCH_SHOT: Shot = {
  position: new THREE.Vector3(-0.75, 1.5, 3.6),
  target: new THREE.Vector3(-0.9, 0.15, 1.25),
};

function hoverShotFor(target: THREE.Vector3): Shot {
  return {
    position: target.clone().add(new THREE.Vector3(0.15, 0.32, 1.55)),
    target: target.clone(),
  };
}

export class ArchiveScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();

  private mode: Mode = "idle";
  private drawersById = new Map<string, DrawerHandle>();
  private drawerPickables: THREE.Object3D[] = [];
  private searchProps: SearchProp[] = [];
  private hovered: string | null = null;
  private hoveredProp: string | null = null;
  private motionEnabled = true;

  private desk = makeDesk();
  private readingShot: Shot;

  private goal: Shot = { position: IDLE_SHOT.position.clone(), target: IDLE_SHOT.target.clone() };
  private curPos = IDLE_SHOT.position.clone();
  private curTarget = IDLE_SHOT.target.clone();

  private dragging = false;
  private dragYaw = 0;
  private dragPitch = 0;
  private dragStart = { x: 0, y: 0, t: 0 };
  private lastPointer = { x: 0, y: 0 };
  private idleAngle = 0;

  private onHoverChange: (id: string | null) => void = () => {};
  private onSelect: (id: string) => void = () => {};
  private onFindProp: (propId: string) => void = () => {};
  private onLampToggle: (on: boolean) => void = () => {};

  constructor(container: HTMLElement, caseFiles: CaseFile[], statusOf: (c: CaseFile) => LabelStatus) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0c120e, 1);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.copy(this.curPos);
    this.camera.lookAt(this.curTarget);

    this.readingShot = { position: new THREE.Vector3(0.25, 1.18, 1.4), target: this.desk.folderAnchor.clone() };

    this.buildRoom(caseFiles, statusOf);
    this.addLights();

    window.addEventListener("resize", this.handleResize);
    this.renderer.domElement.addEventListener("pointerdown", this.handlePointerDown);
    this.renderer.domElement.addEventListener("pointermove", this.handlePointerMove);
    this.renderer.domElement.addEventListener("pointerup", this.handlePointerUp);
    this.renderer.domElement.addEventListener("pointerleave", () => {
      this.dragging = false;
    });
  }

  setHandlers(handlers: {
    onHoverChange?: (id: string | null) => void;
    onSelect?: (id: string) => void;
    onFindProp?: (propId: string) => void;
    onLampToggle?: (on: boolean) => void;
  }) {
    if (handlers.onHoverChange) this.onHoverChange = handlers.onHoverChange;
    if (handlers.onSelect) this.onSelect = handlers.onSelect;
    if (handlers.onFindProp) this.onFindProp = handlers.onFindProp;
    if (handlers.onLampToggle) this.onLampToggle = handlers.onLampToggle;
  }

  setMotionEnabled(enabled: boolean) {
    this.motionEnabled = enabled;
  }

  /** Go to title */
  showTitle() {
    this.mode = "idle";
    this.drawersById.forEach((d) => (d.openTarget = 0));
    this.desk.setFolderVisible(false);
    this.hideAllSearchProps();
    this.hovered = null;
    this.setGoal(IDLE_SHOT);
  }

  /** Enter room */
  enterRoom() {
    this.mode = "browsing";
    this.drawersById.forEach((d) => (d.openTarget = 0));
    this.desk.setFolderVisible(false);
    this.hideAllSearchProps();
    this.hovered = null;
    this.setGoal(ENTERED_SHOT);
  }

  /** Open a case */
  openCase(id: string, title: string, subtitle: string, tag: string, portraitId?: string) {
    this.mode = "reading";
    this.drawersById.forEach((d, drawerId) => (d.openTarget = drawerId === id ? 0.42 : 0));
    this.desk.setFolderContent(title, subtitle, tag, portraitId);
    this.desk.setFolderVisible(true);
    this.hideAllSearchProps();
    this.setGoal(this.readingShot);
  }

  /** Enter search mode */
  enterSearch(activePropIds: string[]) {
    this.mode = "search";
    this.searchProps.forEach((p) => {
      const active = activePropIds.includes(p.id);
      p.object.visible = active;
      p.setHighlighted(active);
    });
    this.setGoal(SEARCH_SHOT);
  }

  exitSearch() {
    this.mode = "reading";
    this.hideAllSearchProps();
    this.setGoal(this.readingShot);
  }

  /** Mark prop found */
  markPropFound(propId: string, shape?: EvidenceShapeKind) {
    const prop = this.searchProps.find((p) => p.id === propId);
    if (!prop) return;
    if (shape) prop.reveal(shape);
    else prop.setFound(true);
  }

  setCaseStatus(caseId: string, title: string, subtitle: string, status: LabelStatus) {
    this.drawersById.get(caseId)?.setStatus(title, subtitle, status);
  }

  private hideAllSearchProps() {
    this.searchProps.forEach((p) => {
      p.object.visible = false;
      // Reset shared props
      p.reset();
    });
    this.hoveredProp = null;
  }

  private setGoal(shot: Shot) {
    this.goal = { position: shot.position.clone(), target: shot.target.clone() };
  }

  private buildRoom(caseFiles: CaseFile[], statusOf: (c: CaseFile) => LabelStatus) {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshStandardMaterial({ map: makeFloorTexture(), roughness: 0.9 }),
    );
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 6),
      new THREE.MeshStandardMaterial({ color: 0x161f1a, roughness: 1 }),
    );
    backWall.position.set(0, 3, -3.4);
    this.scene.add(backWall);

    const sideWall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 6),
      new THREE.MeshStandardMaterial({ color: 0x141c17, roughness: 1 }),
    );
    sideWall.position.set(-4.4, 3, 0);
    sideWall.rotation.y = Math.PI / 2;
    this.scene.add(sideWall);

    const sign = makeWallSign("Hồ Sơ Đen", "Phòng điều tra án tồn đọng");
    sign.position.set(-0.75, 2.45, -3.38);
    this.scene.add(sign);

    const ceilingLight = makeCeilingLight();
    ceilingLight.position.set(-0.4, 5.3, -0.6);
    ceilingLight.rotation.z = 0.25;
    this.scene.add(ceilingLight);

    const toConfig = (c: CaseFile) => ({
      id: c.id,
      title: c.codename,
      subtitle: `VỤ ÁN ${c.number}`,
      status: statusOf(c),
    });

    const left = caseFiles.filter((c) => c.slot.cabinet === "left").sort((a, b) => a.slot.drawer - b.slot.drawer);
    const right = caseFiles.filter((c) => c.slot.cabinet === "right").sort((a, b) => a.slot.drawer - b.slot.drawer);

    const leftCabinet = makeCabinet(left.map(toConfig));
    leftCabinet.group.position.set(-1.9, 0, -2.7);
    this.scene.add(leftCabinet.group);

    const rightCabinet = makeCabinet(right.map(toConfig));
    rightCabinet.group.position.set(1.7, 0, -2.5);
    rightCabinet.group.rotation.y = -0.18;
    this.scene.add(rightCabinet.group);

    [...leftCabinet.drawers, ...rightCabinet.drawers].forEach((d) => {
      this.drawersById.set(d.id, d);
      this.drawerPickables.push(d.group);
    });

    this.desk.group.position.set(0.15, 0, 0.9);
    this.scene.add(this.desk.group);
    this.searchProps = this.desk.searchProps;
  }

  private addLights() {
    this.scene.add(new THREE.AmbientLight(0x8a8f7f, 0.55));

    const key = new THREE.DirectionalLight(0xf3e6c8, 0.7);
    key.position.set(3, 5, 3);
    this.scene.add(key);

    const warm = new THREE.PointLight(0xc6ae7e, 0.8, 10);
    warm.position.set(-1.5, 2.5, 0);
    this.scene.add(warm);
  }

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private handlePointerDown = (e: PointerEvent) => {
    this.dragging = true;
    this.dragStart = { x: e.clientX, y: e.clientY, t: performance.now() };
    this.lastPointer = { x: e.clientX, y: e.clientY };
  };

  private handlePointerMove = (e: PointerEvent) => {
    this.updatePointerNDC(e);

    if (this.dragging) {
      const dx = e.clientX - this.lastPointer.x;
      const dy = e.clientY - this.lastPointer.y;
      this.lastPointer = { x: e.clientX, y: e.clientY };
      this.dragYaw = clamp(this.dragYaw - dx * 0.003, -0.45, 0.45);
      this.dragPitch = clamp(this.dragPitch - dy * 0.002, -0.25, 0.35);
    }

    if (this.mode === "browsing") this.updateHoverState();
    else if (this.mode === "search") this.updateSearchHoverState();

    // Lamp always clickable
    if (!this.dragging && this.pickLamp()) {
      this.renderer.domElement.style.cursor = "pointer";
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    const dist = Math.hypot(e.clientX - this.dragStart.x, e.clientY - this.dragStart.y);
    const elapsed = performance.now() - this.dragStart.t;
    this.dragging = false;
    if (dist > CLICK_MAX_DRAG || elapsed > CLICK_MAX_MS) return;

    this.updatePointerNDC(e);

    if (this.pickLamp()) {
      const next = !this.desk.isLampOn();
      this.desk.setLampOn(next);
      this.onLampToggle(next);
      return;
    }

    if (this.mode === "browsing") {
      const hit = this.pick(this.drawerPickables, "roomId");
      if (hit) this.onSelect(hit);
    } else if (this.mode === "search") {
      const hit = this.pick(
        this.searchProps.map((p) => p.object),
        "propId",
      );
      if (hit) this.onFindProp(hit);
    }
  };

  /** Pointer over lamp */
  private pickLamp(): boolean {
    return this.pick([this.desk.lampMesh], "lampToggle") !== null;
  }

  private updatePointerNDC(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private pick(objects: THREE.Object3D[], key: "roomId" | "propId" | "lampToggle"): string | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(objects, true);
    if (hits.length === 0) return null;
    return findUserDataUp(hits[0].object, key);
  }

  private updateHoverState() {
    const id = this.pick(this.drawerPickables, "roomId");
    this.renderer.domElement.style.cursor = id ? "pointer" : this.dragging ? "grabbing" : "grab";
    if (id === this.hovered) return;
    this.hovered = id;

    this.drawersById.forEach((d, drawerId) => (d.openTarget = drawerId === id ? 0.4 : 0));

    if (id) {
      const drawer = this.drawersById.get(id)!;
      this.setGoal(hoverShotFor(drawer.labelWorldPosition()));
    } else {
      this.setGoal(ENTERED_SHOT);
    }
    this.onHoverChange(id);
  }

  private updateSearchHoverState() {
    const id = this.pick(
      this.searchProps.map((p) => p.object),
      "propId",
    );
    this.renderer.domElement.style.cursor = id ? "pointer" : this.dragging ? "grabbing" : "grab";
    this.hoveredProp = id;
  }

  start() {
    const clock = new THREE.Clock();
    const loop = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      this.curPos.lerp(this.goal.position, 0.06);
      this.curTarget.lerp(this.goal.target, 0.06);

      if (!this.dragging) {
        this.dragYaw *= 0.94;
        this.dragPitch *= 0.94;
      }

      this.drawersById.forEach((d) => {
        d.openCurrent += (d.openTarget - d.openCurrent) * Math.min(1, dt * 6);
        if (d.group.userData.baseZ === undefined) d.group.userData.baseZ = d.group.position.z;
        const base = d.group.userData.baseZ as number;
        d.group.position.z = base + d.openCurrent * 0.55;
      });

      // Pulse hidden clues
      if (this.mode === "search" && this.motionEnabled) {
        const pulse = 0.55 + Math.sin(t * 3) * 0.25;
        this.searchProps.forEach((p) => {
          const mat = (p.object as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat.emissiveIntensity > 0) mat.emissiveIntensity = p.id === this.hoveredProp ? 0.6 : pulse;
        });
      }

      // Pop-in on reveal
      const REVEAL_MS = 260;
      this.searchProps.forEach((p) => {
        const revealedAt = p.object.userData.revealedAt as number | undefined;
        if (revealedAt === undefined) return;
        const elapsed = performance.now() - revealedAt;
        if (elapsed >= REVEAL_MS) {
          p.object.scale.setScalar(1);
          delete p.object.userData.revealedAt;
          return;
        }
        const k = elapsed / REVEAL_MS;
        p.object.scale.setScalar(0.35 + 0.65 * (1 - Math.pow(1 - k, 3)));
      });

      const camPos = applyLookAround(this.curPos, this.curTarget, this.dragYaw, this.dragPitch);
      this.camera.position.copy(camPos);
      this.camera.lookAt(this.curTarget);

      if (this.motionEnabled && this.mode === "idle" && !this.dragging) {
        this.idleAngle += dt * 0.04;
        this.goal.position = applyLookAround(IDLE_SHOT.position, IDLE_SHOT.target, this.idleAngle, 0);
        this.goal.target = IDLE_SHOT.target.clone();
      }

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loop);
    };
    loop();
  }
}

function findUserDataUp(obj: THREE.Object3D | null, key: string): string | null {
  let o: THREE.Object3D | null = obj;
  while (o) {
    if (o.userData[key]) return o.userData[key] as string;
    o = o.parent;
  }
  return null;
}

function applyLookAround(basePos: THREE.Vector3, target: THREE.Vector3, yaw: number, pitch: number): THREE.Vector3 {
  const offset = basePos.clone().sub(target);
  const radius = offset.length();
  if (radius < 1e-4) return basePos.clone();
  let theta = Math.atan2(offset.x, offset.z);
  let phi = Math.acos(clamp(offset.y / radius, -1, 1));
  theta += yaw;
  phi = clamp(phi - pitch, 0.25, Math.PI - 0.25);
  const sinPhi = Math.sin(phi);
  return target.clone().add(
    new THREE.Vector3(radius * sinPhi * Math.sin(theta), radius * Math.cos(phi), radius * sinPhi * Math.cos(theta)),
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
