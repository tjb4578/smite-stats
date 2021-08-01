import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as GodsActions from './gods.actions';
import * as GodsFeature from './gods.reducer';
import * as GodsSelectors from './gods.selectors';

@Injectable()
export class GodsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(GodsSelectors.getGodsLoaded));
  allGods$ = this.store.pipe(select(GodsSelectors.getAllGods));
  selectedGods$ = this.store.pipe(select(GodsSelectors.getSelected));
  latestGod$ = this.store.pipe(select(GodsSelectors.getLatestGod));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  loadGods() {
    this.store.dispatch(GodsActions.loadGods());
  }
}
