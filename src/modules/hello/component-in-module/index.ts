import { Component, Data, p, Prop, Vue } from 'av-ts'

@Component({
  name: 'component-in-module',
})
export default class ComponentInModule extends Vue {
  @Prop name = p({ type: String, default: 'unknown' })

  testData?: string

  @Data data() {
    return {
      testData: 'This is a test string',
    }
  }
}
