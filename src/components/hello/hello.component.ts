import { Vue, Component, Lifecycle } from 'av-ts'
import store from '../../store/index'
import * as t from '../../store/types'

@Component({
  name: 'hello',
})
export default class HelloComponent extends Vue {
  get receptionist() {
    return store.state.hello.receptionist || {}
  }

  @Lifecycle mounted() {
    store.dispatch(t.MOCK_RANDOM_RECEPTIONIST)
  }
}
