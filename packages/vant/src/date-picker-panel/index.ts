import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FDatePickerPanel from './date-picker-panel.vue'

export const DatePickerPanel = connect<typeof FDatePickerPanel>(
  FDatePickerPanel,
  mapProps({
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.DatePicker),
)

export default DatePickerPanel

export type {
  DatePickerPanelBoundaryValue,
  DatePickerPanelColumnType,
  DatePickerPanelModelValue,
  DatePickerPanelProps,
  DatePickerPanelResolvedValue,
  DatePickerPanelSlots,
  DatePickerPanelThemeVars,
  VanDatePickerPanelInstance,
  VanDatePickerPanelProps,
} from './types'
