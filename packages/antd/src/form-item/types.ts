import type { ConfigProviderProps, TooltipProps } from 'antd'
import type { CSSProperties, ReactNode } from 'react'
import type { FormSize } from '../__builtins__'

export interface IFormItemProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  prefixCls?: string
  label?: ReactNode
  colon?: boolean
  tooltip?: ReactNode | TooltipProps
  tooltipIcon?: ReactNode
  tooltipLayout?: 'icon' | 'text'
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelStyle?: CSSProperties
  labelAlign?: 'left' | 'right'
  labelFor?: string
  labelWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  labelCol?: number
  wrapperCol?: number
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: CSSProperties
  fullness?: boolean
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  size?: FormSize
  extra?: ReactNode
  feedbackText?: ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending'
  feedbackIcon?: ReactNode
  enableOutlineFeedback?: boolean
  getPopupContainer?: (node: HTMLElement) => HTMLElement
  asterisk?: boolean
  optionalMarkHidden?: boolean
  gridSpan?: number
  variant?: ConfigProviderProps['variant']
}
