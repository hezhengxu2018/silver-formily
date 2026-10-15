import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { isValid } from '@silver-formily/shared'
import { Input as AntdInput, TextArea as AntdTextArea } from 'antd-mobile'
import { PreviewText } from '../preview-text'

const mapDefaultValue = mapProps((props: any) => {
  return {
    value: isValid(props.value) ? props.value : '',
  }
})

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
