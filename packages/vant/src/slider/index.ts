import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Slider as VanSlider } from 'vant'
import { PreviewText } from '../preview-text'

export const Slider = connect<typeof VanSlider>(
  VanSlider,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Slider),
)

export default Slider
