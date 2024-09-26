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
  Columns?: {}[];
  Rows: T[];
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
   * Fully qualified path to the background from the game root
   */
  BackgroundTexture?: pngPath;
  /** This needs to match a name from D_TalentArchetypes.json */
  Archetype: {
    RowName: string;
  };
  FirstRank?: {
    /** This needs to match a name from D_TalentRanks.json */
    RowName: string;
  };
  RequiredLevel?: number;
}

/**
 * This massively overloaded type is not just player and creature talents,
 * but also blueprints, workshop items, and prospects.
 */
type Talent = PlayerTalent;
type GrantedStats = `(Value=\\"${string}\\")`;
type Rank = "Novice" | "Apprentice" | "Journeyman" | "Master";
interface PlayerTalent extends BasicTemplate {
  /**
   * Reroutes are non-intractable, invisible nodes used to form intersections
   * in the requirement trees.
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
    X: number;
    Y: number;
  };
  Size: {
    X: number;
    Y: number;
  };
  Rewards: {
    /** Bonus to a specific stat */
    GrantedStats: { [key: GrantedStats]: number };
    /** Feature unlocks E.G. the ability to learn stick breakdown from inventory */
    GrantedFlags: string[];
  }[];
  RequiredTalents?: {
    /**
     * This needs to match a name from D_Talents.json
     */
    RowName: string;
    /** Not needed for our purposes
     *
     * I'm hardcoding the table lookups */
    DataTableName: "D_Talents";
  }[];
  /** This needs to match an element in a "GrantedFlags" array */
  RequiredFlags?: [];
  /** Not needed for our purposes
   *
   * These are used to lock out certain things during missions
   */
  ForbiddenFlags?: [];
  RequiredRank: {
    /** This needs to match a name from D_TalentRanks.json */
    RowName: Rank;
  };
  bDefaultUnlocked: boolean;
}
