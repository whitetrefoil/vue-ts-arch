describe('store :: hello', () => {
  it('should export state, actions & mutations', () => {
    const hello = require('../../../src/store/hello').hello
    expect(hello.actions).toBeDefined()
    expect(hello.mutations).toBeDefined()
    expect(hello.state).toBeDefined()
  })
})
