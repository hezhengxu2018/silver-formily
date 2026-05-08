import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FPickerGroupPanel from './picker-group-panel.vue'
import FPickerGroup from './picker-group.vue'

export const PickerGroupPanel = connect<typeof FPickerGroupPanel>(
  FPickerGroupPanel,
  mapProps({
    dataSource: 'dataSource',
    disabled: true,
  }),
  mapReadPretty(PreviewText.PickerGroup),
)

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
  PickerGroupConfirmEventParams,
  PickerGroupDataSource,
  PickerGroupDataSourceItem,
  PickerGroupDefaultSlotProps,
  PickerGroupDisplayFormatter,
  PickerGroupModelValue,
  PickerGroupPanelItemProps,
  PickerGroupPanelProps,
  PickerGroupPopupProps,
  PickerGroupProps,
  PickerGroupResolvedValue,
  PickerGroupSlots,
  PickerGroupThemeVars,
  PickerGroupValueItem,
  PopupPosition,
  VanPickerGroupProps,
  VanPickerProps,
  VanPopupProps,
} from './types'
