export default class Receptionist {
  constructor(public name: string) {}

  greeting() {
    return `Greetings from ${this.name}`
  }
}
