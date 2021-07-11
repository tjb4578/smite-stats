import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GODS_FEATURE_KEY, State, godsAdapter } from './gods.reducer';

// Lookup the 'Gods' feature state managed by NgRx
export const getGodsState = createFeatureSelector<State>(GODS_FEATURE_KEY);

const { selectAll, selectEntities } = godsAdapter.getSelectors();

export const getGodsLoaded = createSelector(
  getGodsState,
  (state: State) => state.loaded
);

export const getGodsError = createSelector(
  getGodsState,
  (state: State) => state.error
);

export const getAllGods = createSelector(getGodsState, (state: State) =>
  selectAll(state)
);

export const getGodsEntities = createSelector(getGodsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getGodsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getGodsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
