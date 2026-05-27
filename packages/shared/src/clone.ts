import { cloneDeepWith, cloneWith } from 'es-toolkit/compat'

import { isFn, isPlainObj } from './checkers'

function shouldPreservePlainObject(value: Record<PropertyKey, any>) {
  if ('$$typeof' in value && '_owner' in value) {
    return true
  }
  if (value._isBigNumber) {
    return true
  }
  if (value._isAMomentObject) {
    return true
  }
  if (value._isJSONSchemaObject) {
    return true
  }
  return false
}

export function shallowClone(values: any) {
  if (isPlainObj(values)) {
    const plainValues = values as Record<PropertyKey, any>
    if (shouldPreservePlainObject(plainValues)) {
      return values
    }
    if (isFn(plainValues.toJS)) {
      return values
    }
    if (isFn(plainValues.toJSON)) {
      return values
    }
    return cloneWith(values)
  }
  else if (Array.isArray(values)) {
    return cloneWith(values)
  }
  else if (typeof values === 'object') {
    return new values.constructor(values)
  }
  return values
}

export function clone(values: any) {
  if (Array.isArray(values) || isPlainObj(values)) {
    return cloneDeepWith(values, (currentValue) => {
      if (Array.isArray(currentValue)) {
        return undefined
      }

      if (isPlainObj(currentValue)) {
        const plainValues = currentValue as Record<PropertyKey, any>
        if (shouldPreservePlainObject(plainValues)) {
          return currentValue
        }
        if (isFn(plainValues.toJS)) {
          return plainValues.toJS()
        }
        if (isFn(plainValues.toJSON)) {
          return plainValues.toJSON()
        }
        return undefined
      }

      if (currentValue && typeof currentValue === 'object') {
        return currentValue
      }

      return undefined
    })
  }

  return values
}
