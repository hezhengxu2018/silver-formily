import type {
  DatePickerColumnType,
  PickerThemeVars,
  PopupPosition,
  DatePickerInstance as VanDatePickerInstance,
  DatePickerProps as VanDatePickerProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { PickerOption, PickerSlots } from '../picker/types'

export type DatePickerResolvedValue = string | null

export type DatePickerModelValue = DatePickerResolvedValue | undefined

export type DatePickerBoundaryValue = string

export type DatePickerDisplayFormatter = (
  value: DatePickerResolvedValue,
  selectedOptions: Array<PickerOption | undefined>,
) => string

export type DatePickerPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export interface DatePickerProps {
  allowHtml?: VanDatePickerProps['allowHtml']
  cancelButtonText?: VanDatePickerProps['cancelButtonText']
  columnsType?: VanDatePickerProps['columnsType']
  confirmButtonText?: VanDatePickerProps['confirmButtonText']
  modelValue?: DatePickerModelValue
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  loading?: VanDatePickerProps['loading']
  maxDate?: DatePickerBoundaryValue
  minDate?: DatePickerBoundaryValue
  optionHeight?: VanDatePickerProps['optionHeight']
  placeholder?: string
  popupProps?: DatePickerPopupProps
  separator?: string
  swipeDuration?: VanDatePickerProps['swipeDuration']
  title?: VanDatePickerProps['title']
  readonly?: boolean
  disabled?: boolean
  displayFormatter?: DatePickerDisplayFormatter
  valueFormat?: string
  visibleOptionNum?: VanDatePickerProps['visibleOptionNum']
}

export interface DatePickerSlots extends PickerSlots {}

export type {
  DatePickerColumnType,
  PickerOption,
  PickerThemeVars,
  PopupPosition,
  VanDatePickerInstance,
  VanDatePickerProps,
  VanPopupProps,
}
