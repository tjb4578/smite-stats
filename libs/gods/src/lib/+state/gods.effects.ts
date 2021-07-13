import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GodsService } from '../services/gods.service';

import * as GodsActions from './gods.actions';
import { GodsEntity } from './gods.models';

@Injectable()
export class GodsEffects {
  loadGods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GodsActions.loadGods),
      mergeMap(() => this.godsService.getGods()
      .pipe(
        map((gods: GodsEntity[]) => GodsActions.loadGodsSuccess({gods})),
        catchError(() => of(GodsActions.loadGodsFailure))
      ))
    )
  );

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(GodsActions.init),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return GodsActions.loadGodsSuccess({ gods: [] });
  //       },
  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return GodsActions.loadGodsFailure({ error });
  //       },
  //     })
  //   )
  // );

  constructor(private readonly actions$: Actions, private readonly godsService: GodsService) {}
}
