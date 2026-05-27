const toString = Object.prototype.toString
export function isMap(val: any): val is Map<any, any> {
  return val && val instanceof Map
}
export const isSet = (val: any): val is Set<any> => val && val instanceof Set
export function isWeakMap(val: any): val is WeakMap<any, any> {
  return val && val instanceof WeakMap
}
export function isWeakSet(val: any): val is WeakSet<any> {
  return val && val instanceof WeakSet
}
export const isFn = (val: any): val is (...args: any[]) => unknown => typeof val === 'function'
export const isArr = Array.isArray
export function isPlainObj(val: any): val is object {
  return toString.call(val) === '[object Object]'
}
export const isValid = (val: any) => val !== null && val !== undefined
export function isCollectionType(target: any) {
  return (
    isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target)
  )
}
export function isNormalType(target: any) {
  return isPlainObj(target) || isArr(target)
}
