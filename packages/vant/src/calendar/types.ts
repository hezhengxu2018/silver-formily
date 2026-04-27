import type {
  CalendarDayItem,
  CalendarDayType,
  CalendarThemeVars,
  CalendarType,
  PopupPosition,
  CalendarInstance as VanCalendarInstance,
  CalendarProps as VanCalendarProps,
} from 'vant'
import type { CalendarSwitchMode } from 'vant/es/calendar/types'
import type { TeleportProps } from 'vue'

export type CalendarResolvedValue = string | string[] | null

export type CalendarInnerValue = Date | Date[] | null

export type CalendarModelValue = CalendarResolvedValue | undefined

export type CalendarBoundaryValue = string

export type CalendarDisplayFormatter = (
  value: CalendarResolvedValue,
  type: CalendarType,
) => string

export interface CalendarProps {
  type?: CalendarType
  switchMode?: CalendarSwitchMode
  title?: string
  color?: string
  round?: boolean
  readonly?: boolean
  maxRange?: number | string | null
  position?: PopupPosition
  teleport?: TeleportProps['to']
  showMark?: boolean
  showTitle?: boolean
  formatter?: (item: CalendarDayItem) => CalendarDayItem
  rowHeight?: number | string
  confirmText?: string
  rangePrompt?: string
  lazyRender?: boolean
  showConfirm?: boolean
  defaultDate?: CalendarModelValue
  allowSameDay?: boolean
  showSubtitle?: boolean
  closeOnPopstate?: boolean
  showRangePrompt?: boolean
  confirmDisabledText?: string
  closeOnClickOverlay?: boolean
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
  minDate?: CalendarBoundaryValue
  maxDate?: CalendarBoundaryValue
  firstDayOfWeek?: number | string
  modelValue?: CalendarModelValue
  format?: string
  valueFormat?: string
  placeholder?: string
  readOnly?: boolean
  displayFormatter?: CalendarDisplayFormatter
  disabled?: boolean
}

export interface CalendarSubtitleSlotProps {
  text: string
  date?: Date
}

export interface CalendarMonthTitleSlotProps {
  text: string
  date: Date
}

export interface CalendarSwitchSlotProps {
  disabled: boolean
}

export interface CalendarConfirmTextSlotProps {
  disabled: boolean
}

export interface CalendarSlots {
  'title'?: () => any
  'subtitle'?: (props: CalendarSubtitleSlotProps) => any
  'month-title'?: (props: CalendarMonthTitleSlotProps) => any
  'footer'?: () => any
  'confirm-text'?: (props: CalendarConfirmTextSlotProps) => any
  'top-info'?: (day: CalendarDayItem) => any
  'bottom-info'?: (day: CalendarDayItem) => any
  'text'?: (day: CalendarDayItem) => any
  'prev-month'?: (props: CalendarSwitchSlotProps) => any
  'prev-year'?: (props: CalendarSwitchSlotProps) => any
  'next-month'?: (props: CalendarSwitchSlotProps) => any
  'next-year'?: (props: CalendarSwitchSlotProps) => any
}

export type {
  CalendarDayItem,
  CalendarDayType,
  CalendarSwitchMode,
  CalendarThemeVars,
  CalendarType,
  VanCalendarInstance,
  VanCalendarProps,
}
