import { Component, p, Prop, Vue } from 'av-ts';

@Component()
export default class Shared extends Vue {
  @Prop readonly name = p(String);
}
