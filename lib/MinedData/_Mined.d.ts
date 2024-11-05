import { loc } from "./localize";
import { minedPngPath as pngPath } from "./pngPath";

interface rowTemplate {
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
  /** This is used to link to additional json files. Way beyond the scope of this project. */
  ExtraData?: {
    RowName: string;
    DataTableName: string;
  };
  /**
   * This can appear in any element to indicate that a named patch is required for it
   *
   * I don't think this matters for our purposes.
   * */
  Metadata?: {
    RequiredFeatureLevel: {
      RowName: string;
    };
  };
}

interface RawData<T extends rowTemplate> {
  /** Not needed for our purposes.
   *
   * This just tells UE which struct to use for the data.
   */
  RowStruct: string;
  /** A set of defaults that can be filled in per row */
  Defaults: Required<T>;
  /** Not needed for our purposes.
   *
   * More information UE uses, I'm thinking to generate internal data formats
   */
  Columns?: {}[];
  /**  */
  Rows: T[];
}

interface Rank extends rowTemplate {
  Name: RankName;
  DisplayName: NonNullable<rowTemplate["DisplayName"]>;
  Icon: nonNullable<rowTemplate["Icon"]>;
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
interface Archetype extends rowTemplate {
  DisplayName: nonNullable<rowTemplate["DisplayName"]>;
  Icon: nonNullable<rowTemplate["Icon"]>;
  /**
   * This tells us what category this archetype falls under.
   */
  Model: {
    RowName: string;
  };
  RequiredLevel?: number;
}

export type BlankBackground =
  "/Game/Assets/2DArt/UI/Windows/EmptyAsset.EmptyAsset";
interface TreeRow extends rowTemplate {
  DisplayName: nonNullable<rowTemplate["DisplayName"]>;
  Icon: nonNullable<rowTemplate["Icon"]>;
  /**
   * Fully qualified path to the background from the game root
   */
  BackgroundTexture?: pngPath;
  /** This needs to match a name from D_TalentArchetypes.json */
  Archetype: {
    RowName: string;
  };
  FirstRank?: {
    /** This needs to match a name from D_TalentRanks.json */
    RowName: Rank;
  };
}
interface PlayerTreeRow extends TreeRow {
  BackgroundTexture: nonNullable<TreeRow["BackgroundTexture"]>;
  FirstRank: nonNullable<TreeRow["FirstRank"]>;
}

type GrantedStat = `(Value=\\"${string}\\")`;
export const GrantedStatRegex = /\(Value=\\\\(\w+)"\\\\"\)/;
export const enum DrawMethod {
  "YThenX",
  "XThenY",
  "ShortestDistance",
}
interface TalentReward {
  /** Bonus to a specific stat */
  GrantedStats: { [key: GrantedStats]: number };
  /** Feature unlocks E.G. the ability to learn stick breakdown from inventory */
  GrantedFlags: string[];
}
interface talentFileTemplate extends rowTemplate {
  TalentTree: {
    /** This needs to match a name from D_TalentTrees.json */
    RowName: string;
  };
  Position: {
    X: number;
    Y: number;
  };
  Size: {
    X: number;
    Y: number;
  };
  /**
   * Reroutes are non-intractable, invisible nodes used to form intersections
   * in the requirement trees.
   */
  bIsReroute?: boolean;
  Rewards?: TalentRewards[];
  RequiredTalents?: {
    /**
     * This needs to match a name from D_Talents.json
     */
    RowName: string;
    /** Not needed for our purposes.
     *
     * I'm hardcoding the table lookups */
    DataTableName: "D_Talents";
  }[];
  /** This needs to match an element in a "GrantedFlags" array */
  RequiredFlags?: [];
  /** Not needed until we start interacting with non-talent entries.
   *
   * These are used to lock out certain things during the tutorial
   * and to gate DLC content
   */
  ForbiddenFlags?: [];
  RequiredRank?: {
    /** This needs to match a name from D_TalentRanks.json */
    RowName: Rank;
  };
  /** This controls how the game renders the requirement lines.
   *
   * I'm undecided if I want to ignore this or not. Currently
   * leaning towards ignoring.
   */
  DrawMethodOverride?: DrawMethod;
  /** Whether this is unlocked for free. Used for reroutes and starting blueprints,
   * prospects, and missions */
  bDefaultUnlocked?: boolean;
}

interface talentTemplateRow extends talentFileTemplate {
  DisplayName: nonNullable<talentFileTemplate["DisplayName"]>;
  Description: nonNullable<talentFileTemplate["Description"]>;
  Icon: nonNullable<talentFileTemplate["Icon"]>;
  Rewards: nonNullable<talentFileTemplate["Rewards"]>;
}

interface PlayerTalentRow extends talentTemplateRow {
  bIsReroute: false;
  RequiredRank: nonNullable<talentTemplateRow["RequiredRank"]>;
}
interface CreatureTalentRow extends talentTemplateRow {
  bIsReroute: false;
  TalentTree: {
    RowName: `Creature_${string}`;
  };
}
interface Blueprint extends talentFileTemplate {
  bIsReroute: false;
  ExtraData: nonNullable<talentFileTemplate["ExtraData"]>;
  DisplayName: nonNullable<talentFileTemplate["DisplayName"]>;
  Icon: nonNullable<talentFileTemplate["Icon"]>;
  TalentTree: {
    RowName: `Blueprint_${string}`;
  };
}
interface Workshop extends talentFileTemplate {
  bIsReroute: false;
  ExtraData: nonNullable<talentFileTemplate["ExtraData"]>;
  TalentTree: {
    RowName: `Workshop_${string}`;
  };
}
interface Mission extends talentFileTemplate {
  bIsReroute: false;
  ExtraData: nonNullable<talentFileTemplate["ExtraData"]>;
  TalentTree: {
    RowName: `Prospect_${string}`;
  };
}
interface Outpost extends talentFileTemplate {
  bIsReroute: false;
  ExtraData: nonNullable<talentFileTemplate["ExtraData"]>;
  TalentTree: {
    RowName: "Outpost";
  };
}
interface Reroute extends talentFileTemplate {
  bIsReroute: true;
  bDefaultUnlocked: true;
}

/**
 * This massively overloaded type is not just player and creature talents,
 * but also blueprints, workshop items, outposts, *and* missions.
 */
type TalentFileRow =
  | PlayerTalentRow
  | CreatureTalentRow
  | Blueprint
  | Workshop
  | Mission
  | Outpost
  | Reroute;

export interface RawArchetype extends RawData<Archetype> {}
export interface RawRank extends RawData<Rank> {}
export interface RawTalent extends RawData<TalentFileRow> {}
export interface RawTree extends RawData<TreeRow> {}
