import type { StickyPosition } from 'vant'
import type { VantFormButtonGroupLayout } from './context'

export interface FormButtonGroupProps {
  layout?: VantFormButtonGroupLayout
  gap?: number | string
  inset?: boolean
  safeAreaInsetBottom?: boolean
}

export interface FormButtonGroupStickyProps {
  zIndex?: number | string
  position?: StickyPosition
  container?: Element
  offsetTop?: number | string
  offsetBottom?: number | string
}
