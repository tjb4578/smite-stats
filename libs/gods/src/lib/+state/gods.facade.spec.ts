import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as GodsActions from './gods.actions';
import { GodsEffects } from './gods.effects';
import { GodsFacade } from './gods.facade';
import { GodsEntity } from './gods.models';
import { GODS_FEATURE_KEY, State, initialState, reducer } from './gods.reducer';
import * as GodsSelectors from './gods.selectors';

interface TestSchema {
  gods: State;
}

describe('GodsFacade', () => {
  let facade: GodsFacade;
  let store: Store<TestSchema>;
  const createGodsEntity = (id: string, name = '', iconUrl = '', cardUrl = '', latestGod = '') =>
    ({
      id,
      Name: name || `name-${id}`,
      godIcon_URL: iconUrl,
      godCard_URL: cardUrl,
      latestGod: latestGod
    } as GodsEntity);

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GODS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GodsEffects]),
        ],
        providers: [GodsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GodsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allGods$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadGods();

        list = await readFirst(facade.allGods$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadGodsSuccess` to manually update list
     */
    it('allGods$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allGods$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          GodsActions.loadGodsSuccess({
            gods: [createGodsEntity('AAA'), createGodsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allGods$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
