import { composeExport } from '../__builtins__'
import FormButtonGroupSticky from './form-button-group-sticky.vue'
import FormButtonGroupInner from './form-button-group.vue'

export const FormButtonGroup = composeExport(FormButtonGroupInner, {
  Sticky: FormButtonGroupSticky,
})

export default FormButtonGroup
