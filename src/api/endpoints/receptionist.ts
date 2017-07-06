import { get } from 'superagent'
import { request } from '..'
import Receptionist from '../../models/receptionist'

export interface IReceptionist {
  name: string
}

export async function getReceptionist(): Promise<IReceptionist> {
  const receptionistData = await request<IReceptionist>(get('/api/receptionists/random'))
  return new Receptionist(receptionistData.name)
}
