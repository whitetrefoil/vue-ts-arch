// tslint:disable:no-implicit-dependencies

import * as webpack from 'webpack'

declare module 'webpack' {
  export interface Configuration {
    mode?: 'development'|'production'
  }
}
