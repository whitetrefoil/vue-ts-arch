import * as t     from './types'
import { IRootState } from './state'

export const mutations = {
  [t.QUEUE_ERROR_MESSAGE](state: IRootState, errorMessage: string) {
    state.errorMessages.push(errorMessage)
  },
}
