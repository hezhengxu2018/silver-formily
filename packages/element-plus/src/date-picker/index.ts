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
    (props: any, field) => {
      return {
        ...props,
        // HACK: https://github.com/element-plus/element-plus/issues/24697
        disabledDate: (time: Date) => {
          const disabledDate
            = field.componentProps?.disabledDate
              ?? field.componentProps?.['disabled-date']
          return typeof disabledDate === 'function' && disabledDate(time)
        },
        format: props.format || getDefaultFormat(props.type),
        valueFormat:
          props.valueFormat || getDefaultFormat(props.type, 'valueFormat'),
      }
    },
  ),
  mapReadPretty(PreviewText.DatePicker),
)

export default DatePicker
