import type { CaseFile, Evidence, Suspect } from "../case-types";
import { case01 } from "./case-01";
import { case02 } from "./case-02";
import { case03 } from "./case-03";
import { case04 } from "./case-04";
import { case05 } from "./case-05";
import { case06 } from "./case-06";
import { case07 } from "./case-07";

export const cases: CaseFile[] = [case01, case02, case03, case04, case05, case06, case07];

export function findCase(id: string): CaseFile | undefined {
  return cases.find((c) => c.id === id);
}

export function findEvidence(caseFile: CaseFile, id: string): Evidence | undefined {
  return caseFile.evidence.find((e) => e.id === id);
}

export function findSuspect(caseFile: CaseFile, id: string): Suspect | undefined {
  return caseFile.suspects.find((s) => s.id === id);
}

export const LAST_CASE_ID = "case-07";

export type { CaseFile, Evidence, Suspect } from "../case-types";
