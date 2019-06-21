import Vue                   from 'vue';
import Vuex                  from 'vuex';
import { MessageStore }      from './message';
import { ReceptionistStore } from './receptionist';


Vue.use(Vuex);


export interface FullState {
  message: MessageStore.State;
  receptionist: ReceptionistStore.State;
}


export const store = new Vuex.Store<FullState>({});
