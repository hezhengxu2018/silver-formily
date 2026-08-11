import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElColorPicker } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type ColorPickerProps = VueComponentProps<typeof ElColorPicker>
export type ColorPickerComponent = typeof ElColorPicker

export const ColorPicker = connect<typeof ElColorPicker>(
  ElColorPicker,
  mapProps({ readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.ColorPicker),
)

export default ColorPicker
