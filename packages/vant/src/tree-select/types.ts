import type {
  PopupPosition,
  TreeSelectChild,
  TreeSelectItem,
  TreeSelectThemeVars,
  PickerProps as VanPickerProps,
  PopupProps as VanPopupProps,
  TreeSelectProps as VanTreeSelectProps,
} from 'vant'
import type { Numeric } from 'vant/es/utils'

export type TreeSelectValue = Numeric | Numeric[]

export type TreeSelectResolvedValue = TreeSelectValue | undefined

export type TreeSelectPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export type TreeSelectDisplayFormatter = (
  value: TreeSelectResolvedValue,
  selectedOptions: TreeSelectChild[],
) => string

export interface TreeSelectPanelProps extends Partial<Pick<VanTreeSelectProps, 'height' | 'items' | 'max' | 'selectedIcon'>> {
  cancelButtonText?: VanPickerProps['cancelButtonText']
  confirmButtonText?: VanPickerProps['confirmButtonText']
  modelValue?: TreeSelectResolvedValue
  showToolbar?: boolean
  title?: VanPickerProps['title']
}

export interface TreeSelectProps extends Partial<Pick<VanTreeSelectProps, 'height' | 'items' | 'max' | 'selectedIcon'>> {
  cancelButtonText?: VanPickerProps['cancelButtonText']
  confirmButtonText?: VanPickerProps['confirmButtonText']
  displayFormatter?: TreeSelectDisplayFormatter
  modelValue?: TreeSelectValue
  placeholder?: string
  popupProps?: TreeSelectPopupProps
  disabled?: boolean
  readonly?: boolean
  title?: VanPickerProps['title']
}

export interface TreeSelectNavTextSlotProps {
  item: TreeSelectItem
  index: number
}

export type {
  PopupPosition,
  TreeSelectChild,
  TreeSelectItem,
  TreeSelectThemeVars,
  VanPickerProps,
  VanPopupProps,
  VanTreeSelectProps,
}
