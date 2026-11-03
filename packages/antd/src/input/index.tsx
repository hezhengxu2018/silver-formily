import type { InputProps } from 'antd'
import type { TextAreaProps } from 'antd/es/input'
import type { ComponentRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Input as AntdInput } from 'antd'
import { forwardRef } from 'react'
import { useControlProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

const InputControl = forwardRef<ComponentRef<typeof AntdInput>, InputProps>((props, ref) => <AntdInput {...useControlProps(props)} ref={ref} />)
const TextAreaControl = forwardRef<ComponentRef<typeof AntdInput.TextArea>, TextAreaProps>((props, ref) => {
  const { size: _size, ...controlProps } = useControlProps(props)
  return <AntdInput.TextArea {...controlProps} ref={ref} />
})
export const Input = Object.assign(connect(
  InputControl,
  mapProps((props, field) => ({
    suffix: <span>{field && (('loading' in field && field.loading) || ('validating' in field && field.validating)) ? <LoadingOutlined /> : props.suffix}</span>,
  })),
  mapReadPretty(PreviewText.Input),
), { TextArea: connect(TextAreaControl, mapReadPretty(PreviewText.Input)) })
export default Input
