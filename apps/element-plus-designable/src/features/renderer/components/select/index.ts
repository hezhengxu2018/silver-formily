import { Select as ElementPlusSelect } from '@silver-formily/element-plus'
import { AllSchemas } from '../../schemas'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Select = defineElementPlusComponent({
  component: ElementPlusSelect,
  componentName: 'Select',
  defaultProps: {
    clearable: true,
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    placeholder: 'Please select',
  },
  description: 'Dropdown selector',
  icon: 'Select',
  schema: AllSchemas.Select,
  title: 'Select',
})
