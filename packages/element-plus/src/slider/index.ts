import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElSlider } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type SliderProps = VueComponentProps<typeof ElSlider>
export type SliderComponent = typeof ElSlider

export const Slider = connect<typeof ElSlider>(
  ElSlider,
  mapProps({ readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.Input),
)

export default Slider
