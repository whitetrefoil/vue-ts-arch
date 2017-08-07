import * as t from '../../../src/store/types'

describe('store :: hello :: actions', () => {
  describe(':: fetch random receptionist', () => {
    it('should set a receptionist', async() => {
      const commit = jest.fn()
      const mockGetReceptionist = jest.fn().mockReturnValue(Promise.resolve('asdf'))
      const context = { commit }
      jest.mock('../../../src/api/endpoints/receptionist', () => ({ getReceptionist: mockGetReceptionist }))
      const actions = require('../../../src/store/hello/actions').actions

      actions[t.HELLO__FETCH_RANDOM_RECEPTIONIST](context)
      await expect(mockGetReceptionist).toBeCalled()
      expect(commit).toBeCalledWith(t.HELLO__SET_RECEPTIONIST, 'asdf')
    })
  })
})
