import { ArrayCards as ElementPlusArrayCards } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'
import Preview from './Preview.vue'

export const ArrayCards = defineElementPlusComponent({
  component: ElementPlusArrayCards,
  componentName: 'ArrayCards',
  defaultProps: { title: 'Array Cards' },
  decorator: false,
  description: 'Card list for array fields',
  icon: 'ArrayCards',
  previewComponent: Preview,
  title: 'Array Cards',
  type: 'array',
})
