import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FTreeSelect from './tree-select.vue'

export const TreeSelect = connect<typeof FTreeSelect>(
  FTreeSelect,
  mapProps({
    dataSource: 'items',
    disabled: true,
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.TreeSelect),
)

export default TreeSelect

export type {
  TreeSelectChild,
  TreeSelectDisplayFormatter,
  TreeSelectItem,
  TreeSelectNavTextSlotProps,
  TreeSelectPanelProps,
  TreeSelectPopupProps,
  TreeSelectProps,
  TreeSelectResolvedValue,
  TreeSelectThemeVars,
  TreeSelectValue,
  VanPickerProps,
  VanPopupProps,
  VanTreeSelectProps,
} from './types'
