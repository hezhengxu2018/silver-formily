import type { VueComponentProps } from '@silver-formily/vue'
import type { ElSegmented } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FSegmented from './segmented.vue'

export type SegmentedProps = VueComponentProps<typeof ElSegmented>
export type SegmentedComponent = typeof ElSegmented

export const Segmented = connect<typeof FSegmented, SegmentedProps>(
  FSegmented,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Select),
)

export default Segmented
