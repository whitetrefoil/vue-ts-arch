import clearRequire from 'clear-require'
import Vuex         from 'vuex'

const TARGET = '../../src/store'

let store

beforeEach(() => {
  store = require(TARGET).store
})

afterEach(() => {
  clearRequire(TARGET)
})


describe('store', () => {
  it('should export a Vuex.Store names store', () => {
    expect(store).toBeInstanceOf(Vuex.Store)
  })
})
