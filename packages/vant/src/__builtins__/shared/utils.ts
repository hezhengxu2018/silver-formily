import { isPlainObj } from '@formily/shared'
import { computed, useAttrs } from 'vue'

function omitKeys(source: Record<string, any>, keys: string[]) {
  const result = { ...source }

  keys.forEach((key) => {
    delete result[key]
  })

  return result
}

export function useCleanAttrs(removeAttrsList: string[] = []) {
  const attrs = useAttrs() as Record<string, any>

  const props = computed(() => {
    const defaultRemoveAttrs = ['value', 'onChange', 'attrs', 'on', 'readOnly']
    const mergedAttrs = isPlainObj(attrs.attrs)
      ? { ...attrs, ...attrs.attrs }
      : { ...attrs }

    return omitKeys(mergedAttrs, defaultRemoveAttrs.concat(removeAttrsList))
  })

  return {
    props,
  }
}

export function composeExport<T0 extends object, T1 extends object>(
  s0: T0,
  s1: T1,
): T0 & T1 {
  return Object.assign(s0, s1)
}
