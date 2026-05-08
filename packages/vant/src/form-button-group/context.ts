import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export type VantFormButtonGroupLayout = 'vertical' | 'horizontal' | 'compact'

export interface VantFormButtonGroupContext {
  layout: VantFormButtonGroupLayout
}

export const vantFormButtonGroupContextKey: InjectionKey<ComputedRef<VantFormButtonGroupContext>> = Symbol('vant-form-button-group-context')

export function useVantFormButtonGroupContext() {
  return inject(vantFormButtonGroupContextKey, null)
}
