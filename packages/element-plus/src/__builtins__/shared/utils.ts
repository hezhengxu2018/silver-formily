import type { Component, ComputedRef, Slot, VNode } from 'vue'
import { isPlainObj } from '@formily/shared'
import { useAttrs, version } from 'element-plus'
import { omit } from 'lodash-es'
import { Comment, computed, Fragment, Text } from 'vue'
import { lt } from './simple-version-compare'

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

export function isVueOptions(options: any): options is Component {
  return (
    options
    && (typeof options.template === 'string'
      || typeof options.render === 'function')
  )
}

export function composeExport<T0 extends object, T1 extends object>(
  s0: T0,
  s1: T1,
): T0 & T1 {
  return Object.assign(s0, s1)
}

// Adapted from https://github.com/vuejs/vue-next/blob/ca17162e377e0a0bf3fae9d92d0fdcb32084a9fe/packages/runtime-core/src/helpers/renderSlot.ts#L77
/* istanbul ignore next -- @preserve */
export function isVnodeEmpty(vnodes: Array<VNode>) {
  return vnodes.every((node: VNode) => {
    if (node.type === Comment) {
      return true
    }

    if (node.type === Text && typeof node.children === 'string' && !node.children.trim()) {
      return true
    }

    if (
      node.type === Fragment
      && isVnodeEmpty(node.children as Array<VNode>)
    ) {
      return true
    }

    return false
  })
}

export function hasSlotContent(slot: Slot<any> | undefined) {
  if (!slot) {
    return false
  }
  return !isVnodeEmpty(slot())
}

export function compatibleUnderlineProp() {
  /* istanbul ignore next -- @preserve */
  return lt(version, '2.9.9') ? false : 'never'
}
