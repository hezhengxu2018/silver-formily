import type {
  AreaList,
  PickerThemeVars,
  AreaInstance as VanAreaPanelInstance,
  AreaProps as VanAreaPanelProps,
} from 'vant'
import type {
  AreaModelValue,
  AreaResolvedValue,
  AreaSlots,
} from '../area/types'

export type AreaPanelResolvedValue = AreaResolvedValue

export type AreaPanelModelValue = AreaModelValue

export interface AreaPanelSlots extends AreaSlots {}

export interface AreaPanelProps {
  areaList?: AreaList
  cancelButtonText?: VanAreaPanelProps['cancelButtonText']
  columnsNum?: VanAreaPanelProps['columnsNum']
  columnsPlaceholder?: VanAreaPanelProps['columnsPlaceholder']
  confirmButtonText?: VanAreaPanelProps['confirmButtonText']
  modelValue?: AreaPanelModelValue
  loading?: VanAreaPanelProps['loading']
  optionHeight?: VanAreaPanelProps['optionHeight']
  readonly?: boolean
  disabled?: boolean
  swipeDuration?: VanAreaPanelProps['swipeDuration']
  title?: VanAreaPanelProps['title']
  visibleOptionNum?: VanAreaPanelProps['visibleOptionNum']
}

export type {
  AreaList,
  PickerThemeVars as AreaPanelThemeVars,
  VanAreaPanelInstance,
  VanAreaPanelProps,
}
