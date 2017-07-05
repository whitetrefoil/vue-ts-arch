import clearRequire from 'clear-require'

let log

beforeEach(() => {
  log = require('../../src/services/log')
})

afterEach(() => {
  clearRequire('../../src/services/log')
})

describe('services :: log', () => {
  it('should have a function names "getLogger"', () => {
    expect(log.getLogger).toBeDefined()
  })
})
