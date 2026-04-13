import type { ComputedRef, InjectionKey } from 'vue'
import type { IFormStep } from './types'
import { inject } from 'vue'

export const FormStepSymbol: InjectionKey<ComputedRef<IFormStep>> = Symbol('VantFormStepContext')

export function useFormStep(): ComputedRef<IFormStep> {
  const formStep = inject(FormStepSymbol)

  if (!formStep)
    throw new Error('useFormStep 必须在 FormStep 组件内部使用')

  return formStep
}
