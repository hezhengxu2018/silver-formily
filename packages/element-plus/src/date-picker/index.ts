import { connect, mapProps } from '@silver-formily/vue'
import { ElDatePicker } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import { getDefaultFormat } from './utils'

export const DatePicker = connect<typeof ElDatePicker>(
  ElDatePicker,
  mapProps(
    {
      readOnly: 'readonly',
      disabled: true,
      editable: true,
    },
    (props: any) => {
      return {
        ...props,
        format: props.format || getDefaultFormat(props.type),
        valueFormat:
          props.valueFormat || getDefaultFormat(props.type, 'valueFormat'),
      }
    },
  ),
  mapReadPretty(PreviewText.DatePicker),
)

export default DatePicker
