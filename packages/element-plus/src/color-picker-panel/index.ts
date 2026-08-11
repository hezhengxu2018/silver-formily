import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElColorPickerPanel } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type ColorPickerPanelProps = VueComponentProps<typeof ElColorPickerPanel>
export type ColorPickerPanelComponent = typeof ElColorPickerPanel

export const ColorPickerPanel = connect<typeof ElColorPickerPanel>(
  ElColorPickerPanel,
  mapProps(
    {
      disabled: true,
    },
    (props: any) => {
      if (!props.readOnly) {
        return props
      }

      return {
        ...props,
        disabled: true,
      }
    },
  ),
  mapReadPretty(PreviewText.ColorPicker),
)

export default ColorPickerPanel
