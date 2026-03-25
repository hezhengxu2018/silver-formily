import type {
  ButtonIconPosition,
  ButtonNativeType,
  ButtonSize,
  ButtonType,
  LoadingType,
} from 'vant'

export interface VantButtonBaseProps {
  to?: any
  url?: string
  replace?: boolean
  tag?: keyof HTMLElementTagNameMap
  text?: string
  icon?: string
  type?: ButtonType
  size?: ButtonSize
  color?: string
  block?: boolean
  plain?: boolean
  round?: boolean
  square?: boolean
  loading?: boolean
  hairline?: boolean
  disabled?: boolean
  iconPrefix?: string
  nativeType?: ButtonNativeType
  loadingSize?: number | string
  loadingText?: string
  loadingType?: LoadingType
  iconPosition?: ButtonIconPosition
}
