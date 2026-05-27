import { each } from './array'
import { getType, isArr, isPlainObj } from './checkers'
import { isEmpty, isValid } from './isEmpty'

function isUnNormalObject(value: any) {
  if (value?._owner && value?.$$typeof) {
    return true
  }
  if (value?._isAMomentObject || value?._isJSONSchemaObject) {
    return true
  }
  if (value?.toJS || value?.toJSON) {
    return true
  }
}

function isEnumerableObject(val: any) {
  if (isUnNormalObject(val)) {
    return false
  }
  return typeof val === 'object'
}

/**
 *
 * @param defaults_
 * @param targets
 */
export function defaults(defaults_: any, targets: any) {
  if (
    getType(defaults_) !== getType(targets)
    || !isEnumerableObject(defaults_)
    || !isEnumerableObject(targets)
  ) {
    return !isEmpty(targets) ? targets : defaults_
  }
  else {
    const results = isArr(defaults_)
      ? []
      : isPlainObj(defaults_)
        ? {}
        : defaults_
    each(targets, (value, key) => {
      results[key] = defaults(defaults_[key], value)
    })
    each(defaults_, (value, key) => {
      if (!isValid(results[key])) {
        results[key] = value
      }
    })
    return results
  }
}
