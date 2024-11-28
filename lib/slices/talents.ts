/** @format */

import { sections, initialTalentState } from "../dataParsed";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const name = "talents";

interface TalentState {
  [section: string]: { [tab: string]: { [name: string]: number } };
}

type TalentIdentifier = { section: string; tab: string; name: string };

type selectSectionParams = { section: string };
const selectSection = (state: RootState, { section }: selectSectionParams) =>
  state[name][section];

type selectTabParams = selectSectionParams & { tab: string };
const selectTab = (state: RootState, { section, tab }: selectTabParams) =>
  selectSection(state, { section })[tab];

type selectTalentParams = selectTabParams & { talent: string };
const selectTalent = (
  state: RootState,
  { section, tab, talent }: selectTalentParams
) => selectTab(state, { section, tab })[talent];

const setReducer = (
  state: TalentState,
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
  name,
  initialState: initialTalentState,
  reducers: {
    set: setReducer,
    reset: resetReducer,
  },
});

export const { set, reset } = talentSlice.actions;
export default talentSlice.reducer;
