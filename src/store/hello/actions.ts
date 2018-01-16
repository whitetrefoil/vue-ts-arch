import { ActionContext }   from 'vuex'
import { getReceptionist } from '../../api/endpoints/receptionist'
// import { getLogger }       from '../../services/log'
import { IRootStateFull }  from '../state'
import * as t              from '../types'
import { IHelloState }     from './state'

export type IHelloActionContext = ActionContext<IHelloState, IRootStateFull>

// const { debug } = getLogger('/src/store/hello/actions.ts')

export const actions = {
  async [t.HELLO__FETCH_RANDOM_RECEPTIONIST]({ commit }: IHelloActionContext) {
    let receptionist
    try {
      receptionist = await getReceptionist()
    } catch (e) {
      alert(e.message)
    }
    commit(t.HELLO__SET_RECEPTIONIST, receptionist)
  },
}
