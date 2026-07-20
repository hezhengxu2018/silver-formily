import { Input as ElementPlusInput } from '@silver-formily/element-plus'
import { AllSchemas } from '../../schemas'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Input = defineElementPlusComponent({
  component: ElementPlusInput,
  componentName: 'Input',
  defaultProps: { clearable: true, placeholder: 'Please enter' },
  description: 'Single line text input',
  icon: 'Input',
  schema: AllSchemas.Input,
  title: 'Input',
})
