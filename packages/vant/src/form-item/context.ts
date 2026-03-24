import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface VantFormItemControlContext {
  disabled?: boolean
  error?: boolean
  inputAlign?: string
  readonly?: boolean
}

export const vantFormItemControlContextKey: InjectionKey<ComputedRef<VantFormItemControlContext>> = Symbol('silver-formily-vant-form-item-control-context')

export function useVantFormItemControlContext() {
  return inject(vantFormItemControlContextKey, null)
}
