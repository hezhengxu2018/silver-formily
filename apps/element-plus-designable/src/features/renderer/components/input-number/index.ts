import { InputNumber as ElementPlusInputNumber } from '@silver-formily/element-plus'
import { AllSchemas } from '../../schemas'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const InputNumber = defineElementPlusComponent({
  component: ElementPlusInputNumber,
  componentName: 'InputNumber',
  defaultProps: { controlsPosition: 'right', min: 0 },
  description: 'Numeric input',
  icon: 'Number',
  schema: AllSchemas.InputNumber,
  title: 'Input Number',
  type: 'number',
})
