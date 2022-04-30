import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./reducer";

const selectState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectState,
  (state) => state.user?.token
);

export const selectIsLoginInProgress = createSelector(
  selectState,
  (state) => state.loginInProgress
);