import * as t from '../../src/store/types'

describe(t.QUEUE_ERROR_MESSAGE, () => {
  it('should queue the error message', () => {
    const mutations = require('../../src/store/mutations').mutations
    const state     = { errorMessages: [] }
    mutations[t.QUEUE_ERROR_MESSAGE](state, 'asdf')
    expect(state.errorMessages.length).toBe(1)
    expect(state.errorMessages[0]).toBe('asdf')
  })
})
