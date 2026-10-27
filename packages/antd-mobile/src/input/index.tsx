import type { InputProps, TextAreaProps } from 'antd-mobile'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { isValid } from '@silver-formily/shared'
import { Input as AntdInput, TextArea as AntdTextArea } from 'antd-mobile'
import { PreviewText } from '../preview-text'

const mapDefaultValue = mapProps((props: Pick<IInputProps, 'value'>) => {
  return {
    value: isValid(props.value) ? props.value : '',
  }
})

export type IInputProps = InputProps
export type ITextAreaProps = TextAreaProps

export const Input = Object.assign(
  connect(AntdInput, mapDefaultValue, mapReadPretty(PreviewText.Input)),
  {
    TextArea: connect(
      AntdTextArea,
      mapDefaultValue,
      mapReadPretty(PreviewText.Input),
    ),
  },
)

export default Input
