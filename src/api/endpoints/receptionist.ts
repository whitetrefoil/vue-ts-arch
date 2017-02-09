import { Axios, IServerResponse, request }  from '..'
import { Observable } from 'rxjs/Observable'
import Receptionist from '../../models/receptionist'

export interface IReceptionist {
  name: string
}

function _getReceptionist(): Promise<IServerResponse<IReceptionist>> {
  return Axios.get('receptionists/random') as Promise<IServerResponse<IReceptionist>>
}

export function getReceptionist(): Observable<IReceptionist> {
  return request(_getReceptionist)
    .map((receptionist: IReceptionist) => {
      return new Receptionist(receptionist.name)
    })
}
