import * as Core from './exports'

export * from './exports'

export interface IDesignerCoreGlobal {
  Designable?: {
    Core?: typeof Core
  }
}

export function registerGlobal(target: typeof globalThis = globalThis) {
  const globalDesignable = target as typeof globalThis & IDesignerCoreGlobal
  globalDesignable.Designable = globalDesignable.Designable || {}
  if (!globalDesignable.Designable.Core) {
    globalDesignable.Designable.Core = Core
  }
  return globalDesignable.Designable.Core
}
