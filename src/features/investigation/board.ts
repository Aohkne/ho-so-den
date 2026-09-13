import type { ArchiveAudio } from "@/features/audio/audio";
import type { CaseFile } from "@/data/case-types";
import type { GameState } from "@/features/investigation/state";

interface DrawnLink {
  a: string;
  b: string;
  insight: string | null;
}

// Evidence board
export class EvidenceBoard {
  private cardsEl: HTMLElement;
  private stringsEl: SVGSVGElement;
  private canvasEl: HTMLElement;
  private insightsEl: HTMLElement;
  private hintEl: HTMLElement;

  private caseFile: CaseFile | null = null;
  private selected: string[] = [];
  private drawn: DrawnLink[] = [];

  constructor(
    private state: GameState,
    private audio: ArchiveAudio,
  ) {
    this.cardsEl = document.getElementById("board-cards")!;
    this.stringsEl = document.getElementById("board-strings") as unknown as SVGSVGElement;
    this.canvasEl = document.getElementById("board-canvas")!;
    this.insightsEl = document.getElementById("board-insights")!;
    this.hintEl = document.getElementById("board-hint")!;

    window.addEventListener("resize", () => this.drawStrings());
  }

  open(caseFile: CaseFile) {
    this.caseFile = caseFile;
    this.selected = [];
    this.drawn = [];
    this.insightsEl.innerHTML = "";
    this.restoreSavedLinks();
    this.render();
  }

  private restoreSavedLinks() {
    if (!this.caseFile) return;
    const progress = this.state.progressFor(this.caseFile.id);
    for (const key of progress.linked) {
      const [a, b] = key.split("+");
      const insight = this.insightFor(a, b);
      this.drawn.push({ a, b, insight });
      if (insight) this.addInsight(insight);
    }
  }

  private insightFor(a: string, b: string): string | null {
    const link = this.caseFile?.links.find(
      (l) => (l.a === a && l.b === b) || (l.a === b && l.b === a),
    );
    return link?.insight ?? null;
  }

  private render() {
    if (!this.caseFile) return;
    const found = this.caseFile.evidence.filter((e) => this.state.hasFound(this.caseFile!.id, e.id));

    this.cardsEl.innerHTML = "";
    if (found.length === 0) {
      this.cardsEl.innerHTML = `<p class="board-empty">Chưa thu được tang vật nào. Đọc hồ sơ và khám xét phòng trước đã.</p>`;
      this.drawStrings();
      return;
    }

    found.forEach((ev) => {
      const card = document.createElement("button");
      card.className = "board-card";
      card.dataset.evidenceId = ev.id;
      card.innerHTML = `<span class="board-card-kicker">${ev.kicker}</span><strong>${ev.name}</strong>`;
      card.addEventListener("click", () => this.toggleSelect(ev.id));
      this.cardsEl.appendChild(card);
    });

    this.updateSelectionClasses();
    requestAnimationFrame(() => this.drawStrings());
  }

  private toggleSelect(id: string) {
    const at = this.selected.indexOf(id);
    if (at >= 0) {
      this.selected.splice(at, 1);
    } else {
      this.selected.push(id);
    }

    if (this.selected.length === 2) {
      this.connect(this.selected[0], this.selected[1]);
      this.selected = [];
    }
    this.updateSelectionClasses();
    this.drawStrings();
  }

  private connect(a: string, b: string) {
    if (!this.caseFile) return;
    if (this.drawn.some((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a))) {
      this.hintEl.textContent = "Hai tang vật này đã được nối rồi.";
      return;
    }

    const insight = this.insightFor(a, b);
    this.drawn.push({ a, b, insight });
    this.state.recordLink(this.caseFile.id, a, b);

    if (insight) {
      this.audio.found();
      this.hintEl.textContent = "Có liên hệ. Ghi lại vào sổ.";
      this.addInsight(insight);
    } else {
      this.audio.blip();
      this.hintEl.textContent = "Chưa thấy liên hệ rõ ràng giữa hai thứ này.";
    }
  }

  private addInsight(text: string) {
    const note = document.createElement("div");
    note.className = "board-insight";
    note.innerHTML = `<span>SUY LUẬN</span><p>${text}</p>`;
    this.insightsEl.appendChild(note);
  }

  private updateSelectionClasses() {
    this.cardsEl.querySelectorAll<HTMLElement>(".board-card").forEach((card) => {
      card.classList.toggle("selected", this.selected.includes(card.dataset.evidenceId!));
    });
  }

  private drawStrings() {
    const canvasRect = this.canvasEl.getBoundingClientRect();
    this.stringsEl.setAttribute("viewBox", `0 0 ${canvasRect.width} ${canvasRect.height}`);
    this.stringsEl.innerHTML = "";

    const centerOf = (id: string) => {
      const el = this.cardsEl.querySelector<HTMLElement>(`[data-evidence-id="${id}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - canvasRect.left + r.width / 2, y: r.top - canvasRect.top + r.height / 2 };
    };

    const pinned = new Set<string>();
    const addPin = (id: string, at: { x: number; y: number }) => {
      if (pinned.has(id)) return;
      pinned.add(id);
      const pin = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pin.setAttribute("cx", String(at.x));
      pin.setAttribute("cy", String(at.y));
      pin.setAttribute("r", "4");
      pin.setAttribute("class", "pin");
      this.stringsEl.appendChild(pin);
    };

    for (const link of this.drawn) {
      const from = centerOf(link.a);
      const to = centerOf(link.b);
      if (!from || !to) continue;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(from.x));
      line.setAttribute("y1", String(from.y));
      line.setAttribute("x2", String(to.x));
      line.setAttribute("y2", String(to.y));
      line.setAttribute("class", link.insight ? "string-strong" : "string-weak");
      this.stringsEl.appendChild(line);
      addPin(link.a, from);
      addPin(link.b, to);
    }
  }
}
