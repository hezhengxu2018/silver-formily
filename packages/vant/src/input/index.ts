import type { InputProps } from './types'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { composeExport } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FInput from './input.vue'

const InnerInput = connect<typeof FInput, Partial<InputProps>>(
  FInput,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Input),
)

const TextArea = connect<typeof FInput, Partial<InputProps>>(
  FInput,
  mapProps((props) => {
    return {
      ...props,
      readonly: props.readOnly,
      disabled: props.disabled,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input),
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input

export type { InputProps } from './types'

export type InputComponent = typeof Input
export type InputTextAreaComponent = typeof TextArea
