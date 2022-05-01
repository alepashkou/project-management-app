import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromAuth from '../auth/store/reducer';
import { environment } from 'src/environments/environment';
export interface State {
  auth: fromAuth.State;
}
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
