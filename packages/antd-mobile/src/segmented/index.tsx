import type { SegmentedProps } from 'antd-mobile'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Segmented as AntdSegmented } from 'antd-mobile'
import { forwardRef } from 'react'
import { PreviewText } from '../preview-text'

export interface ISegmentedProps extends SegmentedProps {
  readOnly?: boolean
}

function SegmentedPreview({ value, options = [], className, style }: ISegmentedProps) {
  const option = options.find(option => (typeof option === 'object' ? option.value : option) === value)
  const label = typeof option === 'object' ? option.label ?? option.value : option
  return <PreviewText className={className} style={style} value={label ?? value} />
}

const BaseSegmented = forwardRef<HTMLDivElement, ISegmentedProps>(({ readOnly, disabled, ...props }, ref) => (
  <AntdSegmented {...props} disabled={disabled || readOnly} ref={ref} />
))

export const Segmented = connect(
  BaseSegmented,
  mapReadPretty(SegmentedPreview),
  mapProps({ dataSource: 'options' }),
)
export default Segmented
