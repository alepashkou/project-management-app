import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./users.reducer";

const selectState = createFeatureSelector<State>('users');

export const selectActiveUser = createSelector(
  selectState,
  (state) => state.user
);