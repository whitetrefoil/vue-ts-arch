import { getLogger } from '../../src/services/log'

describe('services :: log', () => {
  it('should have a function names "getLogger"', () => {
    expect(getLogger).toBeDefined()
  })
})
