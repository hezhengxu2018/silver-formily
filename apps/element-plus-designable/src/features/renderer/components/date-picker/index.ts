import { DatePicker as ElementPlusDatePicker } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const DatePicker = defineElementPlusComponent({
  component: ElementPlusDatePicker,
  componentName: 'DatePicker',
  defaultProps: { placeholder: 'Pick a date' },
  description: 'Date picker',
  icon: 'DatePicker',
  title: 'Date Picker',
})
