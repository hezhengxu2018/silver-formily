import { Radio as ElementPlusRadio } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Radio = defineElementPlusComponent({
  component: ElementPlusRadio,
  componentName: 'Radio',
  defaultProps: { label: 'Radio' },
  description: 'Single radio',
  icon: 'Radio',
  title: 'Radio',
})
