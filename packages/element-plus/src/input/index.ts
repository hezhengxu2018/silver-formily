import { connect, mapProps } from '@silver-formily/vue'
import { composeExport, mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FInput from './input.vue'

const InnerInput = connect<typeof FInput>(
  FInput,
  mapProps({
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input),
)

const TextArea = connect<typeof FInput>(
  FInput,
  mapProps((props) => {
    return {
      ...props,
      readonly: props.readOnly,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input),
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
