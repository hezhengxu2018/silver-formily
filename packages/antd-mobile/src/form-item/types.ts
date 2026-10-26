import type { ListItemProps } from 'antd-mobile/es/components/list'
import type React from 'react'

export interface IFormItemProps extends Omit<ListItemProps, 'title' | 'prefix' | 'description'> {
  clearable?: boolean
  value?: unknown
  onClear?: () => void
  className?: string
  label?: React.ReactNode
  labelStyle?: React.CSSProperties
  labelAlign?: 'left' | 'right'
  colon?: boolean
  labelWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: React.CSSProperties
  help?: React.ReactNode
  required?: boolean
  extra?: React.ReactNode
  layout?: 'vertical' | 'horizontal'
  feedbackText?: React.ReactNode
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {})
  bordered?: boolean
  tooltipLayout?: 'icon' | 'text'
  tooltip?: React.ReactNode
  tooltipIcon?: React.ReactNode
  asterisk?: boolean
  gridSpan?: number
}

