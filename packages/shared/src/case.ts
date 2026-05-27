import {
  camelCase,
  kebabCase,
  pascalCase,
  upperCase,
} from 'es-toolkit/string'

export function lowerCase(value: string) {
  return value.toLowerCase()
}

export function paramCase(value: string) {
  return kebabCase(value)
}

export { camelCase, pascalCase, upperCase }
