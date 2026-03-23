import { composeExport } from '../__builtins__'
import Calendar from './calendar.vue'
import Input from './input.vue'
import Preview from './preview.vue'

export const PreviewText = composeExport(Preview, {
  Calendar,
  Input,
})

export default PreviewText
