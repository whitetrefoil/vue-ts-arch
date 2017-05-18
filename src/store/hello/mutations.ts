import Receptionist    from '../../models/receptionist'
import * as t          from '../types'
import { IHelloState } from './state'

export const mutations = {
  [t.SET_RECEPTIONIST](state: IHelloState, receptionist: Receptionist) {
    state.receptionist = receptionist
  },
}
