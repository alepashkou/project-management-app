import { AuthInfo } from "../models/user.model";
import { createReducer, on } from '@ngrx/store';
import { login, loginError, loginSuccess } from "./auth.actions";

export interface State {
  user?: AuthInfo;
  loginInProgress: boolean;
}

const initialState: State = {
  loginInProgress: false
}

export const reducer = createReducer(
  initialState,
  on(login, (state) => {
    return { ...state, loginInProgress: true }
  }),
  on(loginSuccess, (state, action) => {
    return { ...state, user: action.authInfo, loginInProgress: false }
  }),
  on(loginError, (state) => {
    return { ...state, loginInProgress: false }
  })
)
