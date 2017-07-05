describe('store :: hello', () => {
  it('should export state', () => {
    const state = require('../../../src/store/hello/state')
    expect(state.state.receptionist).toBeDefined()
  })
})
