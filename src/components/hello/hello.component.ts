import { Vue, Component, Lifecycle } from 'av-ts'
import store                         from '../../store/index'
import * as t                        from '../../store/types'
import Receptionist                  from '../../models/receptionist'

@Component({
  name: 'hello',
})
export default class HelloComponent extends Vue {

  get receptionist(): Receptionist {
    return store.state.$('hello').receptionist
  }

  get greeting(): string {
    if (this.receptionist instanceof Receptionist) {
      return this.receptionist.greeting()
    }
    return ''
  }

  changeReceptionist(): void {
    store.dispatch(t.FETCH_RANDOM_RECEPTIONIST)
  }

  @Lifecycle mounted(): void {
    store.dispatch(t.FETCH_RANDOM_RECEPTIONIST)
  }
}
