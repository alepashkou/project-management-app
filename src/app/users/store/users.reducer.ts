import { createReducer, on } from "@ngrx/store"
import { UserInfo } from "../users.model"
import { loadCurrentUser, loadUserSuccess } from "./users.actions"

export interface State {
  user?: UserInfo
}

const initialState: State = {
}

export const reducer = createReducer(
  initialState,
  on(loadCurrentUser, (state): State => {
    return { ...state }
  }),
  on(loadUserSuccess, (state, action): State => {
    return { ...state, user: action.userInfo }
  }),
)