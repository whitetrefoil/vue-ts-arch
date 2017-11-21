import { Axios, request } from '..'
import Receptionist       from '../../models/receptionist'

export interface IReceptionist {
  name: string
}

export async function getReceptionist(): Promise<Receptionist> {
  const response = await request<IReceptionist>(() => Axios.get('/api/receptionists/random'))
  return new Receptionist(response.name)
}
