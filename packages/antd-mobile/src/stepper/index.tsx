import type { StepperProps } from 'antd-mobile'
import { connect, mapReadPretty } from '@silver-formily/react'
import { Stepper as AntdStepper } from 'antd-mobile'
import { PreviewText } from '../preview-text'

export type IStepperProps = StepperProps

export const Stepper = connect(
  AntdStepper,
  mapReadPretty(PreviewText.Input),
)

export default Stepper
