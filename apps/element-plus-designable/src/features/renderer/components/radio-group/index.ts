import { Radio as ElementPlusRadio } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const RadioGroup = defineElementPlusComponent({
  component: ElementPlusRadio.Group,
  componentName: 'Radio.Group',
  defaultProps: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  },
  description: 'Radio group',
  icon: 'RadioGroup',
  title: 'Radio Group',
})
