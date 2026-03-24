import type { FormPathPattern } from '@formily/shared'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { FormPath } from '@formily/shared'
import { inject } from 'vue'

export const vantFormInheritedPropKeys = [
  'colon',
  'disabled',
  'readonly',
  'required',
  'labelWidth',
  'labelAlign',
  'inputAlign',
  'errorMessageAlign',
  'showError',
  'showErrorMessage',
] as const

export type VantFormInheritedPropKey = (typeof vantFormInheritedPropKeys)[number]

export type VantFormContext = Partial<Record<VantFormInheritedPropKey, any>>

export const vantFormContextKey: InjectionKey<ComputedRef<VantFormContext>> = Symbol('silver-formily-vant-form-context')
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

export function hasDefinedValue<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null
}

export function normalizeFormPath(path?: FormPathPattern) {
  if (!hasDefinedValue(path) || path === '') {
    return undefined
  }

  return FormPath.parse(path).toString()
}

export function useVantFormContext() {
  return inject(vantFormContextKey, null)
}

export function useVantFormItemRegistry() {
  return inject(vantFormItemRegistryKey, null)
}

export function useVantFormRoot() {
  return inject(vantFormRootKey, null)
}
