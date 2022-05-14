import { createAction, props } from '@ngrx/store';
import { UpdateUser, UserInfo } from '../users.model';

export const loadCurrentUser = createAction(
  '[Profile] Load Current User'
);

export const loadUserSuccess = createAction(
  '[Profile] Load User Success',
  props<{ userInfo: UserInfo }>()
);

export const updateUser = createAction(
  '[Profile] Update User',
  props<{ updateUser: UpdateUser }>()
)

export const updateUserSuccess = createAction(
  '[Profile] Update User Success',
  props<{ updateUser: UpdateUser }>()
)

export const updateUserError = createAction(
  '[Profile] Update User Error'
)

export const logoutUser = createAction(
  '[Profile] Logout User',
  props<{ userInfo: UserInfo }>()
)