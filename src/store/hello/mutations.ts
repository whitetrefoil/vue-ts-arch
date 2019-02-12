import { addMutation }  from '@whitetrefoil/vuex-type-helpers'
import { MutationTree } from 'vuex'
import Receptionist     from '../../models/receptionist'
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
