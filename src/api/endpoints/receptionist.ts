import Receptionist from '../../models/receptionist'
import { get }      from '../base'

export interface IReceptionist {
  name: string
}

export async function getReceptionist(): Promise<Receptionist> {
  const response = await get<IReceptionist>('receptionists/random')
  return new Receptionist(response.name)
}
