import { Rate as ElementPlusRate } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Rate = defineElementPlusComponent({
  component: ElementPlusRate,
  componentName: 'Rate',
  description: 'Rating input',
  icon: 'Rate',
  title: 'Rate',
  type: 'number',
})
