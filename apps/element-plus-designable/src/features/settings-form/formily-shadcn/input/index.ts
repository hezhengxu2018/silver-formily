import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../../../renderer/shared'
import FInput from './Input.vue'
import FTextArea from './TextArea.vue'

const InnerInput = connect<typeof FInput>(
  FInput,
  mapProps({
    readOnly: 'readonly',
  }),
)

const TextArea = connect<typeof FTextArea>(
  FTextArea,
  mapProps({
    readOnly: 'readonly',
  }),
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
