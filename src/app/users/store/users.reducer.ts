import { createReducer, on } from "@ngrx/store"
import { logout, deleteUserSuccess } from "src/app/auth/store/auth.actions"
import { UserInfo } from "../users.model"
import { loadCurrentUser, loadUserSuccess, updateUserSuccess } from "./users.actions"

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
  on(updateUserSuccess, (state, action): State => {
    const userId = state.user?.id;
    if (!userId) {
      return state;
    }
    return { ...state, user: { login: action.updateUser.login, name: action.updateUser.name, id: userId } }
  }),
  on(logout, (state): State => {
    return { ...state, user: undefined }
  }),
  on(deleteUserSuccess, (state): State => {
    return { ...state, user: undefined }
  }),
)
