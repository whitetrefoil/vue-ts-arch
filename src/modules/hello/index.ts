import { Component, Lifecycle, Vue } from 'av-ts'
import Receptionist                  from '../../models/receptionist'
import { store, types as t }         from '../../store'
import ComponentInModule             from './component-in-module'

@Component({
  name      : 'hello',
  components: {
    ComponentInModule,
  },
})
export default class HelloComponent extends Vue {

  get receptionist(): Receptionist {
    return store.state.hello.receptionist
  }

  get greeting(): string {
    if (this.receptionist instanceof Receptionist) {
      return this.receptionist.greeting()
    }
    return ''
  }

  changeReceptionist(): void {
    store.dispatch(t.HELLO__FETCH_RANDOM_RECEPTIONIST)
  }

  @Lifecycle
  mounted(): void {
    store.dispatch(t.HELLO__FETCH_RANDOM_RECEPTIONIST)
  }
}
