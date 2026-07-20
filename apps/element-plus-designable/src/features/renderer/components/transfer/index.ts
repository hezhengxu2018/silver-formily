import { Transfer as ElementPlusTransfer } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Transfer = defineElementPlusComponent({
  component: ElementPlusTransfer,
  componentName: 'Transfer',
  defaultProps: { data: [] },
  description: 'Transfer selector',
  icon: 'Transfer',
  title: 'Transfer',
})
