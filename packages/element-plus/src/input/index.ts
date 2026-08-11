import type { VueComponentProps } from '@silver-formily/vue'
import type { ElInput } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { composeExport, mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FInput from './input.vue'

export type InputProps = VueComponentProps<typeof ElInput>
export type InputComponent = typeof ElInput
export type InputTextAreaProps = InputProps

const InnerInput = connect<typeof FInput, InputProps>(
  FInput,
  mapProps({
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input),
)

const TextArea = connect<typeof FInput, InputTextAreaProps>(
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
