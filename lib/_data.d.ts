export interface RawArchetype extends RawData<Archetype> {}
export interface RawRank extends RawData<Rank> {}
export interface RawTalent extends RawData<Talent> {}
export interface RawTree extends RawData<Tree> {}

declare namespace loc {
  type table = string;
  type row = string;
  type fallback = string;
  type func = `NSLOCTEXT(\\"${table}\\", \\"${row}\\", \\"${fallback}\\")"`;
}

type pngPath = `/Game/Assets/2DArt/${string}`;

interface RawData<T extends basicTemplate> {
  /** Not needed for our purposes */
  RowStruct: string;
  /** A set of defaults that can be filled in per row */
  Defaults: T;
  /** Not needed for our purposes */
  Columns?: { any: any }[];
  Rows: [T];
}

type dlcName = "Laika" | "NewFrontiers" | "Styx" | "Galileo";
interface BasicTemplate {
  /**
   * This is the internal identifier
   */
  Name: string;
  /**
    This will be a localization function call written as a string

    The result of the call will be the user-viewable name.
   */
  DisplayName?: loc.func;
  /**
   * Fully qualified path to the icon from the game root, E.G. ```"/Game/Assets/2DArt/UI/Icons/Icon_TalentRank0.Icon_TalentRank0"```
   */
  Icon?: pngPath;
  /**
   * This can appear in any element to indicate that a named patch is required for it
   *
   * I don't think this matters for our purposes.
   * */
  Metadata?: {
    RequiredFeatureLevel: {
      RowName: dlcName;
    };
  };
}

interface Rank extends BasicTemplate {
  DisplayName;
  Icon;
  /**
   * How many total points must be invested in a tree to reach this rank.
   */
  Investment?: number;
  /**
   * The internal id of the rank after this one.
   */
  NextRank?: {
    /** This needs to match a name from D_TalentRanks.json */
    RowName: string;
  };
}

/**
 * For player talents, this is the tab.
 * For creature talents, this is the creature.
 * For blueprints, this is the tier.
 * For prospects, this is the prospect.
 * For workshop items, this is the category.
 */
type archetypeModels =
  | "Player"
  | "Creature"
  | "Blueprint"
  | "Prospect"
  | "Workshop";
interface Archetype extends BasicTemplate {
  DisplayName;
  Icon;
  /**
   * This tells us what category this archetype falls under.
   */
  Model: {
    RowName: archetypeModels;
  };
  RequiredLevel?: number;
}

type BlankBackground = "/Game/Assets/2DArt/UI/Windows/EmptyAsset.EmptyAsset";
interface Tree extends BasicTemplate {
  DisplayName;
  /**
   * Fully qualified path to the background from the game root, E.G. ```"/Game/Assets/2DArt/UI/Talents/Backgrounds/Adventure_Fishing_Background.Adventure_Fishing_Background"```
   */
  BackgroundTexture?: pngPath;
  /** This needs to match a name from D_TalentArchetypes.json */
  Archetype: {
    RowName: string;
  };
  FirstRank?: {
    RowName: string;
  };
  RequiredLevel?: number;
}

/**
 * This massively overloaded type is not just player and creature talents, but also blueprints, workshop items, and prospects.
 */
type Talent = PlayerTalent;
interface PlayerTalent extends BasicTemplate {
  /**
   * Reroutes are non-intractable, invisible nodes used to form intersections in the requirement trees.
   */
  bIsReroute: boolean;
  DisplayName;
  Description;
  Icon;
  TalentTree: {
    /** This needs to match a name from D_TalentTrees.json */
    RowName: string;
  };
  Position: {
    X: 0;
    Y: 0;
  };
  Size: {
    X: 64;
    Y: 64;
  };
  Rewards: {
    GrantedStats: { string: number };
    GrantedFlags: string[];
  }[];
  RequiredTalents?: { RowName: string; DataTableName: "D_Talents" }[];
  RequiredFlags?: [];
  ForbiddenFlags?: [];
  RequiredRank: {
    /** This needs to match a name from D_TalentRanks.json */
    RowName: string;
  };
  RequiredLevel: number;
  bDefaultUnlocked: boolean;
}

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
