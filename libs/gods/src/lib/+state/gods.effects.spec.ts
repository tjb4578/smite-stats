import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as GodsActions from './gods.actions';
import { GodsEffects } from './gods.effects';

describe('GodsEffects', () => {
  let actions: Observable<Action>;
  let effects: GodsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GodsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GodsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GodsActions.loadGods() });

      const expected = hot('-a-|', {
        a: GodsActions.loadGodsSuccess({ gods: [] }),
      });

      expect(effects.loadGods$).toBeObservable(expected);
    });
  });
});
