import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUsers from '../users/store/users.reducer';
import { environment } from 'src/environments/environment';
export interface State {
  auth: fromAuth.State;
  users: fromUsers.State;
}
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  users: fromUsers.reducer,
};
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    // console.groupCollapsed(action.type);
    // console.log('prev state', state);
    // console.log('action', action);
    // console.log('next state', result);
    // console.groupEnd();
    return result;
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
