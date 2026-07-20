import { Checkbox as ElementPlusCheckbox } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const CheckboxGroup = defineElementPlusComponent({
  component: ElementPlusCheckbox.Group,
  componentName: 'Checkbox.Group',
  defaultProps: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  },
  description: 'Checkbox group',
  icon: 'CheckboxGroup',
  title: 'Checkbox Group',
})
