import type {
  PickerThemeVars,
  PopupPosition,
  TimePickerColumnType,
  PopupProps as VanPopupProps,
  TimePickerInstance as VanTimePickerInstance,
  TimePickerProps as VanTimePickerProps,
} from 'vant'
import type { PickerOption, PickerSlots } from '../picker/types'

export type TimePickerResolvedValue = string | null

export type TimePickerModelValue = TimePickerResolvedValue | undefined

export type TimePickerDisplayFormatter = (
  value: TimePickerResolvedValue,
  selectedOptions: Array<PickerOption | undefined>,
) => string

export type TimePickerPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export interface TimePickerProps {
  allowHtml?: VanTimePickerProps['allowHtml']
  cancelButtonText?: VanTimePickerProps['cancelButtonText']
  columnsType?: VanTimePickerProps['columnsType']
  confirmButtonText?: VanTimePickerProps['confirmButtonText']
  modelValue?: TimePickerModelValue
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
  placeholder?: string
  popupProps?: TimePickerPopupProps
  disableTriggerWhenInactive?: boolean
  swipeDuration?: VanTimePickerProps['swipeDuration']
  title?: VanTimePickerProps['title']
  readonly?: boolean
  disabled?: boolean
  displayFormatter?: TimePickerDisplayFormatter
  valueFormat?: string
  visibleOptionNum?: VanTimePickerProps['visibleOptionNum']
}

export interface TimePickerSlots extends PickerSlots {}

export type {
  PickerOption,
  PickerThemeVars,
  PopupPosition,
  TimePickerColumnType,
  VanPopupProps,
  VanTimePickerInstance,
  VanTimePickerProps,
}
