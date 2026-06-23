import { isFn, isStr } from './types'

export function instOf(value: any, cls: any) {
  if (isFn(cls))
    return value instanceof cls
  if (isStr(cls)) {
    const Constructor = (globalThis as Record<string, any>)[cls]
    return Constructor
      ? value instanceof Constructor
      : false
  }
  return false
}
