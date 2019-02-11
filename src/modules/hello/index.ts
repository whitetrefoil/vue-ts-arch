import { Component, Lifecycle, Vue } from 'av-ts'
import Receptionist                  from '../../models/receptionist'
import { store }                     from '../../store'
import { fetchRandomReceptionist }   from '../../store/hello/actions'
import ComponentInModule             from './component-in-module'

@Component({
  name      : 'hello',
  components: {
    ComponentInModule,
  },
})
export default class HelloComponent extends Vue {

  get receptionist(): Receptionist|null {
    return store.state.hello.receptionist
  }

  get greeting(): string {
    if (this.receptionist instanceof Receptionist) {
      return this.receptionist.greeting()
    }
    return ''
  }

  changeReceptionist(): void {
    store.dispatch(fetchRandomReceptionist())
  }

  @Lifecycle
  mounted(): void {
    store.dispatch(fetchRandomReceptionist())
  }
}
