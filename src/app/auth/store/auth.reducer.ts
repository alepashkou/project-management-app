import { createReducer, on } from '@ngrx/store';
import { AuthInfo } from '../models/auth.model';
import { deleteUserSuccess, loadToken, login, loginError, loginSuccess, logout, tokenExpired } from "./auth.actions";

export interface State {
  user?: AuthInfo;
  loginInProgress: boolean;
}

const initialState: State = {
  loginInProgress: false
}

export const reducer = createReducer(
  initialState,
  on(login, (state): State => {
    return { ...state, loginInProgress: true }
  }),
  on(loginSuccess, (state, action): State => {
    return { ...state, user: action.authInfo, loginInProgress: false }
  }),
  on(loginError, (state): State => {
    return { ...state, loginInProgress: false }
  }),
  on(loadToken, (state, action): State => {
    return { ...state, user: { login: '', token: action.token }, loginInProgress: false }
  }),
  on(tokenExpired, (state): State => {
    return { ...state, user: undefined }
  }),
  on(logout, (state): State => {
    return { ...state, user: undefined }
  }),
  on(deleteUserSuccess, (state): State => {
    return { ...state, user: undefined }
  }),
)
