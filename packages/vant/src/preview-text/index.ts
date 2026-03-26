import { composeExport } from '../__builtins__'
import Calendar from './calendar.vue'
import Input from './input.vue'
import Preview from './preview.vue'
import Select from './select.vue'

export const PreviewText = composeExport(Preview, {
  Calendar,
  Input,
  Select,
})

export default PreviewText

export type {
  PreviewTextCalendarProps,
  PreviewTextInputProps,
  PreviewTextProps,
  PreviewTextSelectProps,
} from './types'
