import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FPickerGroup from './picker-group.vue'

export const PickerGroup = connect<typeof FPickerGroup>(
  FPickerGroup,
  mapProps({
    dataSource: 'dataSource',
    disabled: true,
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.PickerGroup),
)

export default PickerGroup

export type {
  PickerGroupBaseEventParams,
  PickerGroupCancelEventParams,
  PickerGroupChangeEventParams,
  PickerGroupClickOptionEventParams,
  PickerGroupConfirmEventParams,
  PickerGroupDataSource,
  PickerGroupDataSourceItem,
  PickerGroupDefaultSlotProps,
  PickerGroupDisplayFormatter,
  PickerGroupModelValue,
  PickerGroupProps,
  PickerGroupResolvedValue,
  PickerGroupScrollIntoEventParams,
  PickerGroupSelectedIndexItem,
  PickerGroupSelectedOptionItem,
  PickerGroupSlots,
  PickerGroupThemeVars,
  PickerGroupValueItem,
  PopupPosition,
  VanPickerGroupProps,
  VanPickerProps,
  VanPopupProps,
} from './types'
