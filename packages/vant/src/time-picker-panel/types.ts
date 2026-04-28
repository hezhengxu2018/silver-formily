import type {
  PickerThemeVars,
  TimePickerColumnType,
  TimePickerInstance as VanTimePickerInstance,
  TimePickerProps as VanTimePickerProps,
} from 'vant'
import type {
  TimePickerModelValue,
  TimePickerResolvedValue,
  TimePickerSlots,
} from '../time-picker/types'

export type TimePickerPanelResolvedValue = TimePickerResolvedValue

export type TimePickerPanelModelValue = TimePickerModelValue

export type TimePickerPanelColumnType = TimePickerColumnType

export interface TimePickerPanelSlots extends TimePickerSlots {}

export interface TimePickerPanelProps {
  allowHtml?: VanTimePickerProps['allowHtml']
  cancelButtonText?: VanTimePickerProps['cancelButtonText']
  columnsType?: VanTimePickerProps['columnsType']
  confirmButtonText?: VanTimePickerProps['confirmButtonText']
  modelValue?: TimePickerPanelModelValue
  filter?: VanTimePickerProps['filter']
  format?: string
  formatter?: VanTimePickerProps['formatter']
  loading?: VanTimePickerProps['loading']
  maxHour?: VanTimePickerProps['maxHour']
  maxMinute?: VanTimePickerProps['maxMinute']
  maxSecond?: VanTimePickerProps['maxSecond']
  maxTime?: VanTimePickerProps['maxTime']
  minHour?: VanTimePickerProps['minHour']
  minMinute?: VanTimePickerProps['minMinute']
  minSecond?: VanTimePickerProps['minSecond']
  minTime?: VanTimePickerProps['minTime']
  optionHeight?: VanTimePickerProps['optionHeight']
  readonly?: boolean
  disabled?: boolean
  separator?: string
  showToolbar?: boolean
  swipeDuration?: VanTimePickerProps['swipeDuration']
  title?: VanTimePickerProps['title']
  valueFormat?: string
  visibleOptionNum?: VanTimePickerProps['visibleOptionNum']
}

export type {
  PickerThemeVars as TimePickerPanelThemeVars,
  VanTimePickerInstance as VanTimePickerPanelInstance,
  VanTimePickerProps as VanTimePickerPanelProps,
}
