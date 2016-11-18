/* tslint:disable */

declare module 'gulp-eslint' {
  import VinylFile = require('vinyl')

  namespace eslint {
    interface ESLintMessage {
      fatal: boolean
      ruleId: string
      message: string
      line: number
      column: number
      source: string
    }

    interface ESLintResult extends VinylFile {
      /** The lint messages */
      messages: ESLintMessage[]
      /** The absolute file path. */
      filePath: string
      errorCount: number
      warningCount: number
    }

    interface ESLintResults extends Array<ESLintResult> {
      errorCount: number
      warningCount: number
    }

    function format(formatter?: string | Function, output?: NodeJS.WritableStream | Function): NodeJS.ReadWriteStream
  }

  function eslint(options?: any): NodeJS.ReadWriteStream

  export = eslint
}
