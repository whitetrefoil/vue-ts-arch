import Receptionist from '../../models/receptionist'

export interface IHelloState {
  receptionist: Receptionist|null
}

export const state: IHelloState = {
  receptionist: null,
}
