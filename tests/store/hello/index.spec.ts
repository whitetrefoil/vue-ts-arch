import { hello } from '../../../src/store/hello';

jest.resetModules();

describe('store :: hello', () => {
  it('should export state, actions & mutations', () => {
    expect(hello.actions).toBeDefined();
    expect(hello.mutations).toBeDefined();
    expect(hello.state).toBeDefined();
  });
});
