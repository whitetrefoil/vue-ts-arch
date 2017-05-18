import { ActionContext }   from 'vuex'
import { getReceptionist } from '../../api/endpoints/receptionist'
import { getLogger }       from '../../services/log'
import { IRootStateFull }  from '../state'
import * as t              from '../types'
import { IHelloState }     from './state'

export type IHelloActionContext = ActionContext<IHelloState, IRootStateFull>

const { debug } = getLogger('/src/store/hello/actions.ts')

export const actions = {
  [t.FETCH_RANDOM_RECEPTIONIST]({ commit }: IHelloActionContext) {
    getReceptionist()
      .subscribe(
        (receptionist) => commit(t.SET_RECEPTIONIST, receptionist),
        debug, // TODO
      )
  },
}
