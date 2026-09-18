import type { ComputedRef } from 'vue'
import { isEqual } from '@silver-formily/shared'
import { computed } from 'vue'
import { useExcludedAttrs } from './utils'

export interface OptionValueProps {
  optionAsValue?: boolean
  optionValueKeys?: string[]
}

export function pickOptionValue(option: any, keys?: string[]) {
  if (!keys || option === null || typeof option !== 'object')
    return option
  return Object.fromEntries(keys.filter(key => Object.hasOwn(option, key)).map(key => [key, option[key]]))
}

export function getOptionIdentity(value: any, key = 'value') {
  return value !== null && typeof value === 'object' ? value[key] : value
}

export function flattenOptions(options: any[] = [], childrenKey?: string): any[] {
  return options.flatMap((option) => {
    if (option === null || typeof option !== 'object')
      return [{ label: option, value: option }]
    const children = childrenKey ? option[childrenKey] : undefined
    return [option, ...flattenOptions(Array.isArray(children) ? children : [], childrenKey)]
  })
}

/** Select alone treats `options` as a group container. */
export function flattenSelectOptions(options: any[] = []) {
  return flattenOptions(options.flatMap(option => Array.isArray(option?.options) ? option.options : [option]))
}

export function findOption(options: any[], value: any, key = 'value') {
  return options.find(option => isEqual(option[key], value))
}

/** Keep complete options separate from the projected public model. */
export function useOptionValue(
  props: OptionValueProps,
  options: () => any[],
  config: {
    key?: () => string
    childrenKey?: () => string
    resolve?: (value: any, path?: any[], index?: number) => any
  } = {},
): ComputedRef<Record<string, any>> {
  const attrs = useExcludedAttrs()
  return computed(() => {
    if (!props.optionAsValue)
      return attrs.value
    const key = config.key?.() ?? 'value'
    const source = flattenOptions(options(), config.childrenKey?.())
    const mapValue = (value: any, convert: (item: any, path?: any[], index?: number) => any): any => {
      if (Array.isArray(value))
        return value.map((item, index) => Array.isArray(item) ? mapValue(item, convert) : item == null ? item : convert(item, value, index))
      return value == null ? value : convert(value)
    }
    const externalValue = (value: any) => mapValue(value, (item, path, index) => {
      const previous = [attrs.value.modelValue].flat(Infinity)
      const option = config.resolve?.(item, path, index) ?? findOption(source, item, key)
        ?? previous.find(value => value != null && typeof value === 'object' && isEqual(getOptionIdentity(value, key), item))
      return option === undefined ? item : pickOptionValue(option, props.optionValueKeys)
    })
    const invoke = (name: string, value: any, ...args: any[]) => {
      const listeners = attrs.value[name]
      for (const listener of Array.isArray(listeners) ? listeners : [listeners])
        listener?.(externalValue(value), ...args)
    }
    return {
      ...attrs.value,
      'modelValue': mapValue(attrs.value.modelValue, item => getOptionIdentity(item, key)),
      'onUpdate:modelValue': (value: any) => invoke('onUpdate:modelValue', value),
      'onChange': (value: any, ...args: any[]) => invoke('onChange', value, ...args),
    }
  })
}
