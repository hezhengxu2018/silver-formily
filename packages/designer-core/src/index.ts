import * as Core from './exports'

export * from './exports'

const designableGlobal = globalThis as typeof globalThis & {
  Designable?: {
    Core?: typeof Core
  }
}

designableGlobal.Designable = designableGlobal.Designable || {}
designableGlobal.Designable.Core = designableGlobal.Designable.Core || Core
