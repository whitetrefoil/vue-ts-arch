import { ActionContext }  from 'vuex'
import { actions }        from '../../../src/store/hello/actions'
import { IHelloState }    from '../../../src/store/hello/state'
import { IRootStateFull } from '../../../src/store/state'
import * as t             from '../../../src/store/types'

let mockGetReceptionist: Function

jest.mock('../../../src/api/endpoints/receptionist', () => ({
  // tslint:disable-next-line:no-unnecessary-callback-wrapper
  getReceptionist: () => mockGetReceptionist(),
}))

describe('store :: hello :: actions', () => {
  describe(':: fetch random receptionist', () => {
    it('should set a receptionist', async() => {

      mockGetReceptionist = jest.fn().mockReturnValue(Promise.resolve('asdf'))

      const context: ActionContext<IHelloState, IRootStateFull> = {
        commit     : jest.fn(),
        dispatch   : jest.fn(),
        rootState  : null,
        state      : null,
        getters    : {},
        rootGetters: {},
      }

      await actions[t.HELLO__FETCH_RANDOM_RECEPTIONIST](context)

      expect(mockGetReceptionist).toBeCalled()
      expect(context.commit).toBeCalledWith(t.HELLO__SET_RECEPTIONIST, 'asdf')
    })
  })
})
