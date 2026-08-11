import type { PickerSelectProps } from './types'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import PickerSelectInner from './picker-select.vue'

export type {
  PickerSelectOpenContext,
  PickerSelectOpenPicker,
  PickerSelectOption,
  PickerSelectProps,
} from './types'

export const PickerSelect = connect<typeof PickerSelectInner, PickerSelectProps>(
  PickerSelectInner,
  mapProps({ dataSource: 'options', loading: true, disabled: true }),
  mapReadPretty(PreviewText.Select),
)

export default PickerSelect
