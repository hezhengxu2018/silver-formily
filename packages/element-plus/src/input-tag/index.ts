import type { VueComponentProps } from '@silver-formily/vue'
import type { ElInputTag } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FInputTag from './input-tag.vue'

export type InputTagProps = VueComponentProps<typeof ElInputTag>
export type InputTagComponent = typeof ElInputTag

export const InputTag = connect<typeof FInputTag, InputTagProps>(
  FInputTag,
  mapProps({ readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.Select, { multiple: true }),
)

export default InputTag
