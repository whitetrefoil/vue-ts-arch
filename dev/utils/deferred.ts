export class Deferred<T = any> {
  promise: Promise<T> = null

  resolve: (result?: T|PromiseLike<T>) => void
  reject: (reason?: any) => void

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

export function defer<T>(): Deferred<T> {
  return new Deferred<T>()
}
