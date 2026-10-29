import type { Form, VoidField } from '@silver-formily/core'
import type { Schema, SchemaKey } from '@silver-formily/json-schema'
import type { StepProps, StepsProps } from 'antd-mobile'
import type { ReactNode } from 'react'

export interface IFormStepPaneProps extends StepProps {
  children?: ReactNode
}

export interface SchemaStep {
  name: SchemaKey
  props: IFormStepPaneProps
  schema: Schema
}

export interface IFormStep {
  connect: (steps: SchemaStep[], field: VoidField | null | undefined) => void
  current: number
  readonly allowNext: boolean
  readonly allowBack: boolean
  setCurrent: (current: number) => void
  next: () => Promise<void>
  back: () => void
  submit: Form['submit']
}

export interface IFormStepProps extends StepsProps {
  formStep?: IFormStep
  hideSteps?: boolean
}
