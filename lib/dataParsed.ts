import rawData, { Data, RawData, State, Talent } from "./_data";
import rawTalents from "./MinedData/D_TalentArchetypes.json";

export const data: Data = {};

// export const initialState: State = {};

// rawData.talents.forEach((talent) => {
//   const { section, tab, id } = talent;
//   let parsedTalent: Talent = {
//     name: talent.name,
//     desc: talent.desc,
//     reqs: talent.reqs,
//     y: talent.y,
//     x: talent.x,
//     tier: talent.tier,
//     affect: rawData.affects[talent.affect],
//     values: talent.values,
//     img_name: talent.img_name,
//   };

//   // Populate the objects with the reformatted data
//   data[section] ??= {
//     background: "",
//     tabs: {},
//   };
//   data[section].tabs[tab] ??= {
//     background: "",
//     talents: {},
//   };
//   data[section].tabs[tab].talents[id] = parsedTalent;

//   initialState[section] ??= {};
//   initialState[section][tab] ??= {};
//   initialState[section][tab][id] = { rank: 0, max: talent.values.length };
// }
// ); a// END rawData.talents.forEach
