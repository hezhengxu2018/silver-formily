import type { RateProps } from 'antd-mobile/es/components/rate'
import { connect } from '@silver-formily/react'
import { Rate as AntdRate } from 'antd-mobile'

export interface IRateProps extends RateProps {
  disabled?: boolean
}

export const Rate = connect(({
  disabled,
  readOnly,
  ...props
}: IRateProps) => (
  <AntdRate {...props} readOnly={disabled || readOnly} />
))

export default Rate
