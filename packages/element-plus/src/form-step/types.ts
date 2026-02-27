import type { Form, VoidField } from '@formily/core'
import type { SchemaStep } from './utils'

export interface IFormStep {
  connect: (steps: SchemaStep[], field: VoidField) => void
  current: number
  allowNext: boolean
  allowBack: boolean
  setCurrent: (key: number) => void
  submit: Form['submit']
  next: () => void
  back: () => void
}

export interface IFormStepProps {
  formStep?: IFormStep
  active?: number
}

export interface FormStepEnv {
  form: Form
  field: VoidField
  steps: SchemaStep[]
}
