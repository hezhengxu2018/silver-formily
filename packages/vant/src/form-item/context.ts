import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface VantFormItemControlContext {
  activateControl?: () => void
  disabled?: boolean
  error?: boolean
  inputAlign?: string
  inputId?: string
  labelId?: string
  registerControlActivator?: (activator: VantFormItemControlActivator | null) => void
  readonly?: boolean
  registerInputController?: (controller: VantFormItemInputController | null) => void
}

export interface VantFormItemControlActivator {
  activate: () => void
}

export interface VantFormItemInputController {
  focus: () => void
  id?: string
}

export const vantFormItemControlContextKey: InjectionKey<ComputedRef<VantFormItemControlContext>> = Symbol('silver-formily-vant-form-item-control-context')

export function useVantFormItemControlContext() {
  return inject(vantFormItemControlContextKey, null)
}
