import Vuex      from 'vuex';
import { store } from '../../src/store';

jest.resetModules();

describe('store', () => {
  it('should export a Vuex.Store names store', () => {
    expect(store).toBeInstanceOf(Vuex.Store);
  });
});
