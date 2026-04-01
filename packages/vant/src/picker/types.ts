import type { Field } from '@formily/core'
import type {
  PickerThemeVars,
  PickerToolbarPosition,
  PopupPosition,
  PickerProps as VanPickerProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { Numeric } from 'vant/es/utils'

export type PickerOptionValue = Numeric

export type PickerColumnsType = 'default' | 'multiple' | 'cascade'

export interface PickerFieldNames {
  text?: string
  value?: string
  children?: string
}

export interface PickerOption extends Record<string, any> {
  text?: any
  label?: any
  value?: PickerOptionValue
  name?: PickerOptionValue
  disabled?: boolean
  children?: PickerColumn
  className?: unknown
}

export type PickerOptionLike = PickerOption | PickerOptionValue

export type PickerColumn = PickerOptionLike[]

export type PickerColumns = PickerColumn | PickerColumn[]

export type PickerResolvedValue = PickerOptionValue | PickerOptionValue[] | null

export type PickerModelValue = PickerResolvedValue | undefined

export type PickerDisplayFormatter = (
  value: PickerModelValue,
  selectedOptions: Array<PickerOption | undefined>,
) => string

export interface PickerBaseEventParams {
  selectedValues: PickerOptionValue[]
  selectedOptions: Array<PickerOption | undefined>
  selectedIndexes: number[]
  field?: Field
}

export interface PickerChangeEventParams extends PickerBaseEventParams {
  columnIndex: number
}

export interface PickerConfirmEventParams extends PickerBaseEventParams {}

export interface PickerCancelEventParams extends PickerBaseEventParams {}

export interface PickerClickOptionEventParams extends PickerBaseEventParams {
  columnIndex: number
  currentOption?: PickerOption
}

export interface PickerScrollIntoEventParams {
  columnIndex: number
  currentOption?: PickerOption
  field?: Field
}

export interface PickerSlots {
  'option'?: (option: PickerOption) => any
  'title'?: () => any
  'cancel'?: () => any
  'confirm'?: () => any
  'toolbar'?: () => any
  'empty'?: () => any
  'columns-top'?: () => any
  'columns-bottom'?: () => any
}

export interface PickerProps {
  allowHtml?: VanPickerProps['allowHtml']
  cancelButtonText?: VanPickerProps['cancelButtonText']
  closeOnClickOverlay?: VanPopupProps['closeOnClickOverlay']
  closeOnPopstate?: VanPopupProps['closeOnPopstate']
  confirmButtonText?: VanPickerProps['confirmButtonText']
  modelValue?: PickerModelValue
  columns?: PickerColumns
  columnsFieldNames?: PickerFieldNames
  duration?: VanPopupProps['duration']
  lazyRender?: VanPopupProps['lazyRender']
  loading?: VanPickerProps['loading']
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
  title?: VanPickerProps['title']
  toolbarPosition?: VanPickerProps['toolbarPosition']
  transition?: VanPopupProps['transition']
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: PickerDisplayFormatter
  visibleOptionNum?: VanPickerProps['visibleOptionNum']
  zIndex?: VanPopupProps['zIndex']
}

export type {
  PickerThemeVars,
  PickerToolbarPosition,
  PopupPosition,
  VanPickerProps,
  VanPopupProps,
}
