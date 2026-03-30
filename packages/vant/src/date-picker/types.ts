import type { Field } from '@formily/core'
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

export type DatePickerDisplayFormatter = (
  value: DatePickerResolvedValue,
  selectedOptions: Array<PickerOption | undefined>,
) => string

export interface DatePickerBaseEventParams {
  selectedValues: string[]
  selectedOptions: Array<PickerOption | undefined>
  selectedIndexes: number[]
  field?: Field
}

export interface DatePickerChangeEventParams extends DatePickerBaseEventParams {
  columnIndex: number
}

export interface DatePickerConfirmEventParams extends DatePickerBaseEventParams {}

export interface DatePickerCancelEventParams extends DatePickerBaseEventParams {}

export interface DatePickerProps {
  allowHtml?: VanDatePickerProps['allowHtml']
  cancelButtonText?: VanDatePickerProps['cancelButtonText']
  closeOnClickOverlay?: VanPopupProps['closeOnClickOverlay']
  closeOnPopstate?: VanPopupProps['closeOnPopstate']
  columnsType?: VanDatePickerProps['columnsType']
  confirmButtonText?: VanDatePickerProps['confirmButtonText']
  modelValue?: DatePickerModelValue
  duration?: VanPopupProps['duration']
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  lazyRender?: VanPopupProps['lazyRender']
  loading?: VanDatePickerProps['loading']
  lockScroll?: VanPopupProps['lockScroll']
  maxDate?: VanDatePickerProps['maxDate']
  minDate?: VanDatePickerProps['minDate']
  optionHeight?: VanDatePickerProps['optionHeight']
  overlay?: VanPopupProps['overlay']
  placeholder?: string
  position?: VanPopupProps['position']
  round?: VanPopupProps['round']
  safeAreaInsetBottom?: VanPopupProps['safeAreaInsetBottom']
  safeAreaInsetTop?: VanPopupProps['safeAreaInsetTop']
  separator?: string
  swipeDuration?: VanDatePickerProps['swipeDuration']
  teleport?: VanPopupProps['teleport']
  title?: VanDatePickerProps['title']
  transition?: VanPopupProps['transition']
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: DatePickerDisplayFormatter
  valueFormat?: string
  visibleOptionNum?: VanDatePickerProps['visibleOptionNum']
  zIndex?: VanPopupProps['zIndex']
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
