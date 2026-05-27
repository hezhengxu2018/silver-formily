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

export function isObservable(target: any) {
  return ProxyRaw.has(target) || !!target?.[ObModelSymbol]
}

export function isAnnotation(target: any): target is Annotation {
  return target && !!target[MakeObModelSymbol]
}

export function isSupportObservable(target: any) {
  if (!isValid(target))
    return false
  if (isArr(target))
    return true
  if (isPlainObj(target)) {
    const plainTarget = target as Record<PropertyKey, any>
    if (plainTarget[RAW_TYPE]) {
      return false
    }
    if (plainTarget[OBSERVABLE_TYPE]) {
      return true
    }
    if ('$$typeof' in plainTarget && '_owner' in plainTarget) {
      return false
    }
    if (plainTarget._isAMomentObject) {
      return false
    }
    if (plainTarget._isJSONSchemaObject) {
      return false
    }
    if (isFn(plainTarget.toJS)) {
      return false
    }
    if (isFn(plainTarget.toJSON)) {
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
  if (target?.[ObModelSymbol])
    return target[ObModelSymbol]
  return ProxyRaw.get(target as any) || target
}

export function toJS<T>(values: T): T {
  const visited = new WeakSet<any>()
  const _toJS: typeof toJS = (values: any) => {
    if (visited.has(values)) {
      return values
    }
    if (values && values[RAW_TYPE])
      return values
    if (isArr(values)) {
      if (isObservable(values)) {
        visited.add(values)
        const res: any = []
        values.forEach((item: any) => {
          res.push(_toJS(item))
        })
        visited.delete(values)
        return res
      }
    }
    else if (isPlainObj(values)) {
      if (isObservable(values)) {
        visited.add(values)
        const res: any = {}
        for (const key in values) {
          if (hasOwnProperty.call(values, key)) {
            res[key] = _toJS(values[key])
          }
        }
        visited.delete(values)
        return res
      }
    }
    return values
  }

  return _toJS(values)
}

export function contains(target: any, property: any) {
  const targetRaw = raw(target)
  const propertyRaw = raw(property)
  if (targetRaw === propertyRaw)
    return true
  const targetNode = getDataNode(targetRaw)
  const propertyNode = getDataNode(propertyRaw)
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
