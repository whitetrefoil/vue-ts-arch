import { Axios, IServerResponseXHR, request }  from '..'
import { Observable } from 'rxjs'
import Receptionist from '../../models/receptionist'

export interface IReceptionist {
  name: string
}

function _getReceptionist(): Promise<IServerResponseXHR<IReceptionist>> {
  return <Promise<IServerResponseXHR<IReceptionist>>> Axios.get('receptionists/random')
}

export function getReceptionist(): Observable<IReceptionist> {
  return request(_getReceptionist)
    .map((receptionist: IReceptionist) => {
      return new Receptionist(receptionist.name)
    })
}
