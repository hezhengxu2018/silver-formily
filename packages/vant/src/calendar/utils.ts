import type { CalendarType } from 'vant'
import type { CalendarModelValue, CalendarResolvedValue } from './types'
import dayjs from 'dayjs'
import { isDate } from 'es-toolkit'
import { cloneValue } from '../__builtins__'

function isValidDate(value: unknown): value is Date {
  if (!isDate(value)) {
    return false
  }

  return dayjs(value as Date).isValid()
}

function formatDate(value: Date) {
  return dayjs(value).format('YYYY-MM-DD')
}

function normalizeCalendarDates(value: CalendarModelValue) {
  const values = Array.isArray(value) ? value : [value]
  return values.filter(isValidDate).map(value => new Date(value))
}

export function cloneCalendarValue(value: CalendarResolvedValue): CalendarResolvedValue {
  return cloneValue(value)
}

export function normalizeCalendarValue(
  value: CalendarModelValue,
  type: CalendarType = 'single',
): CalendarResolvedValue {
  const dates = normalizeCalendarDates(value)

  if (type === 'single') {
    return dates[0] ?? null
  }

  if (type === 'range') {
    return dates.length >= 2 ? dates.slice(0, 2) : null
  }

  return dates.length ? dates : null
}

export function formatCalendarValue(
  value: CalendarResolvedValue,
  type: CalendarType = 'single',
): string {
  if (!value) {
    return ''
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return ''
    }

    const separator = type === 'range' ? ' ~ ' : ', '
    return value.map(formatDate).join(separator)
  }

  return formatDate(value)
}

export function resolveCalendarPlaceholder(
  placeholder: string | undefined,
  type: CalendarType = 'single',
) {
  return placeholder || (type === 'range' ? '请选择日期范围' : '请选择日期')
}
