import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface VantFormItemControlContext {
  disabled?: boolean
  error?: boolean
  inputAlign?: string
  inputId?: string
  labelId?: string
  readonly?: boolean
  registerInputController?: (controller: VantFormItemInputController | null) => void
}

export interface VantFormItemInputController {
  focus: () => void
  id?: string
}

export const vantFormItemControlContextKey: InjectionKey<ComputedRef<VantFormItemControlContext>> = Symbol('silver-formily-vant-form-item-control-context')

export function useVantFormItemControlContext() {
  return inject(vantFormItemControlContextKey, null)
}
