import { connect, mapProps } from '@silver-formily/vue'
import { ElTimePicker } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type TimePickerProps = typeof ElTimePicker

export const TimePicker = connect<typeof ElTimePicker>(
  ElTimePicker,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.TimePicker),
)

export default TimePicker
