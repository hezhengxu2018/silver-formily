import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FTimePicker from './time-picker.vue'

export const TimePicker = connect<typeof FTimePicker>(
  FTimePicker,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.TimePicker),
)

export default TimePicker

export type {
  PickerOption,
  PickerThemeVars,
  PopupPosition,
  TimePickerBaseEventParams,
  TimePickerCancelEventParams,
  TimePickerChangeEventParams,
  TimePickerColumnType,
  TimePickerConfirmEventParams,
  TimePickerDisplayFormatter,
  TimePickerModelValue,
  TimePickerProps,
  TimePickerResolvedValue,
  TimePickerSlots,
  VanPopupProps,
  VanTimePickerInstance,
  VanTimePickerProps,
} from './types'
