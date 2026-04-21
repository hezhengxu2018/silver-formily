import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FPicker from './picker.vue'

export const Picker = connect<typeof FPicker>(
  FPicker,
  mapProps({
    dataSource: 'columns',
    disabled: true,
    readOnly: 'readonly',
    loading: true,
  }),
  mapReadPretty(PreviewText.Picker),
)

export default Picker

export type {
  PickerColumn,
  PickerColumns,
  PickerColumnsType,
  PickerDisplayFormatter,
  PickerFieldNames,
  PickerModelValue,
  PickerOption,
  PickerOptionLike,
  PickerOptionValue,
  PickerPopupProps,
  PickerProps,
  PickerResolvedValue,
  PickerSlots,
  PickerThemeVars,
  PickerToolbarPosition,
  PopupPosition,
  VanPickerProps,
  VanPopupProps,
} from './types'
