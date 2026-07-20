import { PreviewText } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Text = defineElementPlusComponent({
  component: PreviewText.Input,
  componentName: 'Text',
  defaultProps: { value: 'Text' },
  description: 'Static text',
  icon: 'Text',
  title: 'Text',
})
