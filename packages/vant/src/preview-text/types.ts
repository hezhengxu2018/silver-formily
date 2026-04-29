import type { RateProps as VanRateProps, SliderProps as VanSliderProps, SwitchProps as VanSwitchProps } from 'vant'
import type { AreaDisplayFormatter, AreaList, AreaModelValue, VanAreaProps } from '../area/types'
import type { CalendarDisplayFormatter, CalendarModelValue, CalendarType } from '../calendar/types'
import type {
  CascaderDisplayFormatter,
  CascaderFieldNames,
  CascaderModelValue,
  CascaderOption,
} from '../cascader/types'
import type {
  DatePickerBoundaryValue,
  DatePickerColumnType,
  DatePickerDisplayFormatter,
  DatePickerModelValue,
  VanDatePickerProps,
} from '../date-picker/types'
import type {
  PickerGroupDataSource,
  PickerGroupDisplayFormatter,
  PickerGroupModelValue,
} from '../picker-group/types'
import type {
  PickerColumns,
  PickerDisplayFormatter,
  PickerFieldNames,
  PickerModelValue,
} from '../picker/types'
import type { SignatureModelValue } from '../signature/types'
import type {
  TimePickerColumnType,
  TimePickerDisplayFormatter,
  TimePickerModelValue,
  VanTimePickerProps,
} from '../time-picker/types'

export interface PreviewTextProps {
  placeholder?: string
}

export interface PreviewTextInputProps {
  formatter?: (value: any) => string
  modelValue?: any
}

export interface PreviewTextRateProps {
  modelValue?: VanRateProps['modelValue'] | null | undefined
}

export interface PreviewTextSwitchProps {
  modelValue?: VanSwitchProps['modelValue']
  activeValue?: VanSwitchProps['activeValue']
  inactiveValue?: VanSwitchProps['inactiveValue']
}

export interface PreviewTextSliderProps {
  modelValue?: VanSliderProps['modelValue'] | null | undefined
}

export interface PreviewTextSelectProps {
  modelValue?: any
}

export interface PreviewTextSignatureProps {
  modelValue?: SignatureModelValue
}

export interface PreviewTextUploadProps {
  modelValue?: any
}

export interface PreviewTextAreaProps {
  modelValue?: AreaModelValue
  areaList?: AreaList
  columnsNum?: VanAreaProps['columnsNum']
  columnsPlaceholder?: VanAreaProps['columnsPlaceholder']
  placeholder?: string
  separator?: string
  displayFormatter?: AreaDisplayFormatter
}

export interface PreviewTextCalendarProps {
  modelValue?: CalendarModelValue
  type?: CalendarType
  format?: string
  valueFormat?: string
  placeholder?: string
  displayFormatter?: CalendarDisplayFormatter
}

export interface PreviewTextDatePickerProps {
  modelValue?: DatePickerModelValue
  columnsType?: DatePickerColumnType[]
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  maxDate?: DatePickerBoundaryValue
  minDate?: DatePickerBoundaryValue
  placeholder?: string
  separator?: string
  displayFormatter?: DatePickerDisplayFormatter
  valueFormat?: string
}

export interface PreviewTextTimePickerProps {
  modelValue?: TimePickerModelValue
  columnsType?: TimePickerColumnType[]
  filter?: VanTimePickerProps['filter']
  format?: string
  formatter?: VanTimePickerProps['formatter']
  maxHour?: VanTimePickerProps['maxHour']
  maxMinute?: VanTimePickerProps['maxMinute']
  maxSecond?: VanTimePickerProps['maxSecond']
  maxTime?: VanTimePickerProps['maxTime']
  minHour?: VanTimePickerProps['minHour']
  minMinute?: VanTimePickerProps['minMinute']
  minSecond?: VanTimePickerProps['minSecond']
  minTime?: VanTimePickerProps['minTime']
  placeholder?: string
  displayFormatter?: TimePickerDisplayFormatter
  valueFormat?: string
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

export interface PreviewTextPickerGroupProps {
  modelValue?: PickerGroupModelValue
  dataSource?: PickerGroupDataSource
  columnsFieldNames?: PickerFieldNames
  placeholder?: string
  separator?: string
  displayFormatter?: PickerGroupDisplayFormatter
}
