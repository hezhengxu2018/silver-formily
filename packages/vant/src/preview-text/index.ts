import { composeExport } from '../__builtins__'
import Calendar from './calendar.vue'
import Cascader from './cascader.vue'
import Input from './input.vue'
import Picker from './picker.vue'
import Preview from './preview.vue'
import Select from './select.vue'

export const PreviewText = composeExport(Preview, {
  Calendar,
  Cascader,
  Input,
  Picker,
  Select,
})

export default PreviewText

export type {
  PreviewTextCalendarProps,
  PreviewTextCascaderProps,
  PreviewTextInputProps,
  PreviewTextPickerProps,
  PreviewTextProps,
  PreviewTextSelectProps,
} from './types'
