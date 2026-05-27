import type {
  IRegistryFormats,
  IRegistryLocaleMessages,
  IRegistryLocales,
  IRegistryRules,
  ValidatorFunction,
  ValidatorFunctionResponse,
} from './types'
import {
  merge as deepmerge,
  each,
  FormPath,
  globalThisPolyfill,
  isFn,
  isStr,
  lowerCase,
} from '@silver-formily/shared'

const getIn = FormPath.getIn

const self: any = globalThisPolyfill

const defaultLanguage = 'en'

function getBrowserlanguage() {
  /* istanbul ignore next */
  if (!self.navigator) {
    return defaultLanguage
  }
  return (
    self.navigator.browserlanguage || self.navigator.language || defaultLanguage
  )
}

const registry = {
  locales: {
    messages: {},
    language: getBrowserlanguage(),
  },
  formats: {},
  rules: {},
  template: null,
}

function getISOCode(language: string) {
  let isoCode = registry.locales.language
  if (registry.locales.messages[language]) {
    return language
  }
  const lang = lowerCase(language)
  each(
    registry.locales.messages,
    (messages: IRegistryLocaleMessages, key: string) => {
      const target = lowerCase(key)
      if (target.includes(lang) || lang.includes(target)) {
        isoCode = key
        return false
      }
    },
  )
  return isoCode
}

export const getValidateLocaleIOSCode = getISOCode

export function setValidateLanguage(lang: string) {
  registry.locales.language = lang || defaultLanguage
}

export const getValidateLanguage = () => registry.locales.language

export function getLocaleByPath(path: string, lang: string = registry.locales.language) {
  return getIn(registry.locales.messages, `${getISOCode(lang)}.${path}`)
}

export function getValidateLocale(path: string) {
  const message = getLocaleByPath(path)
  return (
    message
    || getLocaleByPath('pattern')
    || getLocaleByPath('pattern', defaultLanguage)
  )
}

export const getValidateMessageTemplateEngine = () => registry.template

export function getValidateFormats(key?: string) {
  return key ? registry.formats[key] : registry.formats
}

export function getValidateRules<T>(key?: T): T extends string
  ? ValidatorFunction
  : { [key: string]: ValidatorFunction } {
  return (key ? registry.rules[key as any] : registry.rules) as T extends string
    ? ValidatorFunction
    : { [key: string]: ValidatorFunction }
}

export function registerValidateLocale(locale: IRegistryLocales) {
  registry.locales.messages = deepmerge(registry.locales.messages, locale)
}

export function registerValidateRules(rules: IRegistryRules) {
  each(rules, (rule, key) => {
    if (isFn(rule)) {
      registry.rules[key] = rule
    }
  })
}

export function registerValidateFormats(formats: IRegistryFormats) {
  each(formats, (pattern, key) => {
    if (isFn(pattern)) {
      registry.formats[key] = pattern
    }
    else if (isStr(pattern) || pattern instanceof RegExp) {
      registry.formats[key] = new RegExp(pattern)
    }
  })
}

export function registerValidateMessageTemplateEngine(template: (message: ValidatorFunctionResponse, context: any) => any) {
  registry.template = template
}
