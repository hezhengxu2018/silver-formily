import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FInputTag from './input-tag.vue'

export const InputTag = connect<typeof FInputTag>(
  FInputTag,
  mapProps({ readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.Select, { multiple: true }),
)

export default InputTag
