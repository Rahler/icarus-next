export interface Talent {
  readonly name: string;
  readonly desc: string;
  readonly reqs: string[];
  readonly y: number;
  readonly x: number;
  readonly tier: number;
  readonly affect: string;
  readonly values: number[];
  readonly img_name: string;
}
export interface RawTalent extends Talent {
  section: string;
  tab: string;
  id: string;
}
export interface RawData {
  talents: RawTalent[];
  affects: { [id: string]: string };
}
export interface Tab {
  background: string;
  talents: { [talentId: string]: Talent };
}
export interface Section {
  background: string;
  tabs: { [tabName: string]: Tab };
}
export interface Data {
  [sectionName: string]: Section;
}
export interface TalentState {
  rank: number;
  readonly max: number;
}
export interface TabState {
  [talentId: string]: TalentState;
}
export interface SectionState {
  [tabName: string]: TabState;
}
export interface State {
  [sectionName: string]: SectionState;
}

declare const data: RawData;
export default data;
