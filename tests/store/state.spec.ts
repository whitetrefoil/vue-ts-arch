import { state } from '../../src/store/state';

jest.resetModules();

describe('store :: hello', () => {
  it('should export state', () => {
    expect(state.errorMessages.length).toBe(0);
  });
});
