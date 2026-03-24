import type { IFormFeedback } from '@formily/core'
import type { FormPathPattern } from '@formily/shared'
import type { ComponentPublicInstance, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, onBeforeUnmount, provide, toValue, watch } from 'vue'
import { normalizeFormPath } from './context'

export interface VantFormItemRegistryEntry {
  address?: string
  el: HTMLElement
  path?: string
}

export interface VantFormItemRegistry {
  get: (identifier: FormPathPattern) => HTMLElement | undefined
  register: (entry: VantFormItemRegistryEntry) => void
  unregister: (entry: Partial<VantFormItemRegistryEntry>) => void
}

export const vantFormItemRegistryKey: InjectionKey<VantFormItemRegistry> = Symbol('silver-formily-vant-form-item-registry')
export const vantFormRootKey: InjectionKey<Ref<HTMLFormElement | undefined>> = Symbol('silver-formily-vant-form-root')

function normalizeRegistryIdentifiers(...identifiers: (FormPathPattern | undefined)[]) {
  return identifiers
    .map(identifier => normalizeFormPath(identifier))
    .filter((identifier): identifier is string => Boolean(identifier))
}

function resolveFieldElement(target: ComponentPublicInstance | null) {
  const element = target?.$el
  return element instanceof HTMLElement ? element : null
}

export function useVantFormItemRegistry() {
  return inject(vantFormItemRegistryKey, null)
}

export function useVantFormRoot() {
  return inject(vantFormRootKey, null)
}

interface UseVantFormScrollOptions {
  formElementRef: Ref<HTMLFormElement | undefined>
  scrollToError?: MaybeRefOrGetter<boolean | undefined>
  scrollToErrorPosition?: MaybeRefOrGetter<ScrollLogicalPosition | undefined>
}

export function useVantFormScroll(options: UseVantFormScrollOptions) {
  const { formElementRef } = options
  const formItemElements = new Map<string, HTMLElement>()

  const formItemRegistry: VantFormItemRegistry = {
    get(identifier) {
      const key = normalizeFormPath(identifier)
      return key ? formItemElements.get(key) : undefined
    },
    register(entry) {
      normalizeRegistryIdentifiers(entry.address, entry.path).forEach((identifier) => {
        formItemElements.set(identifier, entry.el)
      })
    },
    unregister(entry) {
      normalizeRegistryIdentifiers(entry.address, entry.path).forEach((identifier) => {
        if (!entry.el || formItemElements.get(identifier) === entry.el) {
          formItemElements.delete(identifier)
        }
      })
    },
  }

  provide(vantFormRootKey, formElementRef)
  provide(vantFormItemRegistryKey, formItemRegistry)

  function resolveScrollTarget(errors: IFormFeedback[]) {
    for (const feedback of errors) {
      const target = [feedback.address, feedback.path]
        .map(identifier => formItemRegistry.get(identifier))
        .find(element => element && formElementRef.value?.contains(element))

      if (target) {
        return target
      }
    }

    return undefined
  }

  function scrollToFirstError(errors: IFormFeedback[]) {
    if (!toValue(options.scrollToError)) {
      return
    }

    const target = resolveScrollTarget(errors)
    if (!target) {
      return
    }

    const block = toValue(options.scrollToErrorPosition)
    target.scrollIntoView(block ? { block } : undefined)
  }

  return {
    scrollToFirstError,
  }
}

interface UseVantFormItemRegistrationOptions {
  fieldAddress?: MaybeRefOrGetter<FormPathPattern | undefined>
  fieldPath?: MaybeRefOrGetter<FormPathPattern | undefined>
  fieldRef: Ref<ComponentPublicInstance | null>
}

export function useVantFormItemRegistration(options: UseVantFormItemRegistrationOptions) {
  const formItemRegistry = useVantFormItemRegistry()
  const normalizedFieldAddress = computed(() => normalizeFormPath(toValue(options.fieldAddress)))
  const normalizedFieldPath = computed(() => normalizeFormPath(toValue(options.fieldPath)))

  let registeredEntry: VantFormItemRegistryEntry | null = null

  function syncFormItemRegistry() {
    if (!formItemRegistry) {
      return
    }

    if (registeredEntry) {
      formItemRegistry.unregister(registeredEntry)
      registeredEntry = null
    }

    const el = resolveFieldElement(options.fieldRef.value)
    if (!el) {
      return
    }

    const address = normalizedFieldAddress.value
    const path = normalizedFieldPath.value
    if (!address && !path) {
      return
    }

    registeredEntry = {
      address,
      el,
      path,
    }
    formItemRegistry.register(registeredEntry)
  }

  watch([options.fieldRef, normalizedFieldAddress, normalizedFieldPath], syncFormItemRegistry, {
    flush: 'post',
    immediate: true,
  })

  onBeforeUnmount(() => {
    if (registeredEntry && formItemRegistry) {
      formItemRegistry.unregister(registeredEntry)
    }
  })
}
