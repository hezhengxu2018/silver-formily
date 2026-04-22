import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FCascader from './cascader.vue'

export const Cascader = connect<typeof FCascader>(
  FCascader,
  mapProps({
    dataSource: 'options',
    disabled: true,
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Cascader),
)

export default Cascader

export type {
  CascaderChangeEvent,
  CascaderDisplayFormatter,
  CascaderFieldNames,
  CascaderModelValue,
  CascaderOption,
  CascaderOptionSlotProps,
  CascaderOptionValue,
  CascaderPopupCascaderProps,
  CascaderPopupContentProps,
  CascaderPopupProps,
  CascaderProps,
  CascaderResolvedValue,
  CascaderSlots,
  CascaderTabSlotProps,
  CascaderThemeVars,
  PopupPosition,
  VanCascaderProps,
  VanPopupProps,
} from './types'
