import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FPicker from './picker.vue'

export const Picker = connect<typeof FPicker>(
  FPicker,
  mapProps({
    dataSource: 'columns',
    disabled: true,
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Picker),
)

export default Picker

export type {
  PickerBaseEventParams,
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerClickOptionEventParams,
  PickerColumn,
  PickerColumns,
  PickerColumnsType,
  PickerDisplayFormatter,
  PickerFieldNames,
  PickerModelValue,
  PickerOption,
  PickerOptionLike,
  PickerOptionValue,
  PickerProps,
  PickerResolvedValue,
  PickerScrollIntoEventParams,
  PickerSlots,
  PickerThemeVars,
  PickerToolbarPosition,
  PopupPosition,
  VanPickerProps,
  VanPopupProps,
} from './types'
