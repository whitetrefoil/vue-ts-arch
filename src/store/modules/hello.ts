import { create }        from 'kilimanjaro'
import {
  getReceptionist,
}                        from '../../api/endpoints/receptionist'
import Receptionist      from '../../models/receptionist'
import * as t            from '../types'

export interface IHelloState {
  receptionist: Receptionist
}

const initialState: IHelloState = {
  receptionist: null,
}

const hello = create(initialState)

  .action(
    t.FETCH_RANDOM_RECEPTIONIST,
    (store) => () => {
      getReceptionist()
        .subscribe(
          (receptionist) => {
            store.commit(t.SET_RECEPTIONIST, receptionist)
          },
          (error) => {
            console.warn(error)  // TODO
          },
        )
    },
  )

  .mutation(
    t.SET_RECEPTIONIST,
    (state) => (receptionist: Receptionist) => {
      state.receptionist = receptionist
    },
  )

export default hello
