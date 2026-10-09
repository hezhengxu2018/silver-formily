import type { AnyFunction, BoundaryFunction, IVisitor } from './types'
import { isCollectionType, isFn, isNormalType } from './checkers'
import {
  MakeObModelSymbol,
  ProxyRaw,
  RawProxy,
  RawShallowProxy,
} from './environment'
import { isSupportObservable } from './externals'
import { baseHandlers, collectionHandlers } from './handlers'
import { buildDataTree, getDataNode } from './tree'

function createNormalProxy(target: object, shallow?: boolean) {
  const proxy = new Proxy(target, baseHandlers)
  ProxyRaw.set(proxy, target)
  if (shallow) {
    RawShallowProxy.set(target, proxy)
  }
  else {
    RawProxy.set(target, proxy)
  }
  return proxy
}

function createCollectionProxy(target: object, shallow?: boolean) {
  const proxy = new Proxy(target, collectionHandlers)
  ProxyRaw.set(proxy, target)
  if (shallow) {
    RawShallowProxy.set(target, proxy)
  }
  else {
    RawProxy.set(target, proxy)
  }
  return proxy
}

function createShallowProxy(target: object) {
  if (isNormalType(target))
    return createNormalProxy(target, true)
  if (isCollectionType(target))
    return createCollectionProxy(target, true)
  // never reach
  return target
}

export function createObservable(target?: object, key?: PropertyKey, value?: unknown, shallow?: boolean) {
  if (!value || typeof value !== 'object')
    return value
  const raw = ProxyRaw.get(value)
  if (raw) {
    const node = getDataNode(raw)
    if (!node.target)
      node.target = target
    node.key = key
    return value
  }

  if (!isSupportObservable(value))
    return value

  if (target) {
    const parentRaw = ProxyRaw.get(target) || target
    const isShallowParent = RawShallowProxy.get(parentRaw)
    if (isShallowParent)
      return value
  }

  buildDataTree(target, key, value)
  if (shallow)
    return createShallowProxy(value)
  if (isNormalType(value))
    return createNormalProxy(value)
  if (isCollectionType(value))
    return createCollectionProxy(value)
  // never reach
  return value
}

export function createAnnotation<T extends (visitor: IVisitor) => unknown>(maker: T) {
  const annotation = (target: unknown): ReturnType<T> => {
    return maker({ value: target }) as ReturnType<T>
  }
  if (isFn(maker)) {
    annotation[MakeObModelSymbol] = maker
  }
  return annotation
}

export function getObservableMaker(target: unknown) {
  const maker = (target as Record<PropertyKey, unknown> | undefined)?.[MakeObModelSymbol]
  if (maker) {
    const innerMaker = (maker as Record<PropertyKey, unknown>)[MakeObModelSymbol]
    if (!innerMaker) {
      return maker
    }
    return getObservableMaker(maker)
  }
  return undefined
}

export function createBoundaryFunction(start: () => void, end: () => void) {
  function boundary<F extends AnyFunction>(fn?: F): ReturnType<F> {
    let results: ReturnType<F> | undefined
    try {
      start()
      if (isFn(fn)) {
        results = fn() as ReturnType<F>
      }
    }
    finally {
      end()
    }
    return results as ReturnType<F>
  }

  boundary.bound = createBindFunction(boundary)
  return boundary
}

export function createBindFunction<Boundary extends BoundaryFunction>(boundary: Boundary) {
  function bind<F extends AnyFunction>(
    callback?: F,
    context?: unknown,
  ): F {
    return ((...args: never[]) =>
      boundary(() => (callback as F).apply(context, args))) as F
  }
  return bind
}

export function createBoundaryAnnotation(start: () => void, end: () => void) {
  const boundary = createBoundaryFunction(start, end)
  const annotation = createAnnotation(({ target, key }) => {
    target[key] = boundary.bound(target[key] as AnyFunction, target)
    return target
  })
  boundary[MakeObModelSymbol] = annotation
  boundary.bound[MakeObModelSymbol] = annotation
  return boundary
}
