import { each, isPlainObj } from '@silver-formily/designer-shared'

export function lowerSnake(str: string) {
  return String(str).replace(/\s+/g, '_').toLocaleLowerCase()
}

export function mergeLocales(target: any, source: any) {
  if (isPlainObj(target) && isPlainObj(source)) {
    each(source, (value, key) => {
      const token = lowerSnake(key)
      const messages = mergeLocales(target[key] || target[token], value)
      target[token] = messages
    })
    return target
  }
  else if (isPlainObj(source)) {
    const result = Array.isArray(source) ? [] : {}
    each(source, (value, key) => {
      const messages = mergeLocales(undefined, value)
      result[lowerSnake(key)] = messages
    })
    return result
  }
  return source
}

export function getBrowserLanguage() {
  /* istanbul ignore next */
  if (!globalThis.navigator) {
    return 'en'
  }
  const navigator = globalThis.navigator as Navigator & {
    browserlanguage?: string
  }
  return (
    navigator.browserlanguage
    || navigator.language
    || 'en'
  )
}
