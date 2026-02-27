export interface IFormLayoutProps {
  tag?: string
  colon?: boolean
  labelAlign?: 'right' | 'left' | ('right' | 'left')[]
  wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  labelCol?: number | number[]
  wrapperCol?: number | number[]
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?:
    | 'vertical'
    | 'horizontal'
    | 'inline'
    | ('vertical' | 'horizontal' | 'inline')[]
  feedbackLayout?: 'loose' | 'terse' | 'popover'
  tooltipLayout?: 'icon' | 'text'
  breakpoints?: number[]
  shallow?: boolean
  // element-plus form props
  hideRequiredAsterisk?: boolean
  statusIcon?: boolean
  requireAsteriskPosition?: 'left' | 'right'
}

export interface ICalculatedFormLayoutProps {
  colon?: boolean
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  labelWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  labelCol?: number
  wrapperCol?: number
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?: 'vertical' | 'horizontal' | 'inline'
  feedbackLayout?: 'loose' | 'terse' | 'popover'
  tooltipLayout?: 'icon' | 'text'
  breakpoints?: number[]
  shallow?: boolean
  // element-plus form props
  hideRequiredAsterisk?: boolean
  statusIcon?: boolean
  requireAsteriskPosition?: 'left' | 'right'
}
