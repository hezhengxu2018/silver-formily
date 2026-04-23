import type {
  PasswordInputThemeVars,
  NumberKeyboardProps as VanNumberKeyboardProps,
  PasswordInputProps as VanPasswordInputProps,
} from 'vant'

export type PasswordInputModelValue = string | number | null | undefined

export type PasswordInputFocusEvent = TouchEvent

export interface PasswordInputKeyboardProps extends Partial<Pick<VanNumberKeyboardProps, 'blurOnClose' | 'closeButtonLoading' | 'closeButtonText' | 'deleteButtonText' | 'extraKey' | 'hideOnClickOutside' | 'randomKeyOrder' | 'safeAreaInsetBottom' | 'showDeleteKey' | 'teleport' | 'theme' | 'title' | 'transition' | 'zIndex'>> {}

export type PasswordInputKeyboardConfig = boolean | PasswordInputKeyboardProps

export interface PasswordInputProps extends Pick<VanPasswordInputProps, 'errorInfo' | 'focused' | 'gutter' | 'info' | 'length' | 'mask'> {
  modelValue?: PasswordInputModelValue
  disabled?: boolean
  readonly?: boolean
  keyboard?: PasswordInputKeyboardConfig
}

export type {
  PasswordInputThemeVars,
  VanNumberKeyboardProps,
  VanPasswordInputProps,
}
