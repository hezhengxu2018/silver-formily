import type {
  CalendarDayItem,
  CalendarDayType,
  CalendarThemeVars,
  CalendarType,
  CalendarInstance as VanCalendarInstance,
  CalendarProps as VanCalendarProps,
} from 'vant'
import type { CalendarSwitchMode } from 'vant/es/calendar/types'

export type CalendarModelValue = Date | Date[] | null | undefined

export type CalendarDisplayFormatter = (
  value: Date | Date[] | null,
  type: CalendarType,
) => string

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
