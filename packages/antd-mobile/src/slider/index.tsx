import type { SliderProps } from 'antd-mobile'
import { connect, mapReadPretty } from '@silver-formily/react'
import { Slider as AntdSlider } from 'antd-mobile'
import { PreviewText } from '../preview-text'

export interface ISliderProps extends SliderProps {
  readOnly?: boolean
}

function SliderPreview({ value, className, style }: ISliderProps) {
  return <PreviewText className={className} style={style} value={Array.isArray(value) ? value.join(' ~ ') : value} />
}

export const Slider = connect(
  ({ readOnly, disabled, ...props }: ISliderProps) => <AntdSlider {...props} disabled={disabled || readOnly} />,
  mapReadPretty(SliderPreview),
)
export default Slider
