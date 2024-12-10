/** @format */

import { sections, initialTalentState, ranks } from "../dataParsed";
import { createSlice } from "@reduxjs/toolkit";

export const talentSliceName = "talents";

interface TalentState {
  [name: string]: number;
}
interface TabState {
  [tab: string]: TalentState;
}
interface SectionState {
  [section: string]: TabState;
}

type TalentIdentifier = { section: string; tab: string; name: string };

const setReducer = (
  state: SectionState,
  { payload }: { payload: TalentIdentifier & { newValue: number } }
) => {
  const max =
    sections[payload.section].tabs[payload.tab].talents[payload.name].rewards
      .length;
  state[payload.section][payload.tab][payload.name] =
    payload.newValue > max ? max : payload.newValue < 0 ? 0 : payload.newValue;
};

const resetReducer = () => {
  return initialTalentState;
};

const talentSlice = createSlice({
  name: talentSliceName,
  initialState: initialTalentState,
  reducers: {
    set: setReducer,
    reset: resetReducer,
  },
});

export const { set, reset } = talentSlice.actions;
export default talentSlice.reducer;
