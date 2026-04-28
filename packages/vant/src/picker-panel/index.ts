import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FPickerPanel from './picker-panel.vue'

export const PickerPanel = connect<typeof FPickerPanel>(
  FPickerPanel,
  mapProps({
    dataSource: 'columns',
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.Picker),
)

export default PickerPanel

export type {
  PickerPanelModelValue,
  PickerPanelProps,
  PickerPanelResolvedValue,
  PickerPanelSlots,
  PickerPanelThemeVars,
  VanPickerPanelInstance,
  VanPickerPanelProps,
} from './types'
