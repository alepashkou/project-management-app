import { AuthInfo } from "../models/user.model";
import { createReducer, on } from '@ngrx/store';
import { loginSuccess } from "./auth.actions";

export interface State {
  user?: AuthInfo;
}

const initialState: State = {}

export const reducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return { ...state, user: action.authInfo }
  })
)
