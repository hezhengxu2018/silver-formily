import type { InputProps } from 'antd-mobile/es/components/input'
import type { TextAreaProps } from 'antd-mobile/es/components/text-area'
import type React from 'react'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { isValid } from '@silver-formily/shared'
import { Input as AntdInput, TextArea as AntdTextArea } from 'antd-mobile'
import { PreviewText } from '../preview-text'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>
}

export const Input: ComposedInput = connect(
  AntdInput,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : '',
    }
  }),
  mapReadPretty(PreviewText.Input),
)

Input.TextArea = connect(
  AntdTextArea,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : '',
    }
  }),
  mapReadPretty(PreviewText.Input),
)

export default Input
