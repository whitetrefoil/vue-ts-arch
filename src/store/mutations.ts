import { IRootState } from './state'
import * as t         from './types'

export const mutations = {
  [t.QUEUE_ERROR_MESSAGE](state: IRootState, errorMessage: string) {
    state.errorMessages.push(errorMessage)
  },
}
