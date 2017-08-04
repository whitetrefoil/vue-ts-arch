declare module 'webpack-bundle-analyzer' {
  import * as webpack from 'webpack'

  interface IOptions {
    // Can be `server`, `static` or `disabled`.
    // In `server` mode analyzer will start HTTP server to show bundle report.
    // In `static` mode single HTML file with bundle report will be generated.
    // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
    analyzerMode?: 'server'|'static'|'disabled'

    // Host that will be used in `server` mode to start HTTP server.
    analyzerHost?: string

    // Port that will be used in `server` mode to start HTTP server.
    analyzerPort?: number

    // Path to bundle report file that will be generated in `static` mode.
    // Relative to bundles output directory.
    reportFilename?: string

    // Module sizes to show in report by default.
    // Should be one of `stat`, `parsed` or `gzip`.
    // See "Definitions" section for more information.
    defaultSizes?: 'stat'|'parsed'|'gzip'

    // Automatically open report in default browser
    openAnalyzer?: boolean

    // If `true`, Webpack Stats JSON file will be generated in bundles output directory
    generateStatsFile?: boolean

    // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
    // Relative to bundles output directory.
    statsFilename?: string

    // Options for `stats.toJson()` method.
    // For example you can exclude sources of your modules from stats file with `source: false` option.
    // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    statsOptions?: webpack.Options.Stats

    // Log level. Can be 'info', 'warn', 'error' or 'silent'.
    logLevel?: 'info'|'warn'|'error'|'silent'
  }

  export class BundleAnalyzerPlugin extends webpack.Plugin {
    constructor(options?: IOptions)
  }
}
