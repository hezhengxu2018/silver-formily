import type { ComputedRef } from 'vue'
import { isPlainObj, paramCase } from '@formily/shared'
import bem from 'easy-bem'
import { omit } from 'es-toolkit'
import { computed, getCurrentInstance, ref } from 'vue'

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

interface UsePopupStateOptions {
  disabled?: () => boolean
  onBeforeOpen?: () => void
  onRestore?: () => void
  onVisibilityChange?: (value: boolean) => void
}

export function usePopupState(options: UsePopupStateOptions = {}) {
  const popupVisible = ref(false)

  function restore() {
    options.onRestore?.()
  }

  function setPopupVisible(value: boolean, restoreSelection = true) {
    if (popupVisible.value === value) {
      if (!value && restoreSelection) {
        restore()
      }

      return
    }

    popupVisible.value = value
    options.onVisibilityChange?.(value)

    if (!value && restoreSelection) {
      restore()
    }
  }

  function open() {
    if (options.disabled?.()) {
      return
    }

    options.onBeforeOpen?.()
    setPopupVisible(true, false)
  }

  function close(restoreSelection = true) {
    setPopupVisible(false, restoreSelection)
  }

  function onPopupShowChange(value: boolean) {
    if (value) {
      setPopupVisible(true, false)
      return
    }

    close()
  }

  return {
    popupVisible,
    setPopupVisible,
    open,
    close,
    onPopupShowChange,
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
