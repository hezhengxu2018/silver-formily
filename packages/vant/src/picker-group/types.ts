import type { Field } from '@formily/core'
import type {
  PickerGroupThemeVars,
  PopupPosition,
  PickerGroupProps as VanPickerGroupProps,
  PickerProps as VanPickerProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { PickerColumn, PickerFieldNames, PickerOption, PickerOptionValue } from '../picker/types'

export interface PickerGroupDataSourceItem {
  title: string
  options?: PickerColumn
}

export type PickerGroupDataSource = PickerGroupDataSourceItem[]

export type PickerGroupValueItem = PickerOptionValue | PickerOptionValue[]

export type PickerGroupSelectedOptionItem = PickerOption | Array<PickerOption | undefined> | undefined

export type PickerGroupSelectedIndexItem = number | number[]

export type PickerGroupResolvedValue = PickerGroupValueItem[] | null

export type PickerGroupModelValue = PickerGroupResolvedValue | undefined

export type PickerGroupDisplayFormatter = (
  value: PickerGroupResolvedValue,
  selectedOptions: PickerGroupSelectedOptionItem[],
) => string

export interface PickerGroupBaseEventParams {
  selectedValues: PickerGroupValueItem[]
  selectedOptions: PickerGroupSelectedOptionItem[]
  selectedIndexes: PickerGroupSelectedIndexItem[]
  field?: Field
}

export interface PickerGroupChangeEventParams extends PickerGroupBaseEventParams {
  tabIndex: number
}

export interface PickerGroupConfirmEventParams extends PickerGroupBaseEventParams {}

export interface PickerGroupCancelEventParams extends PickerGroupBaseEventParams {}

export interface PickerGroupClickOptionEventParams extends PickerGroupBaseEventParams {
  tabIndex: number
  currentOption?: PickerOption
}

export interface PickerGroupScrollIntoEventParams {
  tabIndex: number
  currentOption?: PickerOption
  field?: Field
}

export interface PickerGroupDefaultSlotProps {
  activeTab: number
  modelValue: PickerGroupResolvedValue
  setActiveTab: (value: number | string) => void
  setValue: (index: number, value: PickerGroupValueItem | undefined) => void
  values: Array<PickerGroupValueItem | undefined>
}

export interface PickerGroupSlots {
  default?: (props: PickerGroupDefaultSlotProps) => any
  option?: (option: PickerOption) => any
  title?: () => any
  cancel?: () => any
  confirm?: () => any
  toolbar?: () => any
  empty?: () => any
}

export interface PickerGroupProps {
  allowHtml?: VanPickerProps['allowHtml']
  cancelButtonText?: VanPickerGroupProps['cancelButtonText']
  closeOnClickOverlay?: VanPopupProps['closeOnClickOverlay']
  closeOnPopstate?: VanPopupProps['closeOnPopstate']
  confirmButtonText?: VanPickerGroupProps['confirmButtonText']
  modelValue?: PickerGroupModelValue
  dataSource?: PickerGroupDataSource
  columnsFieldNames?: PickerFieldNames
  duration?: VanPopupProps['duration']
  lazyRender?: VanPopupProps['lazyRender']
  lockScroll?: VanPopupProps['lockScroll']
  optionHeight?: VanPickerProps['optionHeight']
  overlay?: VanPopupProps['overlay']
  placeholder?: string
  position?: VanPopupProps['position']
  round?: VanPopupProps['round']
  safeAreaInsetBottom?: VanPopupProps['safeAreaInsetBottom']
  safeAreaInsetTop?: VanPopupProps['safeAreaInsetTop']
  separator?: string
  swipeDuration?: VanPickerProps['swipeDuration']
  teleport?: VanPopupProps['teleport']
  title?: VanPickerGroupProps['title']
  transition?: VanPopupProps['transition']
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: PickerGroupDisplayFormatter
  visibleOptionNum?: VanPickerProps['visibleOptionNum']
  zIndex?: VanPopupProps['zIndex']
}

export type {
  PickerGroupThemeVars,
  PopupPosition,
  VanPickerGroupProps,
  VanPickerProps,
  VanPopupProps,
}
