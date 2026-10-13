import type { StepperProps } from 'antd-mobile/es/components/stepper'
import type React from 'react'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { isFn, isValid } from '@silver-formily/shared'
import { Stepper as AntdStepper } from 'antd-mobile'
import { PreviewText } from '../preview-text'

export const Stepper: React.FC<StepperProps> = connect(
  AntdStepper,
  mapReadPretty(PreviewText.Input),
)

function formatValue(v: string | number, digits?: number): number {
  let value = Number(v)
  if (isValid(digits)) {
    value = Number.parseFloat(value.toFixed(digits))
  }
  return value
}

export const InputNumber: React.FC<StepperProps> = connect(AntdStepper, mapProps(
  (props: any) => {
    const onChange = props.onChange
    const parser = props.parser
    const digits = isValid(props.digits) ? props.digits : props.precision
    return {
      value: parser ? formatValue(parser(String(props?.value ?? ''))) : props.value,
      digits,
      onChange(value: number) {
        let val: number | string = value
        if (isFn(props.formatter)) {
          val = props.formatter(value)
        }
        val = formatValue(val)
        onChange?.(val)
      },
    }
  },
), mapReadPretty(PreviewText.Input))

export const NumberPicker = InputNumber

export default Stepper
