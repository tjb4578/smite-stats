import { Action } from '@ngrx/store';

import * as GodsActions from './gods.actions';
import { GodsEntity } from './gods.models';
import { State, initialState, reducer } from './gods.reducer';

describe('Gods Reducer', () => {
  const createGodsEntity = (id: string, name = '', iconUrl = '', cardUrl = '', latestGod = '') =>
    ({
      id,
      Name: name || `name-${id}`,
      godIcon_URL: iconUrl,
      godCard_URL: cardUrl,
      latestGod: latestGod
    } as GodsEntity);

  describe('valid Gods actions', () => {
    it('loadGodsSuccess should return the list of known Gods', () => {
      const gods = [
        createGodsEntity('PRODUCT-AAA'),
        createGodsEntity('PRODUCT-zzz'),
      ];
      const action = GodsActions.loadGodsSuccess({ gods });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
