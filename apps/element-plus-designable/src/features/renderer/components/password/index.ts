import { Password as ElementPlusPassword } from '@silver-formily/element-plus'
import { AllSchemas } from '../../schemas'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Password = defineElementPlusComponent({
  component: ElementPlusPassword,
  componentName: 'Password',
  defaultProps: { clearable: true, placeholder: 'Please enter password' },
  description: 'Password input',
  icon: 'Password',
  schema: AllSchemas.Input,
  title: 'Password',
})
