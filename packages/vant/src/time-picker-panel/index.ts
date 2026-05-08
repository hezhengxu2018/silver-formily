import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FTimePickerPanel from './time-picker-panel.vue'

export const TimePickerPanel = connect<typeof FTimePickerPanel>(
  FTimePickerPanel,
  mapProps({
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.TimePicker),
)

export default TimePickerPanel

export type {
  TimePickerPanelColumnType,
  TimePickerPanelModelValue,
  TimePickerPanelProps,
  TimePickerPanelResolvedValue,
  TimePickerPanelSlots,
  TimePickerPanelThemeVars,
  VanTimePickerPanelInstance,
  VanTimePickerPanelProps,
} from './types'
