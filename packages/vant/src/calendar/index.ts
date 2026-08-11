import type { CalendarProps } from './types'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FCalendar from './calendar.vue'

export const Calendar = connect<typeof FCalendar, Partial<CalendarProps>>(
  FCalendar,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Calendar),
)

export default Calendar

export type {
  CalendarBoundaryValue,
  CalendarConfirmTextSlotProps,
  CalendarDayItem,
  CalendarDayType,
  CalendarDisplayFormatter,
  CalendarModelValue,
  CalendarMonthTitleSlotProps,
  CalendarProps,
  CalendarResolvedValue,
  CalendarSlots,
  CalendarSubtitleSlotProps,
  CalendarSwitchMode,
  CalendarSwitchSlotProps,
  CalendarThemeVars,
  CalendarType,
  VanCalendarInstance,
  VanCalendarProps,
} from './types'

export type CalendarComponent = typeof Calendar
