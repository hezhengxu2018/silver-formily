import type { VueComponentProps } from '@silver-formily/vue'
import type { ElMention } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FMention from './mention.vue'

export type MentionProps = VueComponentProps<typeof ElMention>
export type MentionComponent = typeof ElMention

export const Mention = connect<typeof FMention, MentionProps>(
  FMention,
  mapProps({ dataSource: 'options', readOnly: 'readonly', loading: true, disabled: true }),
  mapReadPretty(PreviewText.Input),
)

export default Mention
