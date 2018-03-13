// tslint:disable:no-implicit-dependencies no-shadowed-variable

declare module 'meow' {
  import { Options as MinimistOptions } from 'minimist-options'

  namespace meow {
    interface Result<Flags> {
      input: string[]
      flags: { [name in keyof Flags]: any }
      pkg: any
      help: string

      showHelp(code?: number): void

      showVersion(): void
    }

    interface Options {
      flags?: MinimistOptions
      pkg?: { [name: string]: any }
      argv?: string[]
      inferType?: boolean
      input?: string
      help?: string
      autoHelp?: boolean
      autoVersion?: boolean
      description?: string|boolean
      version?: string
    }
  }

  function meow<Flags = any>(message: string, options?: meow.Options): meow.Result<Flags>
  function meow<Flags = any>(options?: meow.Options): meow.Result<Flags>

  export = meow
}
