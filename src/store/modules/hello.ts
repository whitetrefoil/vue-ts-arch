import { create }        from 'kilimanjaro'
import API, {
  IServerResponseXHR,
  getErrorMessage,
}                        from '../../api'
import { IReceptionist } from '../../api/endpoints/receptionist'
import Receptionist      from '../../models/receptionist'
import * as t            from '../types'

export interface IHelloState {
  receptionist: Receptionist
}

const initialState: IHelloState = {
  receptionist: null,
}

const hello = create(initialState)

  .action(t.FETCH_RANDOM_RECEPTIONIST, (store) => async() => {
    let receptionist: Receptionist

    try {
      const response: IServerResponseXHR<IReceptionist>
              = <IServerResponseXHR<IReceptionist>> await API.get('receptionists/random')
      const receptionistData = response.data._data
      receptionist = new Receptionist(receptionistData.name)
    } catch (e) {
      console.warn(getErrorMessage(e))  // TODO
    }

    store.commit(t.SET_RECEPTIONIST, receptionist)
  })

  .mutation(t.SET_RECEPTIONIST, (state) => (receptionist: Receptionist) => {
    state.receptionist = receptionist
  })

export default hello
