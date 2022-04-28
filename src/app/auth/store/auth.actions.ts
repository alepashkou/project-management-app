import { createAction, props } from '@ngrx/store';
import { AuthInfo } from '../models/auth.model';

export const login = createAction(
  '[Auth] login',
  props<{ login: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authInfo: AuthInfo }>()
);

export const loginError = createAction(
  '[Auth] Login Error'
)