/* tslint:disable */

interface NodeRequire {
  ensure(dependencies: string[], callback: (require: Function) => void, name?: string): void
}
