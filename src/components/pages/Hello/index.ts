import { Component, Lifecycle, Vue } from 'av-ts';
import Receptionist                  from '../../../models/receptionist';
import { ReceptionistStore }         from '../../../store/receptionist';
import Nested                        from './Nested';

@Component({
  name      : 'hello',
  components: {
    Nested,
  },
})
export default class HelloComponent extends Vue {

  get receptionist(): Receptionist|undefined {
    return ReceptionistStore.state.receptionist;
  }

  get greeting(): string {
    if (this.receptionist == null) {
      return 'Waiting for the receptionist...';
    }
    return `${this.receptionist.name}: Hello!`;
  }

  async changeReceptionist(): Promise<void> {
    return ReceptionistStore.fetch();
  }

  @Lifecycle
  async mounted(): Promise<void> {
    return this.changeReceptionist();
  }
}
