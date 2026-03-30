import type { Field } from '@formily/core'
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

export interface TimePickerBaseEventParams {
  selectedValues: string[]
  selectedOptions: Array<PickerOption | undefined>
  selectedIndexes: number[]
  field?: Field
}

export interface TimePickerChangeEventParams extends TimePickerBaseEventParams {
  columnIndex: number
}

export interface TimePickerConfirmEventParams extends TimePickerBaseEventParams {}

export interface TimePickerCancelEventParams extends TimePickerBaseEventParams {}

export interface TimePickerProps {
  allowHtml?: VanTimePickerProps['allowHtml']
  cancelButtonText?: VanTimePickerProps['cancelButtonText']
  closeOnClickOverlay?: VanPopupProps['closeOnClickOverlay']
  closeOnPopstate?: VanPopupProps['closeOnPopstate']
  columnsType?: VanTimePickerProps['columnsType']
  confirmButtonText?: VanTimePickerProps['confirmButtonText']
  modelValue?: TimePickerModelValue
  duration?: VanPopupProps['duration']
  filter?: VanTimePickerProps['filter']
  format?: string
  formatter?: VanTimePickerProps['formatter']
  lazyRender?: VanPopupProps['lazyRender']
  loading?: VanTimePickerProps['loading']
  lockScroll?: VanPopupProps['lockScroll']
  maxHour?: VanTimePickerProps['maxHour']
  maxMinute?: VanTimePickerProps['maxMinute']
  maxSecond?: VanTimePickerProps['maxSecond']
  maxTime?: VanTimePickerProps['maxTime']
  minHour?: VanTimePickerProps['minHour']
  minMinute?: VanTimePickerProps['minMinute']
  minSecond?: VanTimePickerProps['minSecond']
  minTime?: VanTimePickerProps['minTime']
  optionHeight?: VanTimePickerProps['optionHeight']
  overlay?: VanPopupProps['overlay']
  placeholder?: string
  position?: VanPopupProps['position']
  round?: VanPopupProps['round']
  safeAreaInsetBottom?: VanPopupProps['safeAreaInsetBottom']
  safeAreaInsetTop?: VanPopupProps['safeAreaInsetTop']
  separator?: string
  swipeDuration?: VanTimePickerProps['swipeDuration']
  teleport?: VanPopupProps['teleport']
  title?: VanTimePickerProps['title']
  transition?: VanPopupProps['transition']
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: TimePickerDisplayFormatter
  valueFormat?: string
  visibleOptionNum?: VanTimePickerProps['visibleOptionNum']
  zIndex?: VanPopupProps['zIndex']
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
