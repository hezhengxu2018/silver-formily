import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Slider as VanSlider } from 'vant'
import { PreviewText } from '../preview-text'

export type SliderProps = VueComponentProps<typeof VanSlider>
export type SliderComponent = typeof VanSlider

export const Slider = connect<typeof VanSlider, SliderProps>(
  VanSlider,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Slider),
)

export default Slider
