import type { CalendarDisplayFormatter, CalendarModelValue, CalendarType } from '../calendar/types'

export interface PreviewTextProps {
  placeholder?: string
}

export interface PreviewTextInputProps {
  modelValue?: any
}

export interface PreviewTextCalendarProps {
  modelValue?: CalendarModelValue
  type?: CalendarType
  placeholder?: string
  displayFormatter?: CalendarDisplayFormatter
}
