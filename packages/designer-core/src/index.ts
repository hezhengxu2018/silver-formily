import * as Core from './exports'

export * from './exports'

const globalDesignable = globalThis as unknown as Window & {
  Designable?: { Core?: typeof Core }
}

if (!globalDesignable.Designable?.Core) {
  globalDesignable.Designable = globalDesignable.Designable || {}
  globalDesignable.Designable.Core = Core
}
