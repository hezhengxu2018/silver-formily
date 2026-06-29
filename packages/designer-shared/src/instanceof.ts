import { isFn, isStr } from './types'

export function instOf(value: any, cls: any) {
  if (isFn(cls))
    return value instanceof cls
  if (isStr(cls)) {
    const GlobalConstructor = globalThis[cls]
    return GlobalConstructor
      ? value instanceof GlobalConstructor
      : false
  }
  return false
}
