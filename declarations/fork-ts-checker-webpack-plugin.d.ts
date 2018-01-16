declare module 'fork-ts-checker-webpack-plugin' {
  import * as webpack from 'webpack'

  namespace ForkTsCheckerWebpackPlugin {}

  interface Options {
    tsconfig?: string
    tslint?: string|true
    watch?: string|string[]
    async?: boolean
    ignoreDiagnostics?: number[]
    ignoreLints?: string[]
    colors?: boolean
    logger?: any
    formatter?: 'default'|'codeframe'|((message: string, useColors: boolean) => string)
    formatterOptions?: any
    silent?: boolean
    checkSyntacticErrors?: boolean
    memoryLimit?: number
    workers?: number
    vue?: boolean
  }

  class ForkTsCheckerWebpackPlugin extends webpack.Plugin {
    constructor(options?: Options)
  }

  export = ForkTsCheckerWebpackPlugin
}
