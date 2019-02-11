import { ActionTree }      from 'vuex'
import { getReceptionist } from '../../api/endpoints/receptionist'
import { addAction }       from '../helpers'
// import { getLogger }       from '../../services/log'
import { IRootStateFull }  from '../state'
import * as t              from '../types'
import { setReceptionist } from './mutations'
import { IHelloState }     from './state'

// const { debug } = getLogger('/src/store/hello/actions.ts')

export const actions: ActionTree<IHelloState, IRootStateFull> = {}

export const fetchRandomReceptionist = addAction(
  actions,
  t.HELLO__FETCH_RANDOM_RECEPTIONIST,
  async({ commit }) => {
    let receptionist
    try {
      receptionist = await getReceptionist()
      commit(setReceptionist(receptionist))
    } catch (e) {
      console.error(e.message)
    }
  },
)
