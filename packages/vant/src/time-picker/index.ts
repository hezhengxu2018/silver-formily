import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FTimePicker from './time-picker.vue'

export const TimePicker = connect<typeof FTimePicker>(
  FTimePicker,
  mapProps({
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.TimePicker),
)

export default TimePicker

export type {
  PickerOption,
  PickerThemeVars,
  PopupPosition,
  TimePickerColumnType,
  TimePickerDisplayFormatter,
  TimePickerModelValue,
  TimePickerPopupProps,
  TimePickerProps,
  TimePickerResolvedValue,
  TimePickerSlots,
  VanPopupProps,
  VanTimePickerInstance,
  VanTimePickerProps,
} from './types'
