import { cases, findCase, type CaseFile } from "../../data/cases";

const SAVE_KEY = "archive-save-v1";
/** Số lần luận tội sai trong một vụ trước khi hồ sơ bị thu hồi tạm thời. */
export const MISTAKE_LIMIT = 3;

export interface CaseProgress {
  found: string[];
  linked: string[];
  solved: boolean;
  mistakes: number;
}

interface SaveData {
  version: 1;
  progress: Record<string, CaseProgress>;
  fragments: string[];
  totalMistakes: number;
}

export type CaseStatus = "unsolved" | "active" | "solved" | "coming-soon" | "sealed";

const RANKS = [
  { maxMistakes: 0, label: "THÁM TỬ HẠNG NHẤT" },
  { maxMistakes: 1, label: "THÁM TỬ" },
  { maxMistakes: 2, label: "THÁM TỬ TẬP SỰ" },
  { maxMistakes: Infinity, label: "NHÂN VIÊN LƯU TRỮ" },
];

function emptySave(): SaveData {
  return { version: 1, progress: {}, fragments: [], totalMistakes: 0 };
}

export class GameState {
  private data: SaveData = emptySave();

  constructor() {
    this.load();
  }

  // ——— lưu / đọc ———

  hasSave(): boolean {
    return Object.keys(this.data.progress).length > 0;
  }

  private load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SaveData;
      if (parsed?.version === 1 && parsed.progress) this.data = parsed;
    } catch {
      // localStorage bị chặn hoặc dữ liệu hỏng — chơi tiếp với ván mới
    }
  }

  private save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    } catch {
      // hết dung lượng hoặc bị chặn — không chặn luồng chơi
    }
  }

  reset() {
    this.data = emptySave();
    this.save();
  }

  // ——— tiến trình từng vụ ———

  progressFor(caseId: string): CaseProgress {
    if (!this.data.progress[caseId]) {
      this.data.progress[caseId] = { found: [], linked: [], solved: false, mistakes: 0 };
    }
    return this.data.progress[caseId];
  }

  statusOf(caseFile: CaseFile): CaseStatus {
    if (caseFile.state === "coming-soon") return "coming-soon";
    if (caseFile.state === "sealed") {
      return this.fragments.length >= (caseFile.needFragments ?? 6) ? "unsolved" : "sealed";
    }
    const p = this.data.progress[caseFile.id];
    if (p?.solved) return "solved";
    if (p && (p.found.length > 0 || p.mistakes > 0)) return "active";
    return "unsolved";
  }

  collect(caseId: string, evidenceId: string): boolean {
    const p = this.progressFor(caseId);
    if (p.found.includes(evidenceId)) return false;
    p.found.push(evidenceId);
    this.save();
    return true;
  }

  hasFound(caseId: string, evidenceId: string): boolean {
    return this.progressFor(caseId).found.includes(evidenceId);
  }

  linkKey(a: string, b: string): string {
    return [a, b].sort().join("+");
  }

  recordLink(caseId: string, a: string, b: string): boolean {
    const p = this.progressFor(caseId);
    const key = this.linkKey(a, b);
    if (p.linked.includes(key)) return false;
    p.linked.push(key);
    this.save();
    return true;
  }

  hasLink(caseId: string, a: string, b: string): boolean {
    return this.progressFor(caseId).linked.includes(this.linkKey(a, b));
  }

  /** Đủ chứng cứ bắt buộc thì mới mở được màn luận tội. */
  canAccuse(caseFile: CaseFile): boolean {
    const p = this.progressFor(caseFile.id);
    return caseFile.requiredEvidence.every((id) => p.found.includes(id));
  }

  missingEvidenceCount(caseFile: CaseFile): number {
    const p = this.progressFor(caseFile.id);
    return caseFile.requiredEvidence.filter((id) => !p.found.includes(id)).length;
  }

  /** Hồ sơ bị thu hồi tạm thời sau quá nhiều lần luận tội sai. */
  isLockedOut(caseId: string): boolean {
    const p = this.progressFor(caseId);
    return !p.solved && p.mistakes >= MISTAKE_LIMIT;
  }

  clearLockout(caseId: string) {
    const p = this.progressFor(caseId);
    p.mistakes = 0;
    this.save();
  }

  recordMistake(caseId: string) {
    const p = this.progressFor(caseId);
    p.mistakes += 1;
    this.data.totalMistakes += 1;
    this.save();
  }

  solveCase(caseFile: CaseFile) {
    const p = this.progressFor(caseFile.id);
    p.solved = true;
    if (caseFile.fragment && !this.data.fragments.includes(caseFile.fragment)) {
      this.data.fragments.push(caseFile.fragment);
    }
    this.save();
  }

  // ——— tổng hợp ———

  get fragments(): string[] {
    return this.data.fragments;
  }

  get totalMistakes(): number {
    return this.data.totalMistakes;
  }

  get solvedCount(): number {
    return cases.filter((c) => this.data.progress[c.id]?.solved).length;
  }

  get playableCount(): number {
    return cases.filter((c) => c.state === "playable").length;
  }

  get rank(): string {
    return RANKS.find((r) => this.data.totalMistakes <= r.maxMistakes)!.label;
  }

  /** Vụ đang dở dang gần nhất, dùng cho nút TIẾP TỤC. */
  resumeCaseId(): string | null {
    const active = cases.find((c) => {
      const p = this.data.progress[c.id];
      return p && !p.solved && p.found.length > 0;
    });
    if (active) return active.id;
    const nextUnsolved = cases.find((c) => c.state === "playable" && !this.data.progress[c.id]?.solved);
    return nextUnsolved?.id ?? null;
  }
}

export { findCase };
