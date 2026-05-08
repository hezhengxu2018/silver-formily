import type {
  PickerThemeVars,
  PickerInstance as VanPickerInstance,
  PickerProps as VanPickerProps,
} from 'vant'
import type {
  PickerColumns,
  PickerFieldNames,
  PickerModelValue,
  PickerResolvedValue,
  PickerSlots,
} from '../picker/types'

export type PickerPanelResolvedValue = PickerResolvedValue

export type PickerPanelModelValue = PickerModelValue

export interface PickerPanelSlots extends PickerSlots {}

export interface PickerPanelProps {
  allowHtml?: VanPickerProps['allowHtml']
  cancelButtonText?: VanPickerProps['cancelButtonText']
  columns?: PickerColumns
  columnsFieldNames?: PickerFieldNames
  confirmButtonText?: VanPickerProps['confirmButtonText']
  modelValue?: PickerPanelModelValue
  loading?: VanPickerProps['loading']
  optionHeight?: VanPickerProps['optionHeight']
  readonly?: boolean
  disabled?: boolean
  showToolbar?: VanPickerProps['showToolbar']
  swipeDuration?: VanPickerProps['swipeDuration']
  title?: VanPickerProps['title']
  toolbarPosition?: VanPickerProps['toolbarPosition']
  visibleOptionNum?: VanPickerProps['visibleOptionNum']
}

export type {
  PickerThemeVars as PickerPanelThemeVars,
  VanPickerInstance as VanPickerPanelInstance,
  VanPickerProps as VanPickerPanelProps,
}
