import { createAction, props } from '@ngrx/store';
import { AuthInfo } from '../models/user.model';

export const login = createAction(
  '[Auth] login',
  props<{ login: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authInfo: AuthInfo }>()
);