import {
  isArray,
  isBoolean,
  isFunction,
  isMap,
  isNumber,
  isObject,
  isPlainObject,
  isRegExp,
  isSet,
  isString,
  isWeakMap,
  isWeakSet,
} from 'es-toolkit/compat'

const toString = Object.prototype.toString
export const getType = (obj: any) => toString.call(obj)

export const isFn = isFunction
export const isArr = isArray
export const isPlainObj = isPlainObject
export const isStr = isString
export const isBool = isBoolean
export const isNum = isNumber
export function isNumberLike(index: any): index is number {
  return isNum(index) || /^\d+$/.test(index)
}
export const isObj = isObject
export { isMap, isRegExp, isSet, isWeakMap, isWeakSet }
export function isReactElement(obj: any): boolean {
  return obj && obj.$$typeof && obj._owner
}
export function isHTMLElement(target: any): target is EventTarget {
  return Object.prototype.toString.call(target).includes('HTML')
}

export type Subscriber<S> = (payload: S) => void

export interface Subscription<S> {
  notify?: (payload: S) => void | boolean
  filter?: (payload: S) => any
}
