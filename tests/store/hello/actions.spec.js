import * as t from '../../../src/store/types'

const MODULE_TO_TEST = '../../../src/store/hello/actions'

describe('store :: hello :: actions', () => {
  describe(':: fetch random receptionist', () => {
    it('should set a receptionist', async() => {
      const commit              = jest.fn()
      const mockGetReceptionist = jest.fn().mockReturnValue(Promise.resolve('asdf'))
      const context             = { commit }
      jest.mock('../../../src/api/endpoints/receptionist', () => ({ getReceptionist: mockGetReceptionist }))
      const actions = require(MODULE_TO_TEST).actions

      actions[t.HELLO__FETCH_RANDOM_RECEPTIONIST](context)
      await expect(mockGetReceptionist).toBeCalled()
      expect(commit).toBeCalledWith(t.HELLO__SET_RECEPTIONIST, 'asdf')
    })
  })
})
