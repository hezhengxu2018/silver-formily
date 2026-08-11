import type { VueComponentProps } from '@silver-formily/vue'
import type { ElTreeSelect } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FTreeSelect from './tree-select.vue'

export type TreeSelectProps = VueComponentProps<typeof ElTreeSelect>
export type TreeSelectComponent = typeof ElTreeSelect

export const TreeSelect = connect<typeof FTreeSelect, TreeSelectProps>(
  FTreeSelect,
  mapProps({ readOnly: 'readonly', dataSource: 'data' }),
  mapReadPretty(PreviewText.TreeSelect),
)

export default TreeSelect
