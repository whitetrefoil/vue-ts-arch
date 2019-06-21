import { Component, p, Prop, Vue } from 'av-ts';

@Component()
export default class Nested extends Vue {

  @Prop readonly name = p({ type: String, default: 'unknown' });

  testData = 'This is a test string';

}
