import type { Component, ComputedRef, Slot, VNode } from 'vue'
import { camelCase, paramCase } from '@silver-formily/shared'
import { useAttrs as useElementPlusAttrs, version } from 'element-plus'
import { Comment, computed, Fragment, getCurrentInstance, Text, unref } from 'vue'
import { lt } from './simple-version-compare'

type ComponentWithOptions = Component & {
  props?: unknown
  emits?: unknown
  __vccOpts?: {
    props?: unknown
    emits?: unknown
  }
}

export interface SplitAttrsByComponentOptions {
  extraPropKeys?: string[]
  extraEventNames?: string[]
  removeKeys?: string[]
}

export function useExcludedAttrs(
  excludeKeys: string[] | ComputedRef<string[]> = [],
): ComputedRef<Record<string, any>> {
  const instance = getCurrentInstance()
  const reactiveAttrs = useElementPlusAttrs({
    excludeKeys: computed(() => [...unref(excludeKeys)]),
  })

  return computed(() => {
    const excludedKeys = new Set(unref(excludeKeys))
    const rawAttrs = (instance?.proxy?.$attrs ?? {}) as Record<string, any>
    const attrs = { ...reactiveAttrs.value }

    if (!excludedKeys.has('class') && rawAttrs.class !== undefined) {
      attrs.class = rawAttrs.class
    }
    if (!excludedKeys.has('style') && rawAttrs.style !== undefined) {
      attrs.style = rawAttrs.style
    }

    return attrs
  })
}

function normalizeKeys(keys: string[]) {
  return new Set(keys.flatMap(key => [key, camelCase(key), paramCase(key)]))
}

function normalizeOptionKeys(options: unknown) {
  if (!options)
    return new Set<string>()
  if (Array.isArray(options))
    return normalizeKeys(options.map(key => String(key)))
  if (typeof options === 'object')
    return normalizeKeys(Object.keys(options as Record<string, unknown>))
  return new Set<string>()
}

function normalizeEventPropName(key: string) {
  if (!/^on[^a-z]/.test(key))
    return ''
  const rawName = key.slice(2)
  return rawName.charAt(0).toLowerCase() + rawName.slice(1)
}

function isComponentEventKey(key: string, eventNames: Set<string>) {
  const eventName = normalizeEventPropName(key)
  return !!eventName && (eventNames.has(eventName) || eventNames.has(camelCase(eventName)) || eventNames.has(paramCase(eventName)))
}

export function useSplitAttrsByComponent(
  component: ComponentWithOptions,
  options: SplitAttrsByComponentOptions = {},
): {
  rootAttrs: ComputedRef<Record<string, any>>
  componentProps: ComputedRef<Record<string, any>>
} {
  const attrs = useExcludedAttrs()
  const componentPropsKeys = computed(() => {
    const props = component.props ?? component.__vccOpts?.props
    return new Set([
      ...normalizeOptionKeys(props),
      ...normalizeKeys(options.extraPropKeys ?? []),
    ])
  })
  const componentEventNames = computed(() => {
    const emits = component.emits ?? component.__vccOpts?.emits
    return new Set([
      ...normalizeOptionKeys(emits),
      ...normalizeKeys(options.extraEventNames ?? []),
    ])
  })
  const removeKeys = computed(() => normalizeKeys(options.removeKeys ?? []))
  const splitAttrs = computed(() => {
    return Object.entries(attrs.value).reduce<{
      rootAttrs: Record<string, any>
      componentProps: Record<string, any>
    }>((buf, [key, value]) => {
      const normalizedKey = camelCase(key)
      if (removeKeys.value.has(key) || removeKeys.value.has(normalizedKey))
        return buf

      if (componentPropsKeys.value.has(key) || componentPropsKeys.value.has(normalizedKey) || isComponentEventKey(key, componentEventNames.value)) {
        buf.componentProps[normalizedKey] = value
      }
      else {
        buf.rootAttrs[key] = value
      }
      return buf
    }, {
      rootAttrs: {},
      componentProps: {},
    })
  })
  return {
    rootAttrs: computed(() => splitAttrs.value.rootAttrs),
    componentProps: computed(() => splitAttrs.value.componentProps),
  }
}

export function isVueOptions(options: any): options is Component {
  return (
    options
    && typeof options !== 'function'
    && (typeof options.template === 'string'
      || typeof options.render === 'function'
      || typeof options.setup === 'function'
      || typeof options.__asyncLoader === 'function'
      || typeof options.__name === 'string')
  )
}

export function composeExport<T0 extends object, T1 extends object>(
  s0: T0,
  s1: T1,
): T0 & T1 {
  const composed = Object.create(Object.getPrototypeOf(s0))
  Object.defineProperties(composed, Object.getOwnPropertyDescriptors(s0))
  Object.defineProperties(composed, Object.getOwnPropertyDescriptors(s1))
  return composed
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
