import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FDatePicker from './date-picker.vue'

export const DatePicker = connect<typeof FDatePicker>(
  FDatePicker,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.DatePicker),
)

export default DatePicker

export type {
  DatePickerBaseEventParams,
  DatePickerCancelEventParams,
  DatePickerChangeEventParams,
  DatePickerColumnType,
  DatePickerConfirmEventParams,
  DatePickerDisplayFormatter,
  DatePickerModelValue,
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
