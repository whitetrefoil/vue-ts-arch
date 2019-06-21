import { state } from '../../../src/store/hello/state';

jest.resetModules();

describe('store :: hello', () => {
  it('should export state', () => {
    expect(state.receptionist).toBeDefined();
  });
});
