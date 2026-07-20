import { Checkbox as ElementPlusCheckbox } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Checkbox = defineElementPlusComponent({
  component: ElementPlusCheckbox,
  componentName: 'Checkbox',
  defaultProps: { label: 'Checkbox' },
  description: 'Single checkbox',
  icon: 'Checkbox',
  title: 'Checkbox',
})
