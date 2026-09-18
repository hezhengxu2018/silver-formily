import type { VueComponentProps } from '@silver-formily/vue'
import type { ElSegmented } from 'element-plus'
import type { OptionValueProps } from '../__builtins__/shared/option-value'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FSegmented from './segmented.vue'

export type SegmentedProps = OptionValueProps & Omit<VueComponentProps<typeof ElSegmented>, 'modelValue'> & { modelValue?: any }
export type SegmentedComponent = typeof ElSegmented

export const Segmented = connect<typeof FSegmented, SegmentedProps>(
  FSegmented,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Select),
)

export default Segmented
