import type {
  CascaderFieldNames,
  CascaderOption,
  CascaderThemeVars,
  PopupPosition,
  CascaderProps as VanCascaderProps,
  PopupProps as VanPopupProps,
} from 'vant'
import type { Numeric } from 'vant/es/utils'

export type CascaderOptionValue = Numeric

export type CascaderResolvedValue = CascaderOptionValue[] | null

export type CascaderModelValue = CascaderResolvedValue | CascaderOptionValue | undefined

export interface CascaderChangeEvent {
  value: CascaderOptionValue
  tabIndex: number
  selectedOptions: CascaderOption[]
}

export interface CascaderProps extends Pick<VanCascaderProps, 'activeColor' | 'closeIcon' | 'closeable' | 'fieldNames' | 'options' | 'placeholder' | 'showHeader' | 'swipeable' | 'title'>, Pick<VanPopupProps, 'closeOnClickOverlay' | 'closeOnPopstate' | 'duration' | 'lazyRender' | 'lockScroll' | 'overlay' | 'position' | 'round' | 'safeAreaInsetBottom' | 'safeAreaInsetTop' | 'teleport' | 'transition' | 'zIndex'> {
  modelValue?: CascaderModelValue
  separator?: string
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: CascaderDisplayFormatter
}

export interface CascaderOptionSlotProps {
  option: CascaderOption
  selected: boolean
}

export interface CascaderTabSlotProps {
  tabIndex: number
}

export interface CascaderSlots {
  'title'?: () => any
  'option'?: (props: CascaderOptionSlotProps) => any
  'options-top'?: (props: CascaderTabSlotProps) => any
  'options-bottom'?: (props: CascaderTabSlotProps) => any
}

export type CascaderDisplayFormatter = (
  value: CascaderResolvedValue,
  selectedOptions: CascaderOption[],
) => string

export type {
  CascaderFieldNames,
  CascaderOption,
  CascaderThemeVars,
  PopupPosition,
  VanCascaderProps,
  VanPopupProps,
}
