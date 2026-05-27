import { isFn, isStr } from './checkers'

const caches: Record<string, boolean> = {}

export function deprecate<P1 = any, P2 = any, P3 = any, P4 = any, P5 = any>(
  method: any,
  message?: string,
  help?: string,
) {
  if (isFn(method)) {
    return function (this: any, ...args: [P1?, P2?, P3?, P4?, P5?]) {
      deprecate(message, help)
      return method.apply(this, args)
    }
  }
  if (isStr(method) && !caches[method]) {
    caches[method] = true
    console.warn(
      new Error(
        `${method} has been deprecated. Do not continue to use this api.${
          message || ''
        }`,
      ),
    )
  }
}
