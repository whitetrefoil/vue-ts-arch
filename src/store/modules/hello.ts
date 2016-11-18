import { Module }    from 'vuex'
import Receptionist  from '../../models/receptionist'
import { IAppState } from '../index'
import * as t        from '../types'

export interface IHelloState {
  receptionist: Receptionist
}

const hello: Module<IHelloState, IAppState> = {
  state: {
    receptionist: null,
  },

  actions: {
    [t.MOCK_RANDOM_RECEPTIONIST]({ commit }) {
      setTimeout(() => {
        const randomNumber: string = Math.random().toString().substr(2)
        const receptionist = new Receptionist(`Employee ${randomNumber}`)
        commit(t.SET_RECEPTIONIST, receptionist)
      }, 1000)
    },
  },

  mutations: {
    [t.SET_RECEPTIONIST](state, receptionist) {
      state.receptionist = receptionist
    },
  },
}

export default hello
