import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FTreeSelect from './tree-select.vue'

export const TreeSelect = connect<typeof FTreeSelect>(
  FTreeSelect,
  mapProps({ readOnly: 'readonly', dataSource: 'data' }),
  mapReadPretty(PreviewText.Select),
)

export default TreeSelect
