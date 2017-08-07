describe('store :: hello', () => {
  it('should export state', () => {
    const { state } = require('../../src/store/state')
    expect(state.errorMessages.length).toBe(0)
  })
})
