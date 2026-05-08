import { connect, mapProps } from '@silver-formily/vue'
import FPasswordInput from './password-input.vue'

export const PasswordInput = connect<typeof FPasswordInput>(
  FPasswordInput,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
)

export default PasswordInput

export type {
  PasswordInputFocusEvent,
  PasswordInputKeyboardConfig,
  PasswordInputKeyboardProps,
  PasswordInputModelValue,
  PasswordInputProps,
  PasswordInputThemeVars,
  VanNumberKeyboardProps,
  VanPasswordInputProps,
} from './types'
