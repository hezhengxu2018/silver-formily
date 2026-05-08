import type {
  AreaList,
  PickerOption,
  PickerThemeVars,
  PopupPosition,
  AreaInstance as VanAreaInstance,
  AreaProps as VanAreaProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { Numeric } from 'vant/es/utils'

export type AreaCode = string

export type AreaResolvedValue = AreaCode | null

export type AreaModelValue = AreaResolvedValue | Numeric | undefined

export type AreaPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export interface AreaConfirmEventParams {
  selectedValues: Numeric[]
  selectedOptions: Array<PickerOption | undefined>
  selectedIndexes: number[]
}

export type AreaCancelEventParams = AreaConfirmEventParams

export interface AreaChangeEventParams extends AreaConfirmEventParams {
  columnIndex: number
}

export type AreaDisplayFormatter = (
  value: AreaResolvedValue,
  selectedOptions: Array<PickerOption | undefined>,
) => string

export interface AreaSlots {
  'title'?: () => any
  'cancel'?: () => any
  'confirm'?: () => any
  'toolbar'?: () => any
  'columns-top'?: () => any
  'columns-bottom'?: () => any
}

export interface AreaProps {
  areaList?: AreaList
  cancelButtonText?: VanAreaProps['cancelButtonText']
  columnsNum?: VanAreaProps['columnsNum']
  columnsPlaceholder?: VanAreaProps['columnsPlaceholder']
  confirmButtonText?: VanAreaProps['confirmButtonText']
  modelValue?: AreaModelValue
  loading?: VanAreaProps['loading']
  optionHeight?: VanAreaProps['optionHeight']
  placeholder?: string
  popupProps?: AreaPopupProps
  separator?: string
  swipeDuration?: VanAreaProps['swipeDuration']
  title?: VanAreaProps['title']
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: AreaDisplayFormatter
  visibleOptionNum?: VanAreaProps['visibleOptionNum']
}

export type {
  AreaList,
  PickerThemeVars as AreaThemeVars,
  PopupPosition,
  VanAreaInstance,
  VanAreaProps,
  VanPopupProps,
}
