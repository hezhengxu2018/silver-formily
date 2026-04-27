import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FDatePicker from './date-picker.vue'

export const DatePicker = connect<typeof FDatePicker>(
  FDatePicker,
  mapProps({
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.DatePicker),
)

export default DatePicker

export type {
  DatePickerBoundaryValue,
  DatePickerColumnType,
  DatePickerDisplayFormatter,
  DatePickerModelValue,
  DatePickerPopupProps,
  DatePickerProps,
  DatePickerResolvedValue,
  DatePickerSlots,
  PickerOption,
  PickerThemeVars,
  PopupPosition,
  VanDatePickerInstance,
  VanDatePickerProps,
  VanPopupProps,
} from './types'
