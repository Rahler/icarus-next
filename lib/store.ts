import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore, createSelector } from "@reduxjs/toolkit";
import talents, { talentSliceName } from "./slices/talents";
import { ranks } from "./dataParsed";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices({ talents });
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;
export const createAppSelector = createSelector.withTypes<RootState>()

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([]);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

type selectTalentParams = { section: string; tab: string; talent: string };
export const selectTalent = (
  state: RootState,
  { section, tab, talent }: selectTalentParams
) => state[talentSliceName][section][tab][talent];

type selectTabParams = { section: string; tab: string };
export const selectTabTotal = createAppSelector(
  (state: RootState, { section, tab }: selectTabParams) =>
    state[talentSliceName][section][tab],
  tab => {
    return Object.values(tab).reduce((prev, curr) => prev + curr, 0);
  }
);

export const selectTotal = createAppSelector(
  (state: RootState) => state[talentSliceName],
  sectionState => {
    return Object.values(sectionState).reduce(
      (prev, curr) =>
        prev +
        Object.values(curr).reduce(
          (prev, curr) =>
            prev + Object.values(curr).reduce((prev, curr) => prev + curr, 0),
          0
        ),
      0
    );
  }
);

export const selectRankMet = createAppSelector(selectTabTotal, (...params: [RootState, selectTabParams, string])=>params[2], (tabInvestment, targetRank)=>{
  return tabInvestment >= ranks[targetRank].investment
})