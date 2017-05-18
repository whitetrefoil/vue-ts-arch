import Receptionist        from '../../models/receptionist'

export interface IHelloState {
  receptionist: Receptionist
}

export const state: IHelloState = {
  receptionist: null,
}
