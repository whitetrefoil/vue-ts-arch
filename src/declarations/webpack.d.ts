/* tslint:disable */

/// <reference types="node" />

interface NodeRequire {
  ensure(dependencies: string[], callback: Function, name?: string): void
}
