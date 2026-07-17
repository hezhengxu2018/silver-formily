import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../../../renderer/shared'
import { fieldControlIdMapper } from '../utils'
import FInput from './Input.vue'
import FTextArea from './TextArea.vue'

const InnerInput = connect<typeof FInput>(
  FInput,
  mapProps({
    readOnly: 'readonly',
  }, fieldControlIdMapper),
)

const TextArea = connect<typeof FTextArea>(
  FTextArea,
  mapProps({
    readOnly: 'readonly',
  }, fieldControlIdMapper),
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
