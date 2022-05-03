import { createAction, props } from '@ngrx/store';
import { UpdateUser, UserInfo } from '../users.model';

export const loadCurrentUser = createAction(
  '[Profile] LoadCurrentUser'
);

export const loadUserSuccess = createAction(
  '[Profile] LoadUserSuccess',
  props<{ userInfo: UserInfo }>()
);

export const updateUser = createAction(
  '[Profile] updateUser',
  props<{ updateUser: UpdateUser }>()
)

export const updateUserSuccess = createAction(
  '[Profile] updateUserSuccess'
)