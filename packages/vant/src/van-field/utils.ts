import type { InjectionKey, Ref } from 'vue'
import { isNil } from 'es-toolkit'
import { inject, onMounted, onUnmounted, unref, watch } from 'vue'

export const extend = Object.assign
export const unknownProp = null
export const numericProp = [Number, String]

export function makeStringProp(defaultVal: string) {
  return {
    type: String,
    default: defaultVal,
  }
}

export function makeNumericProp(defaultVal: number | string) {
  return {
    type: numericProp,
    default: defaultVal,
  }
}

export function isDef<T>(value: T | null | undefined): value is T {
  return !isNil(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  const promiseLike = value as any
  return isObject(value) && isFunction(promiseLike.then) && isFunction(promiseLike.catch)
}

export function toArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value]
}

export function addUnit(value: string | number | null | undefined) {
  if (isDef(value)) {
    return typeof value === 'number' || /^\d+(?:\.\d+)?$/.test(value)
      ? `${value}px`
      : String(value)
  }

  return undefined
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char)
  if (index === -1) {
    return value
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index)
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

export function formatNumber(value: string, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g)
  }
  else {
    value = value.split('.')[0]
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g)
  }
  else {
    value = value.replace(/-/, '')
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g
  return value.replace(regExp, '')
}

export function getRootScrollTop() {
  if (typeof window === 'undefined') {
    return 0
  }

  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

function setScrollTop(el: Window | HTMLElement, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value
  }
  else {
    el.scrollTo(el.scrollX, value)
  }
}

export function setRootScrollTop(value: number) {
  if (typeof window === 'undefined') {
    return
  }

  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

const isIOS = typeof navigator !== 'undefined' && /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())

export function resetScroll() {
  if (isIOS) {
    setRootScrollTop(getRootScrollTop())
  }
}

export function preventDefault(event: Event, isStopPropagation = false) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    event.stopPropagation()
  }
}

type BEMModifiers = string | Record<string, any> | Array<string | Record<string, any>>

function genBem(name: string, mods?: BEMModifiers) {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + genBem(name, item), '')
  }

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '')
}

function createBEM(name: string) {
  return (el?: string | BEMModifiers, mods?: BEMModifiers) => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    const element = el ? `${name}__${el}` : name
    return `${element}${genBem(element, mods)}`
  }
}

export function createNamespace(name: string) {
  const prefixedName = `van-${name}`
  return [prefixedName, createBEM(prefixedName)] as const
}

export function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) {
    return !value.length
  }

  if (value === 0) {
    return false
  }

  return !value
}

interface FieldRule {
  required?: boolean
  validateEmpty?: boolean
  pattern?: RegExp
  validator?: (value: unknown, rule: FieldRule) => boolean | string | Promise<boolean | string>
  message?: string | ((value: unknown, rule: FieldRule) => string)
}

export function runSyncRule(value: unknown, rule: FieldRule) {
  if (isEmptyValue(value)) {
    if (rule.required) {
      return false
    }

    if (rule.validateEmpty === false) {
      return true
    }
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false
  }

  return true
}

export function runRuleValidator(value: unknown, rule: FieldRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator?.(value, rule)
    if (isPromise(returnVal)) {
      returnVal.then(resolve)
      return
    }

    resolve(returnVal)
  })
}

export function getRuleMessage(value: unknown, rule: FieldRule) {
  const { message } = rule
  if (isFunction(message)) {
    return message(value, rule)
  }

  return message || ''
}

export function startComposing({ target }: Event) {
  ;(target as HTMLInputElement & { composing?: boolean }).composing = true
}

export function endComposing({ target }: Event) {
  const input = target as HTMLInputElement & { composing?: boolean }
  if (input.composing) {
    input.composing = false
    input.dispatchEvent(new Event('input'))
  }
}

export function resizeTextarea(input: HTMLTextAreaElement, autosize: boolean | { maxHeight?: number, minHeight?: number }) {
  const scrollTop = getRootScrollTop()
  input.style.height = 'auto'
  let height = input.scrollHeight
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize as { maxHeight?: number, minHeight?: number }
    if (isDef(maxHeight)) {
      height = Math.min(height, maxHeight)
    }

    if (isDef(minHeight)) {
      height = Math.max(height, minHeight)
    }
  }

  if (height) {
    input.style.height = `${height}px`
    setRootScrollTop(scrollTop)
  }
}

export function mapInputType(type: string, inputmode?: string) {
  if (type === 'number') {
    type = 'text'
    inputmode ||= 'decimal'
  }

  if (type === 'digit') {
    type = 'tel'
    inputmode ||= 'numeric'
  }

  return { type, inputmode }
}

export function getStringLength(str: string) {
  return [...str].length
}

export function cutString(str: string, maxlength: number) {
  return [...str].slice(0, maxlength).join('')
}

export const CUSTOM_FIELD_INJECTION_KEY = Symbol('van-field-custom')

export function useParent<T>(key: InjectionKey<T> | symbol) {
  const parent = inject(key, null)
  return { parent }
}

interface UseEventListenerOptions {
  target?: Ref<EventTarget | null | undefined> | (() => EventTarget | null | undefined)
}

export function useEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: UseEventListenerOptions = {},
) {
  let cleanup: (() => void) | undefined

  const getTarget = () => {
    if (isFunction(options.target)) {
      return options.target()
    }

    return unref(options.target)
  }

  const remove = () => {
    cleanup?.()
    cleanup = undefined
  }

  const bind = () => {
    remove()
    const target = getTarget()
    if (!target?.addEventListener) {
      return
    }

    target.addEventListener(type, listener)
    cleanup = () => target.removeEventListener(type, listener)
  }

  onMounted(bind)
  watch(getTarget, bind)
  onUnmounted(remove)
}
