import { connect, mapReadPretty } from '@silver-formily/react'
import { Stepper as AntdStepper } from 'antd-mobile'
import { PreviewText } from '../preview-text'

export const Stepper = connect(
  AntdStepper,
  mapReadPretty(PreviewText.Input),
)

export default Stepper
