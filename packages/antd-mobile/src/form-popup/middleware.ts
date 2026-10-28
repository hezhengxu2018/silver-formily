import type { IMiddleware } from '@silver-formily/shared'
import { camelCase, isStr, pascalCase } from '@silver-formily/shared'

const DEFAULT_RESERVED_MIDDLEWARE_NAMES = ['open', 'confirm', 'cancel', 'form', 'resolve', 'reject']

export async function applyMiddlewareWithFallback<TPayload, TResult = TPayload>(
  payload: TPayload,
  middlewares: IMiddleware[] | undefined,
  fallback: TResult | ((payload: TPayload | undefined) => TResult),
) {
  const queue = middlewares ?? []
  const resolveFallback = (currentPayload: TPayload | undefined) => {
    return typeof fallback === 'function'
      ? (fallback as (payload: TPayload | undefined) => TResult)(currentPayload)
      : fallback
  }

  async function dispatch(index: number, currentPayload: TPayload | undefined): Promise<unknown> {
    if (index >= queue.length) {
      return resolveFallback(currentPayload)
    }

    const middleware = queue[index]
    let nextCalled = false
    let nextResult: Promise<unknown> | undefined

    const next = (nextPayload?: TPayload) => {
      nextCalled = true
      nextResult = dispatch(index + 1, nextPayload === undefined ? currentPayload : nextPayload)
      return nextResult
    }

    const result = await middleware(currentPayload, next as any)

    if (!nextCalled) {
      return result === undefined
        ? resolveFallback(currentPayload)
        : result
    }

    if (result !== undefined) {
      return result
    }

    return nextResult
  }

  return await dispatch(0, payload) as TResult
}

export function normalizeDynamicMiddlewareNames(
  dynamicMiddlewareNames?: readonly string[],
  reservedNames: string[] = DEFAULT_RESERVED_MIDDLEWARE_NAMES,
) {
  return (dynamicMiddlewareNames ?? []).map((middlewareName) => {
    if (!isStr(middlewareName)) {
      throw new TypeError('dynamic middleware name must be a string')
    }

    const normalizedName = camelCase(middlewareName)

    if (reservedNames.includes(normalizedName)) {
      throw new Error(`for${pascalCase(normalizedName)} is preserved`)
    }

    return normalizedName
  })
}
