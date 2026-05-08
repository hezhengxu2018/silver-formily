import type { Field } from '@formily/core'
import type {
  PickerGroupThemeVars,
  PopupPosition,
  PickerGroupProps as VanPickerGroupProps,
  PickerProps as VanPickerProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { PickerColumn, PickerFieldNames, PickerOptionValue } from '../picker/types'

export interface PickerGroupDataSourceItem {
  title: string
  options?: PickerColumn
}

export type PickerGroupDataSource = PickerGroupDataSourceItem[]

export type PickerGroupValueItem = PickerOptionValue | PickerOptionValue[]

export type PickerGroupResolvedValue = PickerGroupValueItem[] | null

export type PickerGroupModelValue = PickerGroupResolvedValue | undefined

export type PickerGroupDisplayFormatter = (
  value: PickerGroupResolvedValue,
) => string

export interface PickerGroupBaseEventParams {
  selectedValues: PickerGroupValueItem[]
  field?: Field
}

export interface PickerGroupConfirmEventParams extends PickerGroupBaseEventParams {}

export interface PickerGroupCancelEventParams extends PickerGroupBaseEventParams {}

export interface PickerGroupDefaultSlotProps {
  dataSource: PickerGroupDataSource
  modelValue: PickerGroupResolvedValue
  panelProps: PickerGroupPanelItemProps[]
  setValue: (index: number, value: PickerGroupValueItem | undefined) => void
  values: Array<PickerGroupValueItem | undefined>
}

export interface PickerGroupPanelItemProps {
  'allowHtml'?: VanPickerProps['allowHtml']
  'disabled': boolean
  'modelValue': PickerGroupValueItem | undefined
  'onConfirm': (value: unknown) => void
  'onUpdate:modelValue': (value: unknown) => void
  'optionHeight'?: VanPickerProps['optionHeight']
  'readonly': boolean
  'showToolbar': boolean
  'swipeDuration'?: VanPickerProps['swipeDuration']
  'visibleOptionNum'?: VanPickerProps['visibleOptionNum']
}

export interface PickerGroupPanelProps {
  allowHtml?: VanPickerProps['allowHtml']
  cancelButtonText?: VanPickerGroupProps['cancelButtonText']
  columnsFieldNames?: PickerFieldNames
  confirmButtonText?: VanPickerGroupProps['confirmButtonText']
  modelValue?: PickerGroupModelValue
  dataSource?: PickerGroupDataSource
  tabs?: VanPickerGroupProps['tabs']
  nextStepText?: VanPickerGroupProps['nextStepText']
  optionHeight?: VanPickerProps['optionHeight']
  swipeDuration?: VanPickerProps['swipeDuration']
  title?: VanPickerGroupProps['title']
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  visibleOptionNum?: VanPickerProps['visibleOptionNum']
}

export interface PickerGroupSlots {
  default?: (props: PickerGroupDefaultSlotProps) => any
  title?: () => any
  cancel?: () => any
  confirm?: () => any
  toolbar?: () => any
}

export type PickerGroupPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export interface PickerGroupProps {
  allowHtml?: VanPickerProps['allowHtml']
  cancelButtonText?: VanPickerGroupProps['cancelButtonText']
  closeOnClickOverlay?: VanPopupProps['closeOnClickOverlay']
  closeOnPopstate?: VanPopupProps['closeOnPopstate']
  confirmButtonText?: VanPickerGroupProps['confirmButtonText']
  modelValue?: PickerGroupModelValue
  dataSource?: PickerGroupDataSource
  tabs?: VanPickerGroupProps['tabs']
  columnsFieldNames?: PickerFieldNames
  duration?: VanPopupProps['duration']
  lazyRender?: VanPopupProps['lazyRender']
  lockScroll?: VanPopupProps['lockScroll']
  nextStepText?: VanPickerGroupProps['nextStepText']
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
  popupProps?: PickerGroupPopupProps
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
