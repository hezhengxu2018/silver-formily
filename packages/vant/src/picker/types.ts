import type {
  PickerThemeVars,
  PickerToolbarPosition,
  PopupPosition,
  PickerFieldNames as VanPickerFieldNames,
  PickerProps as VanPickerProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { Numeric } from 'vant/es/utils'

export type PickerOptionValue = Numeric

export type PickerColumnsType = 'default' | 'multiple' | 'cascade'

export type PickerFieldNames = VanPickerFieldNames

export interface PickerOption extends Record<string, any> {
  label?: any
  text?: any
  value?: PickerOptionValue
  disabled?: boolean
  children?: PickerColumn
  className?: unknown
}

export type PickerColumn = PickerOption[]

export type PickerColumns = PickerColumn | PickerColumn[]

export type PickerResolvedValue = PickerOptionValue | PickerOptionValue[] | null

export type PickerModelValue = PickerResolvedValue | undefined

export type PickerDisplayFormatter = (
  value: PickerModelValue,
  selectedOptions: Array<PickerOption | undefined>,
) => string

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

export type PickerPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export interface PickerProps {
  allowHtml?: VanPickerProps['allowHtml']
  cancelButtonText?: VanPickerProps['cancelButtonText']
  confirmButtonText?: VanPickerProps['confirmButtonText']
  modelValue?: PickerModelValue
  columns?: PickerColumns
  columnsFieldNames?: PickerFieldNames
  loading?: VanPickerProps['loading']
  optionHeight?: VanPickerProps['optionHeight']
  placeholder?: string
  popupProps?: PickerPopupProps
  separator?: string
  swipeDuration?: VanPickerProps['swipeDuration']
  title?: VanPickerProps['title']
  toolbarPosition?: VanPickerProps['toolbarPosition']
  readonly?: boolean
  disabled?: boolean
  displayFormatter?: PickerDisplayFormatter
  visibleOptionNum?: VanPickerProps['visibleOptionNum']
}

export type {
  PickerThemeVars,
  PickerToolbarPosition,
  PopupPosition,
  VanPickerProps,
  VanPopupProps,
}
