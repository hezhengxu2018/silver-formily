import { TimePicker as ElementPlusTimePicker } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const TimePicker = defineElementPlusComponent({
  component: ElementPlusTimePicker,
  componentName: 'TimePicker',
  defaultProps: { placeholder: 'Pick a time' },
  description: 'Time picker',
  icon: 'TimePicker',
  title: 'Time Picker',
})
