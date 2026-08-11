import type { ElInput } from 'element-plus'
import type { InputProps } from '../input'
import { connect, mapProps } from '@silver-formily/vue'
import { Input } from '../input'

export type PasswordProps = InputProps
export type PasswordComponent = typeof ElInput

export const Password = connect<typeof Input>(
  Input,
  mapProps(props => ({
    ...props,
    showPassword: true,
  })),
)

export default Password
