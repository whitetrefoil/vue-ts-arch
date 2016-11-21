import { create } from 'kilimanjaro'
import * as t     from './types'
import hello      from './modules/hello'

export interface IAppState {
  errorMessages: string[]
}

const initialState: IAppState = {
  errorMessages: [],
}

const store = create(initialState)

  .module('hello', hello)

  .mutation(t.QUEUE_ERROR_MESSAGE, (state) => (errorMessage: string) => {
    state.errorMessages.push(errorMessage)
  })

  .done()

export default store
