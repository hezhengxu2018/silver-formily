import type { Field } from '@formily/core'
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

export type CascaderPopupProps = Partial<Omit<VanPopupProps, 'show' | 'onUpdate:show'>>

export interface CascaderChangeEvent {
  value: CascaderOptionValue
  tabIndex: number
  selectedOptions: CascaderOption[]
  currentValue: CascaderResolvedValue
  field?: Field
}

export interface CascaderProps extends Pick<VanCascaderProps, 'activeColor' | 'closeIcon' | 'closeable' | 'fieldNames' | 'options' | 'placeholder' | 'showHeader' | 'swipeable' | 'title'>, Pick<VanPopupProps, 'closeOnClickOverlay' | 'closeOnPopstate' | 'duration' | 'lazyRender' | 'lockScroll' | 'overlay' | 'position' | 'round' | 'safeAreaInsetBottom' | 'safeAreaInsetTop' | 'teleport' | 'transition' | 'zIndex'> {
  modelValue?: CascaderModelValue
  separator?: string
  readonly?: boolean
  readOnly?: boolean
  disabled?: boolean
  displayFormatter?: CascaderDisplayFormatter
  popupProps?: CascaderPopupProps
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

export interface CascaderPopupCascaderProps extends Pick<VanCascaderProps, 'activeColor' | 'closeIcon' | 'closeable' | 'fieldNames' | 'options' | 'placeholder' | 'showHeader' | 'swipeable' | 'title'> {
  modelValue?: CascaderOptionValue
}

export interface CascaderPopupContentProps {
  modelValue?: CascaderOptionValue
  cascaderProps: CascaderPopupCascaderProps
  onChange?: (payload: CascaderChangeEvent) => void
  onClickTab?: (tabIndex: string | number, title: string) => void
}

export type {
  CascaderFieldNames,
  CascaderOption,
  CascaderThemeVars,
  PopupPosition,
  VanCascaderProps,
  VanPopupProps,
}
