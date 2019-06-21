import TypedModule          from '@whitetrefoil/vuex-type-helpers';
import { getReceptionist }  from '../api/endpoints/receptionist';
import Receptionist         from '../models/receptionist';
import { FullState, store } from './index';
import { MessageStore }     from './message';

export namespace ReceptionistStore {

  export interface State {
    receptionist: Receptionist|undefined;
  }

  export const state: State = {
    receptionist: undefined,
  };

  const m = new TypedModule<State, FullState>(store, 'receptionist', state);

  export const set = m.mutation<Receptionist>('SET', (s, { data }) => {
    s.receptionist = data;
  });

  export const fetch = m.action<void>('FETCH', async ctx => {
    try {
      const receptionist = await getReceptionist();
      set(receptionist);
    } catch (e) {
      MessageStore.queue(e.message);
    }
  });

  m.finish();
}
