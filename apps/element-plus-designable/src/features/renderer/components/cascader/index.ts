import { Cascader as ElementPlusCascader } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Cascader = defineElementPlusComponent({
  component: ElementPlusCascader,
  componentName: 'Cascader',
  defaultProps: { clearable: true, placeholder: 'Please select' },
  description: 'Cascading selector',
  icon: 'Cascader',
  title: 'Cascader',
})
