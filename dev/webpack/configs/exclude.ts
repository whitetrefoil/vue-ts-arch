// import log from 'fancy-log'
import { sep } from 'path'

const testNpm = (file: string) => RegExp(`\\${sep}node_modules\\${sep}`).test(file)
const testWt  = (file: string) => RegExp(`\\${sep}@whitetrefoil\\${sep}`).test(file)
const testVue = (file: string) => RegExp('\.vue(?:\.[jt]sx?)?').test(file)

export default function excludeFor(name: string) {
  return function exclude(file: string): boolean {
    const inNpm = testNpm(file)
    // log(inNpm)
    if (inNpm !== true) {
      // log(`File "${file}" is not in "node_modules"`)
      return false
    }

    if (testWt(file)) {
      // log(`Including my lib in ${name}: `, file)
      return false
    }

    if (testVue(file)) {
      // log(`Including Vue SFC in ${name}: `, file)
      return false
    }

    return true
  }

}
