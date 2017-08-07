describe('services :: log', () => {
  it('should have a function names "getLogger"', () => {
    const log = require('../../src/services/log')
    expect(log.getLogger).toBeDefined()
  })
})
