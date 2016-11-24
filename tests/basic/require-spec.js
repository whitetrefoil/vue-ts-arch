'use strict'

describe('Webpack require ::', () => {
  describe('.ts files ::', () => {
    it('should pass', () => {
      const t = require('../../src/store/types')
      expect(t).toBeDefined()
      expect(typeof t.QUEUE_ERROR_MESSAGE).toBe('string')
      expect(t.NOT_EXISTS).toBeUndefined()
    })
  })
})
