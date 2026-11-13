import { isVoidField } from '@silver-formily/core'
import { mapProps } from '@silver-formily/react'
import { Input as AntdInput } from 'antd'
import { connectControl, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const OTP: typeof AntdInput.OTP = connectControl(
  AntdInput.OTP,
  mapProps((props, field) => {
    if (!field || isVoidField(field))
      return props
    return {
      value: props.value ?? '',
      // Only onInput writes the field; onChange remains a completion callback.
      onChange: (value: string) => field.componentProps.onChange?.(value),
      onInput: (values: string[]) => {
        void field.onInput(values.join(''))
        field.componentProps.onInput?.(values)
      },
    }
  }),
  mapReadPrettyControl(PreviewText.Password),
)
export default OTP
