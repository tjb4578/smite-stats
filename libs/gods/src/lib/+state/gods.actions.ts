import { createAction, props } from '@ngrx/store';
import { GodsEntity } from './gods.models';

export const init = createAction('[Gods Page] Init');

export const loadGodsSuccess = createAction(
  '[Gods/API] Load Gods Success',
  props<{ gods: GodsEntity[] }>()
);

export const loadGodsFailure = createAction(
  '[Gods/API] Load Gods Failure',
  props<{ error: any }>()
);
