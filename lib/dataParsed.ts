/** @format */

import rawArchetypes from "./MinedData/Talents/D_TalentArchetypes";
import rawTrees from "./MinedData/Talents/D_TalentTrees";
import rawTalents from "./MinedData/Talents/D_Talents";
import rawRanks from "./MinedData/Talents/D_TalentRanks";
import Mined from "./MinedData/_Mined";
import localizationCall from "./MinedData/localize";
import { localPngPath, convertToLocalImagePath } from "./MinedData/pngPath";
import {
  convertGrantedStatName,
  minedGrantedStatName,
} from "./MinedData/statName";

export interface Section {
  /** Human-readable name */
  caption: string;
  /** Full path to the icon */
  icon: localPngPath;
  /** All the {@link Tab | tabs} that are nested under this section */
  tabs: { [name: string]: Tab };
}
export interface Sections {
  [name: string]: Section;
}
export type SingleTalentState = number;
export interface TabState {
  /** The amount invested in that talent */
  [talentName: string]: SingleTalentState;
}
export interface SectionState {
  [tabName: string]: TabState;
}
export interface TalentState {
  [SectionName: string]: SectionState;
}

export interface Tab {
  caption: string;
  icon: localPngPath;
  background: localPngPath;
  talents: { [name: string]: Talent };
}

export type TalentReward = {
  stats: { [statName: string]: number };
  flags: string[];
};

/** This represents individual talents (currently only player talents)
 */
export interface Talent {
  caption: string;
  description: string;
  icon: localPngPath;
  pos: { x: number; y: number };
  rewards: TalentReward[];
  reqs?: string[];
  /** Needs to match a key in {@link ranks} */
  rank: string;
}

export interface Rank {
  caption: string;
  icon: localPngPath;
  investment: number;
  order: number;
}

export interface StatNames {
  [name: string]: { positiveName: string; negativeName: string };
}

export const sections: Sections = {};
export const ranks: { [name: string]: Rank } = {};
export const rankOrder: string[] = [];
export const statNames: StatNames = {};
export const initialTalentState: TalentState = {};
/** This reverse lookup hash is because I want to store the tree top-down,
 * but the data is bottom-up.
 */
const TabToSectionHash: { [tab: string]: string } = {};

/********************************************************************/
/********************* Data function definitions ********************/
/********************************************************************/

/** This will need to be updated if we ever start importing anything other than player talents */
function isPlayerTreeRow(test: Mined.TreeRow): test is Mined.PlayerTreeRow {
  return Object.hasOwn(sections, test.Archetype.RowName);
}
/** This will need to be updated if we ever start importing anything other than player talents */
function isPlayerTalent(
  test: Mined.TalentFileRow
): test is Mined.PlayerTalentRow {
  return (
    Object.hasOwn(TabToSectionHash, test.TalentTree.RowName) && !test.bIsReroute
  );
}

// /** This will need to be updated if we ever start importing anything other than player talents */
// function isPlayerReroute(test: Mined.TalentFileRow): test is Mined.Reroute {
//   return (
//     Object.hasOwn(TabToSectionHash, test.TalentTree.RowName) && test.bIsReroute
//   );
// }

// Importing the rank info (icon, required point investment, name)
rawRanks.Rows.forEach(row => {
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

/** Get the top-level archetypes, so we know which trees we care about. In the
 * context of talents, I will be referring to them as "Sections" */
rawArchetypes.Rows.forEach(row => {
  /** Only importing player talents for now */
  if (row.Model.RowName == "Player") {
    sections[row.Name] = {
      caption: localizationCall(row.DisplayName),
      icon: convertToLocalImagePath(row.Icon),
      tabs: {},
    };
    /** Create the top-level section object for the initial redux state */
    initialTalentState[row.Name] = {};
  }
}); // END Archetypes import to sections

/** Now we pull the trees that we care about in as tabs. If we ever start
 * caring about non-player archetypes, this function will need to be updated.
 * */
rawTrees.Rows.forEach(row => {
  if (isPlayerTreeRow(row)) {
    sections[row.Archetype.RowName].tabs[row.Name] = {
      caption: localizationCall(row.DisplayName),
      icon: convertToLocalImagePath(row.Icon),
      background: convertToLocalImagePath(row.BackgroundTexture),
      talents: {},
    };
    TabToSectionHash[row.Name] = row.Archetype.RowName;
    initialTalentState[row.Archetype.RowName][row.Name] = {};
  }
}); // END Trees import into tabs

/** Import the talent definitions themselves. If we ever start caring about
 * non-player archetypes, this function will need to be updated. */
rawTalents.Rows.forEach(row => {
  if (isPlayerTalent(row)) {
    const tab = row.TalentTree.RowName;
    const section = TabToSectionHash[tab];
    const rank = row.RequiredRank?.RowName ?? rankOrder[0];
    sections[section].tabs[tab].talents[row.Name] = {
      caption: localizationCall(row.DisplayName),
      description: localizationCall(row.Description),
      icon: convertToLocalImagePath(row.Icon),
      pos: { x: row.Position.X, y: row.Position.Y },
      rewards: row.Rewards.map((reward): TalentReward => {
        const stats: { [name: string]: number } = {};
        (
          Object.entries(reward.GrantedStats) as [
            minedGrantedStatName,
            number
          ][]
        ).forEach(([name, val]) => {
          const convertedName = convertGrantedStatName(name);
          stats[convertedName] = val;
          statNames[convertedName] ??= {
            positiveName: localizationCall(
              `NSLOCTEXT("D_Stats", "${convertedName}-PositiveDescription", "${convertedName}")`
            ),
            negativeName: localizationCall(
              `NSLOCTEXT("D_Stats", "${convertedName}-NegativeDescription", "${convertedName}")`
            ),
          };
        });
        return { stats, flags: reward.GrantedFlags };
      }),
      rank: rank,
    };
    initialTalentState[section][tab][row.Name] = 0;
  }
});
