import { composeExport } from '../__builtins__'
import Input from './input.vue'
import Preview from './preview.vue'

export const PreviewText = composeExport(Preview, {
  Input,
})

export default PreviewText
