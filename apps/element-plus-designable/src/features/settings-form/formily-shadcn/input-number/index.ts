import { connect, mapProps } from '@silver-formily/vue'
import FInputNumber from './InputNumber.vue'

export const InputNumber = connect<typeof FInputNumber>(
  FInputNumber,
  mapProps({
    readOnly: 'readonly',
  }),
)

export default InputNumber
