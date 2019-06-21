import TypedModule          from '@whitetrefoil/vuex-type-helpers';
import { FullState, store } from './index';


export namespace MessageStore {

  export interface State {
    errorMessages: string[];
  }

  export const state: State = {
    errorMessages: [],
  };

  const m = new TypedModule<State, FullState>(store, 'message', state);

  export const first = m.getter<string|undefined>('FIRST', s => s.errorMessages[0]);

  export const queue = m.mutation<string>('QUEUE', (s, { data }) => {
    s.errorMessages.push(data);
  });

  m.finish();
}
