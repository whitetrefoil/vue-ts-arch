import * as t        from '../../src/store/types'
import { mutations } from '../../src/store/mutations'

jest.resetModules()

describe(t.QUEUE_ERROR_MESSAGE, () => {
  it('should queue the error message', () => {
    const state: any = { errorMessages: [] }
    mutations[t.QUEUE_ERROR_MESSAGE](state, 'asdf')
    expect(state.errorMessages.length).toBe(1)
    expect(state.errorMessages[0]).toBe('asdf')
  })
})
