import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as GodsActions from './gods.actions';
import * as GodsFeature from './gods.reducer';

@Injectable()
export class GodsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return GodsActions.loadGodsSuccess({ gods: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return GodsActions.loadGodsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
