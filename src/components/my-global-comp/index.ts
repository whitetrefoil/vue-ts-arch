import { Component, p, Prop, Vue } from 'av-ts'

@Component({
  name: 'my-global-comp',
})
export default class MyGlobalComp extends Vue {
  @Prop name = p(String)
}
