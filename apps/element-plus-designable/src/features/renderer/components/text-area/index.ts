import { Input as ElementPlusInput } from '@silver-formily/element-plus'
import { AllSchemas } from '../../schemas'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const TextArea = defineElementPlusComponent({
  component: ElementPlusInput.TextArea,
  componentName: 'Input.TextArea',
  defaultProps: { placeholder: 'Please enter', rows: 3 },
  description: 'Multi-line text input',
  icon: 'TextArea',
  schema: AllSchemas.Input.TextArea,
  title: 'TextArea',
})
