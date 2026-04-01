import { composeExport } from '../__builtins__'
import Calendar from './calendar.vue'
import Cascader from './cascader.vue'
import DatePicker from './date-picker.vue'
import Input from './input.vue'
import PickerGroup from './picker-group.vue'
import Picker from './picker.vue'
import Preview from './preview.vue'
import Rate from './rate.vue'
import Select from './select.vue'
import TimePicker from './time-picker.vue'

export const PreviewText = composeExport(Preview, {
  Calendar,
  Cascader,
  DatePicker,
  Input,
  Picker,
  PickerGroup,
  Rate,
  Select,
  TimePicker,
})

export default PreviewText

export type {
  PreviewTextCalendarProps,
  PreviewTextCascaderProps,
  PreviewTextDatePickerProps,
  PreviewTextInputProps,
  PreviewTextPickerGroupProps,
  PreviewTextPickerProps,
  PreviewTextProps,
  PreviewTextRateProps,
  PreviewTextSelectProps,
  PreviewTextTimePickerProps,
} from './types'
