import { createAction, props } from '@ngrx/store';
import { AuthInfo, SignUp } from '../models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ login: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authInfo: AuthInfo }>()
);

export const loginError = createAction(
  '[Auth] Login Error'
)

export const signup = createAction(
  '[Auth] Signup',
  props<{ signupInfo: SignUp }>()
)

export const signupSuccess = createAction(
  '[Auth] Signup Success'
)

export const signupError = createAction(
  '[Auth] Signup Error'
)

export const loadToken = createAction(
  '[Auth] Load Token',
  props<{ token: string }>()
)

export const tokenExpired = createAction(
  '[Auth] Token Expired',
)

export const logout = createAction(
  '[Profile] Logout User'
)

export const deleteUserSuccess = createAction(
  '[Profile] Delete User'
)