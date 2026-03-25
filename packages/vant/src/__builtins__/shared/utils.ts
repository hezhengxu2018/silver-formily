import type { ComputedRef } from 'vue'
import { isPlainObj, paramCase } from '@formily/shared'
import bem from 'easy-bem'
import { omit } from 'lodash-es'
import { computed, getCurrentInstance } from 'vue'

interface UseAttrsParams {
  excludeListeners?: boolean
  excludeKeys?: ComputedRef<string[]>
}

const DEFAULT_EXCLUDE_KEYS: string[] = []
const LISTENER_PREFIX = /^on[A-Z]/

export function useAttrs(params: UseAttrsParams = {}): ComputedRef<Record<string, any>> {
  const { excludeListeners = false, excludeKeys } = params
  const allExcludeKeys = computed(() => {
    return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS)
  })
  const instance = getCurrentInstance()

  if (!instance) {
    return computed(() => ({}))
  }

  return computed(() => {
    return Object.fromEntries(
      Object.entries(instance.proxy?.$attrs ?? {}).filter(([key]) => {
        return !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))
      }),
    )
  })
}

export function useCleanAttrs(removeAttrsList: string[] = []): {
  props: ComputedRef<Record<string, any>>
} {
  const attrs = useAttrs()
  const props = computed(() => {
    const DEFAULT_REMOVE_ATTRS = ['value', 'onChange', 'attrs', 'on', 'readOnly']
    if (isPlainObj(attrs.value.attrs)) {
      return omit({ ...attrs.value, ...attrs.value.attrs }, DEFAULT_REMOVE_ATTRS.concat(removeAttrsList))
    }
    return omit(attrs.value, DEFAULT_REMOVE_ATTRS.concat(removeAttrsList))
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

export function useHasExplicitVNodeProp() {
  const instance = getCurrentInstance()

  return (key: string) => {
    const vnodeProps = instance?.vnode.props
    if (!vnodeProps) {
      return false
    }

    return key in vnodeProps || paramCase(key) in vnodeProps
  }
}

const stylePrefix = 'silver-formily-vant'

export function createNamespace(name: string) {
  const prefixCls = `${stylePrefix}-${name}`

  return {
    prefixCls,
    b: bem(prefixCls),
  }
}
