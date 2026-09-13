export interface DossierPage {
  kicker: string;
  title: string;
  html: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  alibi: string;
  note: string;
  /** Portrait id */
  portraitId: string;
}

/** Revealed shape */
export type EvidenceShapeKind = "button" | "ring" | "loop" | "paper" | "photo" | "book" | "bar" | "roll";

export interface Evidence {
  id: string;
  name: string;
  kicker: string;
  detail: string;
  /** File or room */
  source: "file" | "room";
  /** Room prop id */
  roomProp?: string;
  /** Revealed shape */
  shape?: EvidenceShapeKind;
}

export interface Testimony {
  suspectId: string;
  text: string;
}

export interface Choice {
  id: string;
  label: string;
  detail: string;
}

export interface CaseLink {
  a: string;
  b: string;
  insight: string;
}

export interface CaseFile {
  id: string;
  number: string;
  /** Drawer label */
  codename: string;
  title: string;
  slot: { cabinet: "left" | "right"; drawer: number };
  state: "playable" | "coming-soon" | "sealed";
  /** Sealed only */
  needFragments?: number;
  brief: DossierPage[];
  /** Cover portrait */
  coverPortraitId?: string;
  suspects: Suspect[];
  evidence: Evidence[];
  testimonies: Testimony[];
  links: CaseLink[];
  methods: Choice[];
  motives: Choice[];
  solution: { suspectId: string; methodId: string; motiveId: string };
  /** Required evidence */
  requiredEvidence: string[];
  /** Reward fragment */
  fragment: string;
}
