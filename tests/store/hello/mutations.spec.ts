import Receptionist  from '../../../src/models/receptionist';
import { mutations } from '../../../src/store/hello/mutations';
import * as t        from '../../../src/store/types';

jest.resetModules();

describe('store :: hello :: mutations', () => {
  it('should set receptionist', () => {
    const state: any   = {};
    const receptionist = new Receptionist('TestName');

    mutations[t.HELLO__SET_RECEPTIONIST](state, receptionist);

    expect(state.receptionist.name).toBe('TestName');
  });
});
