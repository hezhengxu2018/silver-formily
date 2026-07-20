import { connect, mapProps } from '@silver-formily/vue'
import { fieldControlIdMapper } from '../utils'
import FInputNumber from './InputNumber.vue'

export const InputNumber = connect<typeof FInputNumber>(
  FInputNumber,
  mapProps({
    readOnly: 'readonly',
  }, fieldControlIdMapper),
)

export default InputNumber
