import { Slider as ElementPlusSlider } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Slider = defineElementPlusComponent({
  component: ElementPlusSlider,
  componentName: 'Slider',
  description: 'Slider input',
  icon: 'Slider',
  title: 'Slider',
  type: 'number',
})
