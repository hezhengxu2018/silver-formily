import type { CalendarDisplayFormatter, CalendarModelValue, CalendarType } from '../calendar/types'
import type {
  CascaderDisplayFormatter,
  CascaderFieldNames,
  CascaderModelValue,
  CascaderOption,
} from '../cascader/types'
import type {
  PickerColumns,
  PickerDisplayFormatter,
  PickerFieldNames,
  PickerModelValue,
} from '../picker/types'

export interface PreviewTextProps {
  placeholder?: string
}

export interface PreviewTextInputProps {
  modelValue?: any
}

export interface PreviewTextSelectProps {
  modelValue?: any
}

export interface PreviewTextCalendarProps {
  modelValue?: CalendarModelValue
  type?: CalendarType
  placeholder?: string
  displayFormatter?: CalendarDisplayFormatter
}

export interface PreviewTextCascaderProps {
  modelValue?: CascaderModelValue
  options?: CascaderOption[]
  placeholder?: string
  separator?: string
  fieldNames?: CascaderFieldNames
  displayFormatter?: CascaderDisplayFormatter
}

export interface PreviewTextPickerProps {
  modelValue?: PickerModelValue
  columns?: PickerColumns
  columnsFieldNames?: PickerFieldNames
  placeholder?: string
  separator?: string
  displayFormatter?: PickerDisplayFormatter
}
