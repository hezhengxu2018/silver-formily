import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { RichTextPreview } from '../preview-text'
import FRichText from './rich-text.vue'

export const RichText = connect<typeof FRichText>(
  FRichText,
  mapProps({ readOnly: true, disabled: true }),
  mapReadPretty(RichTextPreview),
)

export default RichText
