const toString = Object.prototype.toString
export function isMap(val: unknown): val is Map<unknown, unknown> {
  return !!val && val instanceof Map
}
export const isSet = (val: unknown): val is Set<unknown> => !!val && val instanceof Set
export function isWeakMap(val: unknown): val is WeakMap<object, unknown> {
  return !!val && val instanceof WeakMap
}
export function isWeakSet(val: unknown): val is WeakSet<object> {
  return !!val && val instanceof WeakSet
}
// guard 到 unknown 签名而非 never：narrow 之后仍能正常调用（never 参数会导致无法传参）
export const isFn = (val: unknown): val is ((...args: unknown[]) => unknown) => typeof val === 'function'
export const isArr = Array.isArray
export function isPlainObj(val: unknown): val is Record<PropertyKey, unknown> {
  return toString.call(val) === '[object Object]'
}
export const isValid = (val: unknown) => val !== null && val !== undefined
export function isCollectionType(target: unknown) {
  return (
    isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target)
  )
}
export function isNormalType(target: unknown) {
  return isPlainObj(target) || isArr(target)
}
