import * as t from '../../../src/store/types'

describe('store :: hello :: mutations', () => {
  it('should set receptionist', () => {
    const mutations = require('../../../src/store/hello/mutations').mutations
    const state: any = {}
    mutations[t.HELLO__SET_RECEPTIONIST](state, 'asdf')
    expect(state.receptionist).toBe('asdf')
  })
})
