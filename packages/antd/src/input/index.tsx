import type { InputProps } from 'antd'
import type { TextAreaProps } from 'antd/es/input'
import type { ComponentRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Input as AntdInput } from 'antd'
import { forwardRef } from 'react'
import { useControlProps } from '../__builtins__'
import { useNativeFeedback } from '../__builtins__/feedback'
import { PreviewText } from '../preview-text'

interface InputControlProps extends InputProps {
  fieldLoading?: boolean
  fieldValidating?: boolean
}

const InputControl = forwardRef<ComponentRef<typeof AntdInput>, InputControlProps>(({ fieldLoading, fieldValidating, ...props }, ref) => {
  const { hasFeedback } = useNativeFeedback()
  const loading = fieldLoading || (fieldValidating && !hasFeedback)
  // Keep the suffix wrapper mounted so validation changes retain input focus.
  return (
    <AntdInput
      {...useControlProps(props)}
      suffix={(
        <span>
          {props.suffix}
          {loading && <LoadingOutlined />}
        </span>
      )}
      ref={ref}
    />
  )
})
const TextAreaControl = forwardRef<ComponentRef<typeof AntdInput.TextArea>, TextAreaProps>((props, ref) => {
  const { size: _size, ...controlProps } = useControlProps(props)
  return <AntdInput.TextArea {...controlProps} ref={ref} />
})
export const Input = Object.assign(connect(
  InputControl,
  mapProps((_props, field) => ({
    fieldLoading: field && 'loading' in field ? field.loading : undefined,
    fieldValidating: field && 'validating' in field ? field.validating : undefined,
  })),
  mapReadPretty(PreviewText.Input),
), { TextArea: connect(TextAreaControl, mapReadPretty(PreviewText.Input)) })
export default Input
