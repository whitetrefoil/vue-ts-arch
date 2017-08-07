import Vuex from 'vuex'

describe('store', () => {
  it('should export a Vuex.Store names store', () => {
    const { store } = require('../../src/store')
    expect(store).toBeInstanceOf(Vuex.Store)
  })
})
