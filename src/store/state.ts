import { IHelloState } from './hello/state'

export interface IRootStateModules {
  hello: IHelloState
}

export interface IRootState {
  errorMessages: string[]
}

export interface IRootStateFull extends IRootStateModules, IRootState {}

export const state: IRootState = {
  errorMessages: [],
}
