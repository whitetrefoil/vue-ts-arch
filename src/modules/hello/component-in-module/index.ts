import { Component, p, Prop, Vue } from 'av-ts'

@Component({
  name: 'component-in-module',
})
export default class ComponentInModule extends Vue {
  @Prop name = p({ type: String, default: 'unknown' })
}
