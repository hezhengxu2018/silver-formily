import { Switch as ElementPlusSwitch } from '@silver-formily/element-plus'
import { AllSchemas } from '../../schemas'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Switch = defineElementPlusComponent({
  component: ElementPlusSwitch,
  componentName: 'Switch',
  description: 'Boolean switch',
  icon: 'Switch',
  schema: AllSchemas.Switch,
  title: 'Switch',
  type: 'boolean',
})
