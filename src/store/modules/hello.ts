import { Module }        from 'vuex'
import Receptionist      from '../../models/receptionist'
import API, {
  IServerResponseXHR,
  getErrorMessage,
}                        from '../../api'
import { IReceptionist } from '../../api/endpoints/receptionist'
import { IAppState }     from '../index'
import * as t            from '../types'

export interface IHelloState {
  receptionist: Receptionist
}

const hello: Module<IHelloState, IAppState> = {
  state: {
    receptionist: null,
  },

  actions: {
    async [t.FETCH_RANDOM_RECEPTIONIST]({ commit }) {
      let receptionist: Receptionist

      try {
        const response: IServerResponseXHR<IReceptionist>
                = <IServerResponseXHR<IReceptionist>> await API.get('receptionists/random')
        const receptionistData = response.data._data
        receptionist = new Receptionist(receptionistData.name)
      } catch (e) {
        console.warn(getErrorMessage(e))  // TODO
      }

      commit(t.SET_RECEPTIONIST, receptionist)
    },
  },

  mutations: {
    [t.SET_RECEPTIONIST](state: IHelloState, receptionist: Receptionist) {
      state.receptionist = receptionist
    },
  },
}

export default hello
