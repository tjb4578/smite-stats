import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GodsActions from './gods.actions';
import { GodsEntity } from './gods.models';

export const GODS_FEATURE_KEY = 'gods';

export interface State extends EntityState<GodsEntity> {
  selectedId?: string | number; // which Gods record has been selected
  loaded: boolean; // has the Gods list been loaded
  error?: string | null; // last known error (if any)
}

export interface GodsPartialState {
  readonly [GODS_FEATURE_KEY]: State;
}

export const godsAdapter: EntityAdapter<GodsEntity> =
  createEntityAdapter<GodsEntity>();

export const initialState: State = godsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const godsReducer = createReducer(
  initialState,
  on(GodsActions.loadGods, (state) => ({ ...state, loaded: false, error: null })),
  on(GodsActions.loadGodsSuccess, (state, { gods }) =>
    godsAdapter.setAll(gods, { ...state, loaded: true })
  ),
  on(GodsActions.loadGodsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return godsReducer(state, action);
}
