import type { Form, VoidField } from '@formily/core'
import type { Schema, SchemaKey } from '@formily/json-schema'

export interface FormStepSchemaSlots {
  title?: unknown
  icon?: unknown
  activeIcon?: unknown
  finishIcon?: unknown
  inactiveIcon?: unknown
  [key: string]: unknown
}

export interface SchemaStep {
  name: SchemaKey
  props: Record<string, any>
  schema: Schema
  slots?: FormStepSchemaSlots
}

export interface IFormStep {
  connect: (steps: SchemaStep[], field: VoidField | null | undefined) => void
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
  active?: number | string
  hideSteps?: boolean
}

export interface FormStepEnv {
  form: Form | null
  field: VoidField | null
  steps: SchemaStep[]
}
