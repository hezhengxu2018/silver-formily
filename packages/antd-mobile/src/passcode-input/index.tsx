import type { PasscodeInputProps, PasscodeInputRef } from 'antd-mobile'
import { connect, mapReadPretty } from '@silver-formily/react'
import { PasscodeInput as AntdPasscodeInput } from 'antd-mobile'
import { forwardRef } from 'react'
import { PreviewText } from '../preview-text'

export interface IPasscodeInputProps extends PasscodeInputProps {
  disabled?: boolean
  readOnly?: boolean
}

function PasscodePreview({ value, plain, className, style }: IPasscodeInputProps) {
  return <PreviewText className={className} style={style} value={plain ? value : value ? '•'.repeat(value.length) : undefined} />
}

const BasePasscodeInput = forwardRef<PasscodeInputRef, IPasscodeInputProps>(({ disabled, readOnly, value, ...props }, ref) => {
  if (disabled || readOnly)
    return <PasscodePreview {...props} value={value} />
  return <AntdPasscodeInput {...props} value={value ?? ''} ref={ref} />
})

export const PasscodeInput = connect(BasePasscodeInput, mapReadPretty(PasscodePreview))
export default PasscodeInput
