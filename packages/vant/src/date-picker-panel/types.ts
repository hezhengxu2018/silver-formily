import type {
  DatePickerColumnType,
  PickerThemeVars,
  DatePickerInstance as VanDatePickerInstance,
  DatePickerProps as VanDatePickerProps,
} from 'vant'
import type {
  DatePickerBoundaryValue,
  DatePickerModelValue,
  DatePickerResolvedValue,
  DatePickerSlots,
} from '../date-picker/types'

export type DatePickerPanelResolvedValue = DatePickerResolvedValue

export type DatePickerPanelModelValue = DatePickerModelValue

export type DatePickerPanelBoundaryValue = DatePickerBoundaryValue

export type DatePickerPanelColumnType = DatePickerColumnType

export interface DatePickerPanelSlots extends DatePickerSlots {}

export interface DatePickerPanelProps {
  allowHtml?: VanDatePickerProps['allowHtml']
  cancelButtonText?: VanDatePickerProps['cancelButtonText']
  columnsType?: VanDatePickerProps['columnsType']
  confirmButtonText?: VanDatePickerProps['confirmButtonText']
  modelValue?: DatePickerPanelModelValue
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  loading?: VanDatePickerProps['loading']
  maxDate?: DatePickerPanelBoundaryValue
  minDate?: DatePickerPanelBoundaryValue
  optionHeight?: VanDatePickerProps['optionHeight']
  readonly?: boolean
  disabled?: boolean
  separator?: string
  showToolbar?: boolean
  swipeDuration?: VanDatePickerProps['swipeDuration']
  title?: VanDatePickerProps['title']
  valueFormat?: string
  visibleOptionNum?: VanDatePickerProps['visibleOptionNum']
}

export type {
  PickerThemeVars as DatePickerPanelThemeVars,
  VanDatePickerInstance as VanDatePickerPanelInstance,
  VanDatePickerProps as VanDatePickerPanelProps,
}
