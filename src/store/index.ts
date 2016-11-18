import { Vue }                from 'av-ts'
import Vuex                 = require('vuex')
import * as t                 from './types'
import hello, { IHelloState } from './modules/hello'

// noinspection TypeScriptUnresolvedFunction
Vue.use(Vuex)

export interface IAppState {
  errorMessages: string[]
  hello?: IHelloState
}

const initialState: IAppState = {
  errorMessages: [],
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: initialState,

  mutations: {
    [t.QUEUE_ERROR_MESSAGE](state: IAppState, errorMessage: string) {
      state.errorMessages.push(errorMessage)
    },
  },

  modules: {
    hello,
  },
})

export default store
