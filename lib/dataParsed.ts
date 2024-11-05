import rawArchetypes from "./MinedData/Talents/D_TalentArchetypes";
import rawTrees from "./MinedData/Talents/D_TalentTrees";
import rawTalents from "./MinedData/Talents/D_Talents";
import rawRanks from "./MinedData/Talents/D_TalentRanks";
import Mined from "./MinedData/_Mined";
import localizationCall from "./MinedData/localize";
import { localPngPath, convertToLocalImagePath } from "./MinedData/pngPath";

type bitmask = number;

export interface Section {
  caption: string;
  icon: localPngPath;
  tabs: { [name: string]: Tab };
}
export interface Sections {
  [name: string]: Section;
}

export interface Tab {
  caption: string;
  icon: localPngPath;
  background: localPngPath;
  talents: { [name: string]: Talent };
}

export type TalentReward = {
  stats: { [key: string]: number };
  unlocks: bitmask;
};

export interface Talent {
  caption: string;
  description: string;
  icon: localPngPath;
  pos: { x: number; y: number };
  rewards: TalentReward[];
  reqs?: string[];
  rank: number;
}

export interface Rank {
  caption: string;
  icon: localPngPath;
  investment: number;
  order: number;
}

export const sections: Sections = {};
export const ranks: { [name: string]: Rank } = {};
export const rankOrder: string[] = [];
/** This reverse lookup hash is because I want to store the tree top-down,
 * but the data is bottom-up.
 */
const TabToSectionHash: { [tab: string]: string } = {};

// Data function definitions
/** This will need to be updated if we ever start importing anything other than player talents */
function isPlayerTreeRow(test: Mined.TreeRow): test is Mined.PlayerTreeRow {
  return Object.hasOwn(sections, test.Archetype.RowName);
}
/** This will need to be updated if we ever start importing anything other than player talents */
function isPlayerTalent(
  test: Mined.TalentFileRow
): test is Mined.PlayerTalentRow {
  return Object.hasOwn(sections, TabToSectionHash[test.Name]);
}

/**
 *
 * In the process of switching from namespaces to modules (which is the react default, so no special syntax)
 * and converting the enums to regular vars, so that they can be extracted from mined data
 *
 */

// Importing the rank info (icon, required point investment, name)
rawRanks.Rows.forEach((row) => {
  ranks[row.Name] = {
    caption: localizationCall(row.DisplayName),
    icon: convertToLocalImagePath(row.Icon),
    investment: row.Investment ?? 0,
    order: 0,
  };
  rankOrder.push(row.Name);
});
rankOrder.sort(
  (a, b) => (ranks[a].investment ?? 0) - (ranks[b].investment ?? 0)
);
rankOrder.forEach((rank, index) => {
  ranks[rank].order = index;
});

// First, let's get the top-level archetypes, so we know which trees we care about.
rawArchetypes.Rows.forEach((row) => {
  if (row.Model.RowName !== "Player") return; // Only importing player talents for now.
  sections[row.Name] = {
    caption: localizationCall(row.DisplayName),
    icon: convertToLocalImagePath(row.Icon),
    tabs: {},
  };
}); // END Archetypes import to sections

// Now we pull the trees that we care about in as tabs
/** If we ever start caring about non-player archetypes,
 * this function will need to be updated. */
rawTrees.Rows.forEach((row) => {
  if (isPlayerTreeRow(row)) {
    sections[row.Archetype.RowName].tabs[row.Name] = {
      caption: localizationCall(row.DisplayName),
      icon: convertToLocalImagePath(row.Icon),
      background: convertToLocalImagePath(row.BackgroundTexture),
      talents: {},
    };
    TabToSectionHash[row.Name] = row.Archetype.RowName;
  }
}); // END Trees import into tabs

// Finally, we import the actual talents
/** If we ever start caring about non-player archetypes,
 * this function will need to be updated. */
rawTalents.Rows.forEach((row) => {
  if (isPlayerTalent(row)) {
    const tab = row.TalentTree.RowName;
    const section = TabToSectionHash[tab];
    sections[section].tabs[tab].talents[row.Name] = {
      caption: localizationCall(row.DisplayName),
      description: localizationCall(row.Description),
      icon: convertToLocalImagePath(row.Icon),
      pos: { x: row.Position.X, y: row.Position.Y },
      rewards: row.Rewards,
      rank: row.RequiredRank.RowName,
    };
  }
});
