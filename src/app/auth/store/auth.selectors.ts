import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./auth.reducer";
import jwt_decode from "jwt-decode";
import { TokenData } from "../models/auth.model";

const selectState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectState,
  (state) => state.user?.token
);

export const selectIsLoginInProgress = createSelector(
  selectState,
  (state) => state.loginInProgress
);

export const selectParseToken = createSelector(
  selectToken,
  (token) => {
    if (token) {
      return jwt_decode(token) as TokenData;
    }
    return null
  }
)

export const selectCurrentUserId = createSelector(
  selectParseToken,
  (tokenData) => {
    return tokenData?.userId
  }
)

export const selectTokenIat = createSelector(
  selectParseToken,
  (token) => token?.iat
)