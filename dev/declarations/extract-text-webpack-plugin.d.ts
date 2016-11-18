/* tslint:disable */

// Type definitions for extract-text-webpack-plugin 2.0.0
// Project: https://github.com/webpack/extract-text-webpack-plugin
// Definitions by: flying-sheep <https://github.com/flying-sheep>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'extract-text-webpack-plugin' {

  import webpack = require('webpack')

  /**
   * extract-text-webpack-plugin has no support for .options instead of .query yet.
   * See https://github.com/webpack/extract-text-webpack-plugin/issues/281
   */
  type Loader = string | webpack.Loader

  interface ExtractPluginOptions {
    /** extract from all additional chunks too (by default it extracts only from the initial chunk(s)) */
    allChunks?: boolean
    /** Unique ident for this plugin instance. (For advanced usage only, by default automatically generated) */
    id?: string
  }

  interface ExtractOptions {
    /** the loader(s) that should be used for converting the resource to a css exporting module */
    loader: Loader | Loader[]
    /** the loader(s) that should be used when the css is not extracted (i.e. in an additional chunk when `allChunks: false`) */
    fallbackLoader?: Loader | Loader[]
    /** override the `publicPath` setting for this loader */
    publicPath?: string
  }

  /**
   * Use an `ExtractTextPlugin` instance and a loader returned by `extract` in concert to write files to disk instead of loading them into others.
   * Usage example at https://github.com/webpack/extract-text-webpack-plugin#usage-example-with-css
   */
  interface ExtractTextPlugin extends webpack.Plugin {
    /** Create a plugin instance defining the extraction target file(s) for the files loaded by `extract` */
    new (id: string, filename: string, options?: ExtractPluginOptions): ExtractTextPlugin
    new (filename: string, options?: ExtractPluginOptions): ExtractTextPlugin
    /**
     * Creates an extracting loader from an existing loader.
     * Use the resulting loader in `module.rules`/`module.loaders`.
     */
    extract: (loader: Loader | Loader[] | ExtractOptions) => Loader
  }

  const extractTextPlugin: ExtractTextPlugin
  export = extractTextPlugin
}
