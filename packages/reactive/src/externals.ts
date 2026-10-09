import type { Annotation } from './types'
import {
  isArr,
  isFn,
  isMap,
  isPlainObj,
  isSet,
  isValid,
  isWeakMap,
  isWeakSet,
} from './checkers'
import {
  DependencyCollected,
  MakeObModelSymbol,
  ObModelSymbol,
  ProxyRaw,
} from './environment'
import { getDataNode } from './tree'

const RAW_TYPE = Symbol('RAW_TYPE')
const OBSERVABLE_TYPE = Symbol('OBSERVABLE_TYPE')
const hasOwnProperty = Object.prototype.hasOwnProperty

export function isObservable(target: unknown) {
  if (typeof target !== 'object' || target === null)
    return false
  return ProxyRaw.has(target)
    || Boolean((target as Record<PropertyKey, unknown>)[ObModelSymbol])
}

export function isAnnotation(target: unknown): target is Annotation {
  return Boolean(target) && typeof target === 'function'
    && Boolean((target as unknown as Record<PropertyKey, unknown>)[MakeObModelSymbol])
}

export function isSupportObservable(target: unknown) {
  if (!isValid(target))
    return false
  if (isArr(target))
    return true
  if (isPlainObj(target)) {
    if (target[RAW_TYPE]) {
      return false
    }
    if (target[OBSERVABLE_TYPE]) {
      return true
    }
    if ('$$typeof' in target && '_owner' in target) {
      return false
    }
    if (target._isAMomentObject) {
      return false
    }
    if (target._isJSONSchemaObject) {
      return false
    }
    if (isFn(target.toJS)) {
      return false
    }
    if (isFn(target.toJSON)) {
      return false
    }
    return true
  }
  if (isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target))
    return true
  return false
}

export function markRaw<T>(target: T): T {
  if (!target)
    return
  if (isFn(target)) {
    const rawTarget = target.prototype || target
    rawTarget[RAW_TYPE] = true
  }
  else {
    target[RAW_TYPE] = true
  }
  return target
}

export function markObservable<T>(target: T): T {
  if (!target)
    return
  if (isFn(target)) {
    const observableTarget = target.prototype || target
    observableTarget[OBSERVABLE_TYPE] = true
  }
  else {
    target[OBSERVABLE_TYPE] = true
  }
  return target
}

export function raw<T>(target: T): T {
  const marked = (target as Record<PropertyKey, unknown> | undefined)?.[ObModelSymbol]
  if (marked)
    return marked as T
  return (ProxyRaw.get(target as object) || target) as T
}

export function toJS<T>(values: T): T {
  const visited = new WeakSet<object>()
  const _toJS = (values: unknown): unknown => {
    if (values instanceof Object) {
      const record = values as Record<PropertyKey, unknown>
      if (visited.has(values))
        return values
      if (record[RAW_TYPE])
        return values
      if (isArr(values)) {
        if (isObservable(values)) {
          visited.add(values)
          const res: unknown[] = []
          values.forEach((item) => {
            res.push(_toJS(item))
          })
          visited.delete(values)
          return res
        }
      }
      else if (isPlainObj(values)) {
        if (isObservable(values)) {
          visited.add(values)
          const res: Record<PropertyKey, unknown> = {}
          for (const key in values) {
            if (hasOwnProperty.call(values, key)) {
              res[key] = _toJS(record[key])
            }
          }
          visited.delete(values)
          return res
        }
      }
    }
    return values
  }

  return _toJS(values) as T
}

export function contains(target: unknown, property: unknown) {
  const targetRaw = raw(target)
  const propertyRaw = raw(property)
  if (targetRaw === propertyRaw)
    return true
  const targetNode = getDataNode(targetRaw as object)
  const propertyNode = getDataNode(propertyRaw as object)
  if (!targetNode)
    return false
  if (!propertyNode)
    return false
  return targetNode.contains(propertyNode)
}

export function hasCollected(callback?: () => void) {
  DependencyCollected.value = false
  callback?.()
  return DependencyCollected.value
}
