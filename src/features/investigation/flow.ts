import { ArchiveAudio } from "@/features/audio/audio";
import type { ArchiveScene } from "@/features/scene-room/scene";
import type { LabelStatus } from "@/features/scene-room/props";
import { portraitUrl } from "@/features/portraits/portrait-assets";
import { cases, findCase, LAST_CASE_ID, type CaseFile, type Evidence } from "@/data/cases";
import { GameState, MISTAKE_LIMIT } from "@/features/investigation/state";
import { EvidenceBoard } from "@/features/investigation/board";

type Screen = "title" | "briefing" | "room" | "case" | "search" | "board" | "accuse" | "verdict" | "ending";
type Tab = "brief" | "evidence" | "suspects" | "testimony";

const STATUS_LABEL: Record<string, string> = {
  unsolved: "CHƯA GIẢI",
  active: "ĐANG ĐIỀU TRA",
  solved: "ĐÃ KHÉP LẠI",
  "coming-soon": "CHƯA GIẢI MẬT",
  sealed: "NIÊM PHONG",
};

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Thiếu #${id}`);
  return el as T;
}

function mugshot(portraitId: string, size: "normal" | "small" = "normal"): string {
  return `<figure class="mugshot${size === "small" ? " small" : ""}"><img src="${portraitUrl(portraitId)}" alt="" width="120" height="150" loading="lazy"></figure>`;
}

export class GameFlow {
  private audio = new ArchiveAudio();
  private board: EvidenceBoard;

  private screen: Screen = "title";
  private currentCase: CaseFile | null = null;
  private tab: Tab = "brief";
  private briefPage = 0;
  private hoveredCaseId: string | null = null;
  private accusation: { suspectId?: string; methodId?: string; motiveId?: string } = {};
  private motionReduced = false;
  private lastVerdictWasFinale = false;

  private els = {
    hud: $("hud"),
    home: $<HTMLButtonElement>("home"),
    hudRank: $("hud-rank"),
    hudProgress: $("hud-progress"),
    sound: $<HTMLButtonElement>("sound"),
    motion: $<HTMLButtonElement>("motion"),
    indexButton: $<HTMLButtonElement>("index-button"),

    title: $("screen-title"),
    btnNew: $<HTMLButtonElement>("btn-new"),
    btnContinue: $<HTMLButtonElement>("btn-continue"),
    btnGuide: $<HTMLButtonElement>("btn-guide"),

    briefing: $("screen-briefing"),
    briefRank: $("brief-rank"),
    idPhoto: $("id-photo"),
    btnAccept: $<HTMLButtonElement>("btn-accept"),

    objectPrompt: $("object-prompt"),
    promptKicker: $("prompt-kicker"),
    promptTitle: $("prompt-title"),
    promptCopy: $("prompt-copy"),
    objectAction: $<HTMLButtonElement>("object-action"),
    actionLabel: $("action-label"),

    caseScreen: $("screen-case"),
    caseTabs: $("case-tabs"),
    tabEvidenceCount: $("tab-evidence-count"),
    caseKicker: $("case-kicker"),
    caseTitle: $("case-title"),
    caseBody: $("case-body"),

    searchScreen: $("screen-search"),
    searchHint: $("search-hint"),
    btnSearchDone: $<HTMLButtonElement>("btn-search-done"),

    boardScreen: $("screen-board"),
    btnBoardClose: $<HTMLButtonElement>("btn-board-close"),

    accuseScreen: $("screen-accuse"),
    slotSuspect: $("slot-suspect"),
    slotMethod: $("slot-method"),
    slotMotive: $("slot-motive"),
    accuseWarning: $("accuse-warning"),
    btnSubmit: $<HTMLButtonElement>("btn-submit"),
    btnAccuseCancel: $<HTMLButtonElement>("btn-accuse-cancel"),

    verdictScreen: $("screen-verdict"),
    verdictStamp: $("verdict-stamp"),
    verdictTitle: $("verdict-title"),
    verdictCopy: $("verdict-copy"),
    verdictFragment: $("verdict-fragment"),
    verdictFragmentCode: $("verdict-fragment-code"),
    btnVerdictDone: $<HTMLButtonElement>("btn-verdict-done"),

    endingScreen: $("screen-ending"),
    btnEndingRestart: $<HTMLButtonElement>("btn-ending-restart"),

    caseTools: $("case-tools"),
    btnCloseCase: $<HTMLButtonElement>("btn-close-case"),
    pager: $("case-pager"),
    btnPrev: $<HTMLButtonElement>("btn-prev"),
    btnNext: $<HTMLButtonElement>("btn-next"),
    pageCount: $("page-count"),
    btnSearch: $<HTMLButtonElement>("btn-search"),
    btnBoard: $<HTMLButtonElement>("btn-board"),
    btnAccuse: $<HTMLButtonElement>("btn-accuse"),

    statusText: $("status-text"),
    interactionHint: $("interaction-hint"),
    loading: $("loading"),

    indexDialog: $<HTMLDialogElement>("index-dialog"),
    indexList: $("index-list"),
    fragmentsCount: $("fragments-count"),

    guideDialog: $<HTMLDialogElement>("guide-dialog"),

    evidenceDialog: $<HTMLDialogElement>("evidence-dialog"),
    evidenceKicker: $("evidence-dialog-kicker"),
    evidenceTitle: $("evidence-dialog-title"),
    evidenceDetail: $("evidence-dialog-detail"),
  };

  constructor(
    private scene: ArchiveScene,
    private state: GameState,
  ) {
    this.board = new EvidenceBoard(this.state, this.audio);
    this.els.idPhoto.innerHTML = `<img src="${portraitUrl("detective")}" alt="" width="120" height="150">`;
    this.bindEvents();
    this.refreshHud();
  }

  statusOf(caseFile: CaseFile): LabelStatus {
    return this.state.statusOf(caseFile) as LabelStatus;
  }

  start() {
    this.els.loading.classList.add("hidden");
    this.els.btnContinue.toggleAttribute("hidden", !this.state.hasSave());
    this.scene.showTitle();
    this.show("title");
    this.setStatus("HỒ SƠ ĐEN ĐÃ MỞ · CHỜ NGƯỜI NHẬN VIỆC");
  }

  // Screen routing

  private show(screen: Screen) {
    this.screen = screen;
    const toggle = (el: HTMLElement, visible: boolean) => el.toggleAttribute("hidden", !visible);

    toggle(this.els.title, screen === "title");
    toggle(this.els.briefing, screen === "briefing");
    toggle(this.els.caseScreen, screen === "case");
    toggle(this.els.searchScreen, screen === "search");
    toggle(this.els.boardScreen, screen === "board");
    toggle(this.els.accuseScreen, screen === "accuse");
    toggle(this.els.verdictScreen, screen === "verdict");
    toggle(this.els.endingScreen, screen === "ending");
    toggle(this.els.caseTools, screen === "case");
    toggle(this.els.hud, screen !== "title" && screen !== "briefing" && screen !== "ending");
    if (screen !== "room") toggle(this.els.objectPrompt, false);

    const hints: Record<Screen, string> = {
      title: "KÉO ĐỂ NHÌN QUANH",
      briefing: "ĐỌC KỸ TRƯỚC KHI NHẬN VIỆC",
      room: "BẤM VÀO NGĂN KÉO ĐỂ MỞ HỒ SƠ · KÉO ĐỂ NHÌN QUANH",
      case: "ĐỌC HỒ SƠ · BẤM TỪNG TANG VẬT ĐỂ THU THẬP",
      search: "BẤM VÀO VẬT SÁNG ĐỂ XEM XÉT",
      board: "CHỌN HAI TẤM THẺ ĐỂ NỐI DÂY",
      accuse: "MỘT KẾT LUẬN, KHÔNG RÚT LẠI ĐƯỢC",
      verdict: "",
      ending: "",
    };
    this.els.interactionHint.textContent = hints[screen];
  }

  private setStatus(text: string) {
    this.els.statusText.textContent = text;
  }

  private refreshHud() {
    this.els.hudRank.textContent = this.state.rank;
    this.els.briefRank.textContent = this.state.rank;
    this.els.hudProgress.textContent = `ĐÃ KHÉP LẠI ${this.state.solvedCount}/${this.state.playableCount}`;
    this.els.fragmentsCount.textContent = `${this.state.fragments.length}/6`;
  }

  // Event bindings

  private bindEvents() {
    this.scene.setHandlers({
      onHoverChange: (id) => this.handleHover(id),
      onSelect: (id) => this.openCase(id),
      onFindProp: (propId) => this.handleFindProp(propId),
      onLampToggle: () => this.audio.switchClick(),
    });

    this.els.btnNew.addEventListener("click", () => {
      this.state.reset();
      this.refreshHud();
      this.show("briefing");
      this.audio.blip();
    });

    this.els.btnContinue.addEventListener("click", () => this.goToRoom());
    this.els.btnAccept.addEventListener("click", () => this.goToRoom());
    this.els.home.addEventListener("click", () => this.goToRoom());
    this.els.btnGuide.addEventListener("click", () => this.els.guideDialog.showModal());

    this.els.objectAction.addEventListener("click", () => {
      if (this.hoveredCaseId) this.openCase(this.hoveredCaseId);
    });

    this.els.caseTabs.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.tab = btn.dataset.tab as Tab;
        this.renderCase();
      });
    });

    this.els.btnPrev.addEventListener("click", () => this.stepPage(-1));
    this.els.btnNext.addEventListener("click", () => this.stepPage(1));
    this.els.btnCloseCase.addEventListener("click", () => this.goToRoom());

    this.els.btnSearch.addEventListener("click", () => this.startSearch());
    this.els.btnSearchDone.addEventListener("click", () => this.endSearch());

    this.els.btnBoard.addEventListener("click", () => {
      if (!this.currentCase) return;
      this.board.open(this.currentCase);
      this.show("board");
    });
    this.els.btnBoardClose.addEventListener("click", () => this.show("case"));

    this.els.btnAccuse.addEventListener("click", () => this.openAccusation());
    this.els.btnAccuseCancel.addEventListener("click", () => this.show("case"));
    this.els.btnSubmit.addEventListener("click", () => this.submitAccusation());
    this.els.btnVerdictDone.addEventListener("click", () => {
      if (this.lastVerdictWasFinale) this.show("ending");
      else this.goToRoom();
    });
    this.els.btnEndingRestart.addEventListener("click", () => {
      this.state.reset();
      this.refreshHud();
      this.scene.showTitle();
      this.show("title");
    });

    this.els.indexButton.addEventListener("click", () => {
      this.renderIndex();
      this.els.indexDialog.showModal();
    });

    document.querySelectorAll(".close-dialog").forEach((btn) => {
      btn.addEventListener("click", (e) => (e.target as HTMLElement).closest("dialog")?.close());
    });

    this.els.sound.addEventListener("click", () => {
      const on = !this.audio.isEnabled();
      this.audio.setEnabled(on);
      this.els.sound.setAttribute("aria-pressed", String(on));
      this.els.sound.querySelector("span")!.textContent = on ? "BẬT" : "TẮT";
    });

    this.els.motion.addEventListener("click", () => {
      this.motionReduced = !this.motionReduced;
      this.scene.setMotionEnabled(!this.motionReduced);
      this.els.motion.setAttribute("aria-pressed", String(this.motionReduced));
      this.els.motion.querySelector("span")!.textContent = this.motionReduced ? "GIẢM" : "BẬT";
      document.body.classList.toggle("reduced-motion", this.motionReduced);
    });

    document.addEventListener("keydown", (e) => {
      // Dialog owns keys
      if (document.querySelector("dialog[open]")) return;

      if (this.screen === "case" && this.tab === "brief") {
        if (e.key === "ArrowLeft") this.stepPage(-1);
        if (e.key === "ArrowRight") this.stepPage(1);
      }
      if (e.key === "Escape") {
        if (this.screen === "board" || this.screen === "accuse") this.show("case");
        else if (this.screen === "search") this.endSearch();
        else if (this.screen === "case") this.goToRoom();
      }
    });
  }

  private goToRoom() {
    this.currentCase = null;
    this.scene.enterRoom();
    this.show("room");
    this.refreshHud();
    this.setStatus("TRONG PHÒNG LƯU TRỮ · CHỌN MỘT VỤ ÁN");
  }

  // Drawer hover

  private handleHover(id: string | null) {
    this.hoveredCaseId = id;
    if (this.screen !== "room") return;

    if (!id) {
      this.els.objectPrompt.setAttribute("hidden", "");
      return;
    }
    const c = findCase(id);
    if (!c) return;
    const status = this.state.statusOf(c);

    this.els.promptKicker.textContent = `VỤ ÁN ${c.number} · ${STATUS_LABEL[status]}`;
    this.els.promptTitle.textContent = c.codename;
    this.els.promptCopy.textContent =
      status === "coming-soon"
        ? "Hồ sơ chưa được chuyển tới kho."
        : status === "sealed"
          ? `Ngăn bị niêm phong. Cần đủ ${c.needFragments ?? 6} mảnh manh mối.`
          : status === "solved"
            ? "Vụ án đã khép lại. Có thể đọc lại hồ sơ."
            : "Một hồ sơ chưa khép lại.";
    this.els.actionLabel.textContent = status === "solved" ? "ĐỌC LẠI" : "MỞ HỒ SƠ";
    this.els.objectPrompt.removeAttribute("hidden");
  }

  // Open case

  private openCase(id: string) {
    const c = findCase(id);
    if (!c) return;
    this.currentCase = c;
    this.tab = "brief";
    this.briefPage = 0;

    const status = this.state.statusOf(c);
    this.scene.openCase(c.id, c.codename, `VỤ ÁN ${c.number}`, `HỒ SƠ AL–${c.number}`, c.coverPortraitId);
    this.audio.blip();
    this.show("case");
    this.setStatus(`ĐANG ĐỌC · VỤ ÁN ${c.number}`);

    const playable = status !== "coming-soon" && status !== "sealed";
    this.els.caseTabs.toggleAttribute("hidden", !playable);
    this.els.btnSearch.toggleAttribute("hidden", !playable);
    this.els.btnBoard.toggleAttribute("hidden", !playable);
    this.els.btnAccuse.toggleAttribute("hidden", !playable);

    this.renderCase();
  }

  private renderCase() {
    const c = this.currentCase;
    if (!c) return;

    const status = this.state.statusOf(c);
    if (status === "coming-soon" || status === "sealed") {
      this.els.pager.setAttribute("hidden", "");
      this.els.caseKicker.textContent = `VỤ ÁN ${c.number}`;
      this.els.caseTitle.textContent = c.codename;
      this.els.caseBody.innerHTML =
        status === "sealed"
          ? `<p class="paper-lead">Ngăn kéo này bị dán niêm phong.</p>
             <p>Trên băng dán có nét chữ của người tiền nhiệm: «Đừng mở khi chưa hiểu sáu vụ kia.»</p>
             <div class="result-note"><span>ĐIỀU KIỆN MỞ NIÊM PHONG</span><p>Đủ ${c.needFragments ?? 6} mảnh manh mối. Hiện có ${this.state.fragments.length}.</p></div>`
          : `<p class="paper-lead">Hồ sơ chưa được chuyển tới kho.</p>
             <p>Phòng lưu trữ trung tâm còn đang giải mật. Quay lại sau.</p>`;
      this.updateTabs();
      return;
    }

    this.updateTabs();
    if (this.tab === "brief") this.renderBrief(c);
    else if (this.tab === "evidence") this.renderEvidence(c);
    else if (this.tab === "suspects") this.renderSuspects(c);
    else this.renderTestimony(c);
  }

  private updateTabs() {
    const c = this.currentCase;
    this.els.caseTabs.querySelectorAll<HTMLButtonElement>("button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === this.tab);
    });
    if (c) {
      const found = c.evidence.filter((e) => this.state.hasFound(c.id, e.id)).length;
      this.els.tabEvidenceCount.textContent = `${found}/${c.evidence.length}`;
    }
    this.els.pager.toggleAttribute("hidden", this.tab !== "brief");
  }

  private renderBrief(c: CaseFile) {
    const page = c.brief[this.briefPage];
    this.els.caseKicker.textContent = page.kicker;
    this.els.caseTitle.textContent = page.title;
    this.els.caseBody.innerHTML = page.html;

    this.els.pageCount.textContent = `${String(this.briefPage + 1).padStart(2, "0")} / ${String(c.brief.length).padStart(2, "0")}`;
    this.els.btnPrev.disabled = this.briefPage === 0;
    this.els.btnNext.disabled = this.briefPage === c.brief.length - 1;
  }

  private renderEvidence(c: CaseFile) {
    this.els.caseKicker.textContent = "TÚI CHỨNG CỨ";
    this.els.caseTitle.textContent = "Tang vật";

    const list = document.createElement("div");
    list.className = "evidence-list";

    c.evidence.forEach((ev) => {
      const found = this.state.hasFound(c.id, ev.id);
      const item = document.createElement("div");
      item.className = `evidence-item${found ? " found" : ""}`;

      if (found) {
        item.innerHTML = `<span class="evidence-kicker">${ev.kicker}</span><strong>${ev.name}</strong><p>${ev.detail}</p>`;
      } else if (ev.source === "room") {
        item.innerHTML = `<span class="evidence-kicker">CHƯA TÌM THẤY</span><strong>? ? ?</strong><p>Tang vật này không nằm trong hồ sơ. Phải khám xét phòng lưu trữ.</p>`;
      } else {
        const btn = document.createElement("button");
        btn.className = "evidence-collect";
        btn.innerHTML = `<span class="evidence-kicker">${ev.kicker}</span><strong>${ev.name}</strong><p>Bấm để xem xét và thu vào túi chứng cứ.</p>`;
        btn.addEventListener("click", () => this.collect(c, ev));
        item.appendChild(btn);
      }
      list.appendChild(item);
    });

    this.els.caseBody.innerHTML = "";
    this.els.caseBody.appendChild(list);
  }

  private renderSuspects(c: CaseFile) {
    this.els.caseKicker.textContent = "DANH SÁCH LIÊN QUAN";
    this.els.caseTitle.textContent = "Nghi phạm";
    this.els.caseBody.innerHTML = c.suspects
      .map(
        (s) => `<div class="suspect-row">
          ${mugshot(s.portraitId)}
          <div>
            <span class="suspect-role">${s.role}</span>
            <h3>${s.name}</h3>
            <p><strong>Lời khai ngoại phạm:</strong> ${s.alibi}</p>
            <p class="suspect-note">${s.note}</p>
          </div>
        </div>`,
      )
      .join("");
  }

  private renderTestimony(c: CaseFile) {
    this.els.caseKicker.textContent = "BIÊN BẢN LẤY LỜI KHAI";
    this.els.caseTitle.textContent = "Lời khai";
    this.els.caseBody.innerHTML = c.testimonies
      .map((t) => {
        const s = c.suspects.find((x) => x.id === t.suspectId);
        return `<blockquote class="testimony"><p>«${t.text}»</p><cite>— ${s?.name ?? ""}</cite></blockquote>`;
      })
      .join("");
  }

  private collect(c: CaseFile, ev: Evidence) {
    if (!this.state.collect(c.id, ev.id)) return;
    this.audio.found();
    this.scene.setCaseStatus(c.id, c.codename, `VỤ ÁN ${c.number}`, this.statusOf(c));
    this.showEvidenceDialog(ev);
    this.renderCase();
  }

  private showEvidenceDialog(ev: Evidence) {
    this.els.evidenceKicker.textContent = ev.kicker;
    this.els.evidenceTitle.textContent = ev.name;
    this.els.evidenceDetail.textContent = ev.detail;
    this.els.evidenceDialog.showModal();
  }

  private stepPage(direction: 1 | -1) {
    const c = this.currentCase;
    if (!c || this.tab !== "brief") return;
    const next = this.briefPage + direction;
    if (next < 0 || next >= c.brief.length) return;
    this.briefPage = next;
    this.audio.blip();
    this.renderBrief(c);
  }

  // Room search

  private startSearch() {
    const c = this.currentCase;
    if (!c) return;
    const remaining = c.evidence.filter((e) => e.source === "room" && !this.state.hasFound(c.id, e.id)).length;
    this.els.searchHint.textContent =
      remaining > 0
        ? `Những vật sáng lên là chỗ đáng lục. Còn ${remaining} tang vật chưa tìm thấy.`
        : "Đã lục hết những chỗ đáng lục trong phòng này.";
    const activePropIds = c.evidence.filter((e) => e.source === "room" && e.roomProp).map((e) => e.roomProp!);
    this.scene.enterSearch(activePropIds);
    this.show("search");
    this.setStatus("ĐANG KHÁM XÉT PHÒNG LƯU TRỮ");
  }

  private endSearch() {
    const c = this.currentCase;
    this.scene.exitSearch();
    this.show("case");
    this.renderCase();
    if (c) this.setStatus(`ĐANG ĐỌC · VỤ ÁN ${c.number}`);
  }

  private handleFindProp(propId: string) {
    const c = this.currentCase;
    if (!c) return;
    const ev = c.evidence.find((e) => e.roomProp === propId);
    if (!ev) return;

    if (this.state.hasFound(c.id, ev.id)) {
      this.els.searchHint.textContent = "Chỗ này đã lục rồi.";
      return;
    }

    this.state.collect(c.id, ev.id);
    this.scene.markPropFound(propId, ev.shape);
    this.audio.found();
    this.showEvidenceDialog(ev);

    const remaining = c.evidence.filter((e) => e.source === "room" && !this.state.hasFound(c.id, e.id)).length;
    this.els.searchHint.textContent =
      remaining > 0 ? `Còn ${remaining} tang vật nữa đâu đó trong phòng.` : "Đã lục hết những chỗ đáng lục.";
  }

  // Accusation

  private openAccusation() {
    const c = this.currentCase;
    if (!c) return;

    if (this.state.isLockedOut(c.id)) {
      this.els.accuseWarning.textContent =
        "Hồ sơ đã bị thu hồi sau ba kết luận sai. Đọc lại chứng cứ rồi mở lại — bộ đếm sẽ được xóa.";
      this.state.clearLockout(c.id);
    } else if (!this.state.canAccuse(c)) {
      const missing = this.state.missingEvidenceCount(c);
      this.els.accuseWarning.textContent = `Chưa đủ căn cứ: còn thiếu ${missing} tang vật bắt buộc. Đọc kỹ hồ sơ và khám xét phòng.`;
      this.show("accuse");
      this.els.btnSubmit.disabled = true;
      this.renderAccusationSlots(c, true);
      return;
    } else {
      this.els.accuseWarning.textContent = "";
    }

    this.accusation = {};
    this.renderAccusationSlots(c, false);
    this.els.btnSubmit.disabled = true;
    this.show("accuse");
    this.setStatus("ĐANG LẬP KẾT LUẬN ĐIỀU TRA");
  }

  private renderAccusationSlots(c: CaseFile, disabled: boolean) {
    const fill = (
      host: HTMLElement,
      options: { id: string; label: string; detail: string; portraitId?: string }[],
      key: "suspectId" | "methodId" | "motiveId",
    ) => {
      host.innerHTML = "";
      options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = opt.portraitId ? "slot-option with-portrait" : "slot-option";
        btn.disabled = disabled;
        btn.innerHTML = `${opt.portraitId ? mugshot(opt.portraitId, "small") : ""}<div><strong>${opt.label}</strong><span>${opt.detail}</span></div>`;
        btn.addEventListener("click", () => {
          this.accusation[key] = opt.id;
          host.querySelectorAll(".slot-option").forEach((b) => b.classList.remove("chosen"));
          btn.classList.add("chosen");
          this.els.btnSubmit.disabled = !(
            this.accusation.suspectId &&
            this.accusation.methodId &&
            this.accusation.motiveId
          );
          this.audio.blip();
        });
        host.appendChild(btn);
      });
    };

    fill(
      this.els.slotSuspect,
      c.suspects.map((s) => ({ id: s.id, label: s.name, detail: s.role, portraitId: s.portraitId })),
      "suspectId",
    );
    fill(this.els.slotMethod, c.methods, "methodId");
    fill(this.els.slotMotive, c.motives, "motiveId");
  }

  private submitAccusation() {
    const c = this.currentCase;
    if (!c) return;

    const isFinale = c.id === LAST_CASE_ID;
    const correct =
      (this.accusation.suspectId === c.solution.suspectId ? 1 : 0) +
      (this.accusation.methodId === c.solution.methodId ? 1 : 0) +
      (this.accusation.motiveId === c.solution.motiveId ? 1 : 0);

    if (correct === 3) {
      this.state.solveCase(c);
      this.audio.stamp();
      this.scene.setCaseStatus(c.id, c.codename, `VỤ ÁN ${c.number}`, this.statusOf(c));
      const suspect = c.suspects.find((s) => s.id === c.solution.suspectId);
      this.lastVerdictWasFinale = isFinale;
      this.els.verdictStamp.textContent = "HỒ SƠ KHÉP LẠI";
      this.els.verdictStamp.className = "verdict-stamp success";
      this.els.verdictTitle.textContent = `${suspect?.name} bị buộc tội.`;
      this.els.verdictCopy.textContent = isFinale
        ? "Cornelius Wren không còn là một cái tên giấu trong sổ sách. Sáu mảnh manh mối đã thành một bản cáo trạng — và ngăn kéo cuối cùng của kho hồ sơ này, cuối cùng, cũng được khép lại đúng nghĩa."
        : "Ba mảnh khớp nhau: người, cách thức, lý do. Ông đóng dấu, và một ngọn đèn trong kho này cuối cùng cũng được tắt đúng lúc.";
      this.els.verdictFragment.toggleAttribute("hidden", !c.fragment);
      this.els.verdictFragmentCode.textContent = c.fragment;
      this.els.btnVerdictDone.textContent = isFinale ? "XEM ĐOẠN KẾT" : "VỀ PHÒNG LƯU TRỮ";
    } else {
      this.lastVerdictWasFinale = false;
      this.state.recordMistake(c.id);
      this.audio.wrong();
      this.scene.setCaseStatus(c.id, c.codename, `VỤ ÁN ${c.number}`, this.statusOf(c));
      const mistakes = this.state.progressFor(c.id).mistakes;
      const left = MISTAKE_LIMIT - mistakes;
      this.els.verdictStamp.textContent = "CHỨNG CỨ CHƯA ĐỦ";
      this.els.verdictStamp.className = "verdict-stamp fail";
      this.els.verdictTitle.textContent = `${correct}/3 kết luận là đúng.`;
      this.els.verdictCopy.textContent =
        left > 0
          ? `Công tố viên trả hồ sơ về. Ông còn ${left} lần nữa trước khi vụ này bị thu hồi.`
          : "Hồ sơ bị thu hồi. Đọc lại từ đầu, rồi xin mở lại vụ án.";
      this.els.verdictFragment.setAttribute("hidden", "");
      this.els.btnVerdictDone.textContent = "VỀ PHÒNG LƯU TRỮ";
    }

    this.refreshHud();
    this.show("verdict");
    this.setStatus(correct === 3 ? `VỤ ÁN ${c.number} ĐÃ KHÉP LẠI` : "KẾT LUẬN BỊ TRẢ VỀ");
  }

  // Case index

  private renderIndex() {
    this.els.indexList.innerHTML = "";
    cases.forEach((c) => {
      const status = this.state.statusOf(c);
      const btn = document.createElement("button");
      btn.innerHTML = `<span>${c.number} &nbsp; ${c.codename}</span><span>${STATUS_LABEL[status]}</span>`;
      btn.addEventListener("click", () => {
        this.els.indexDialog.close();
        this.openCase(c.id);
      });
      this.els.indexList.appendChild(btn);
    });
    this.refreshHud();
  }
}
