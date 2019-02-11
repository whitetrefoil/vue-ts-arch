import Receptionist    from '../../models/receptionist'
import { addMutation } from '../helpers'
import * as t          from '../types'
import { IHelloState } from './state'

export const mutations = {}

export const setReceptionist = addMutation<IHelloState, Receptionist>(
  mutations,
  t.HELLO__SET_RECEPTIONIST,
  (state, { data }) => {
    state.receptionist = data
  },
)
