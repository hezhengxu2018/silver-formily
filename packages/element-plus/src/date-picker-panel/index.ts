import { connect, mapProps } from '@silver-formily/vue'
import { ElDatePickerPanel } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { getDefaultFormat } from '../date-picker/utils'
import { PreviewText } from '../preview-text'

export const DatePickerPanel = connect<typeof ElDatePickerPanel>(
  ElDatePickerPanel,
  mapProps(
    {
      disabled: true,
      editable: true,
    },
    (props: any) => {
      const next: Record<string, any> = {}

      if (props.readOnly) {
        next.editable = false
      }

      if (!props.valueFormat) {
        next.valueFormat = getDefaultFormat(props.type, 'valueFormat')
      }

      if (!props.dateFormat) {
        next.dateFormat = getDefaultFormat(props.type)
      }

      return {
        ...props,
        ...next,
      }
    },
  ),
  mapReadPretty(PreviewText.DatePicker),
)

export default DatePickerPanel
