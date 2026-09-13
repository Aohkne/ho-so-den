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
  /** id chân dung, tương ứng file /portraits/<id>.svg đã tiền-render */
  portraitId: string;
}

/**
 * Hình dạng thật của tang vật khi lộ ra trong cảnh 3D (xem
 * `features/scene-room/props.ts`'s SearchProp.reveal()) — trước khi bấm vào,
 * vật giấu chỉ là một khối chung; bấm vào thì nó "lộ" đúng hình cúc áo/nhẫn/...
 */
export type EvidenceShapeKind = "button" | "ring" | "loop" | "paper" | "photo" | "book" | "bar" | "roll";

export interface Evidence {
  id: string;
  name: string;
  kicker: string;
  detail: string;
  /** 'file' nằm sẵn trong hồ sơ; 'room' phải khám xét phòng mới tìm ra */
  source: "file" | "room";
  /** id của vật thể trong phòng 3D, chỉ dùng khi source === 'room' */
  roomProp?: string;
  /** chỉ dùng khi source === 'room' — hình dạng thật khi lộ ra */
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
  /** nhãn dán trên ngăn kéo */
  codename: string;
  title: string;
  slot: { cabinet: "left" | "right"; drawer: number };
  state: "playable" | "coming-soon" | "sealed";
  /** chỉ với state === 'sealed' */
  needFragments?: number;
  brief: DossierPage[];
  /** chân dung in trên bìa tập hồ sơ trong cảnh 3D */
  coverPortraitId?: string;
  suspects: Suspect[];
  evidence: Evidence[];
  testimonies: Testimony[];
  links: CaseLink[];
  methods: Choice[];
  motives: Choice[];
  solution: { suspectId: string; methodId: string; motiveId: string };
  /** phải thu đủ những chứng cứ này mới được phép luận tội */
  requiredEvidence: string[];
  /** mảnh manh mối nhận được khi phá án — dùng để mở ngăn niêm phong cuối cùng */
  fragment: string;
}
