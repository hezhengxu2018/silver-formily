import type { FormPathPattern } from '@formily/shared'
import type { ComputedRef, InjectionKey } from 'vue'
import { FormPath } from '@formily/shared'
import { isNil } from 'es-toolkit'
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

export function normalizeFormPath(path?: FormPathPattern) {
  if (isNil(path) || path === '') {
    return undefined
  }

  return FormPath.parse(path).toString()
}

export function useVantFormContext() {
  return inject(vantFormContextKey, null)
}
