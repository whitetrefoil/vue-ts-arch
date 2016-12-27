/* tslint:disable */

/// <reference types="node" />

interface NodeRequire {
  ensure(dependencies: string[], callback: (require: Function) => void, name?: string): void
}

declare class System {
  static import(id: string): Promise<any>
}

declare namespace System {}
