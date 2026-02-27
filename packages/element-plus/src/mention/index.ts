import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FMention from './mention.vue'

export const Mention = connect<typeof FMention>(
  FMention,
  mapProps({ dataSource: 'options', readOnly: 'readonly', loading: true, disabled: true }),
  mapReadPretty(PreviewText.Input),
)

export default Mention
