import { GodsEntity } from './gods.models';
import { godsAdapter, GodsPartialState, initialState } from './gods.reducer';
import * as GodsSelectors from './gods.selectors';

describe('Gods Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGodsId = (it: GodsEntity) => it.id;
  const createGodsEntity = (id: string, name = '', iconUrl = '', cardUrl = '', latestGod = '') =>
    ({
      id,
      Name: name || `name-${id}`,
      godIcon_URL: iconUrl,
      godCard_URL: cardUrl,
      latestGod: latestGod
    } as GodsEntity);

  let state: GodsPartialState;

  beforeEach(() => {
    state = {
      gods: godsAdapter.setAll(
        [
          createGodsEntity('AAA'),
          createGodsEntity('BBB'),
          createGodsEntity('CCC'),
          createGodsEntity('DDD', '', '', '', 'y')
        ],
        {
          ...initialState,
          selectedId: 'BBB',
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
      expect(selId).toBe('BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GodsSelectors.getSelected(state) as GodsEntity;
      const selId = getGodsId(result);

      expect(selId).toBe('BBB');
    });

    it('getGodsLoaded() should return the current "loaded" status', () => {
      const result = GodsSelectors.getGodsLoaded(state);

      expect(result).toBe(true);
    });

    it('getGodsError() should return the current "error" state', () => {
      const result = GodsSelectors.getGodsError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getLatestGod() should return the god with latest set to (y)', () => {
      const result = GodsSelectors.getLatestGod(state);

      expect(result?.id).toBe('DDD');
    });
  });
});
