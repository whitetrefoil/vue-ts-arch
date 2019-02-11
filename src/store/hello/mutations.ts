import { MutationTree } from 'vuex'
import Receptionist     from '../../models/receptionist'
import { addMutation }  from '../helpers'
import * as t           from '../types'
import { IHelloState }  from './state'

export const mutations: MutationTree<IHelloState> = {}

export const setReceptionist = addMutation(
  mutations,
  t.HELLO__SET_RECEPTIONIST,
  (state, receptionist: Receptionist) => {
    state.receptionist = receptionist
  },
)
