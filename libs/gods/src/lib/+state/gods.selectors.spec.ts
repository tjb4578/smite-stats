import { GodsEntity } from './gods.models';
import { godsAdapter, GodsPartialState, initialState } from './gods.reducer';
import * as GodsSelectors from './gods.selectors';

describe('Gods Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGodsId = (it: GodsEntity) => it.id;
  const createGodsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GodsEntity);

  let state: GodsPartialState;

  beforeEach(() => {
    state = {
      gods: godsAdapter.setAll(
        [
          createGodsEntity('PRODUCT-AAA'),
          createGodsEntity('PRODUCT-BBB'),
          createGodsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Gods Selectors', () => {
    it('getAllGods() should return the list of Gods', () => {
      const results = GodsSelectors.getAllGods(state);
      const selId = getGodsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GodsSelectors.getSelected(state) as GodsEntity;
      const selId = getGodsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getGodsLoaded() should return the current "loaded" status', () => {
      const result = GodsSelectors.getGodsLoaded(state);

      expect(result).toBe(true);
    });

    it('getGodsError() should return the current "error" state', () => {
      const result = GodsSelectors.getGodsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
