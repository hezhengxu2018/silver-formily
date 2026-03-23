import type { CalendarType } from 'vant'
import type { CalendarModelValue } from './types'
import dayjs from 'dayjs'
import {
  castArray,
  clone,
  defaultTo,
  filter,
  first,
  isArray,
  isDate,
  isUndefined,
  join,
  map,
  take,
} from 'lodash-es'

function isValidDate(value: unknown): value is Date {
  if (!isDate(value)) {
    return false
  }

  return dayjs(value as Date).isValid()
}

function cloneDate(value: Date) {
  return clone(value)
}

function formatDate(value: Date) {
  return dayjs(value).format('YYYY-MM-DD')
}

function normalizeCalendarDates(value: CalendarModelValue) {
  return map(filter(castArray(value), isValidDate), cloneDate)
}

export function cloneCalendarValue(value: CalendarModelValue): Date | Date[] | null {
  const dates = normalizeCalendarDates(value)

  if (isArray(value)) {
    return dates
  }

  return first(dates) ?? null
}

export function normalizeCalendarValue(
  value: CalendarModelValue,
  type: CalendarType = 'single',
): Date | Date[] | null {
  const dates = normalizeCalendarDates(value)

  if (type === 'single') {
    return first(dates) ?? null
  }

  if (type === 'range') {
    return dates.length >= 2 ? take(dates, 2) : null
  }

  return dates.length ? dates : null
}

export function formatCalendarValue(
  value: CalendarModelValue,
  type: CalendarType = 'single',
): string {
  const normalizedValue = normalizeCalendarValue(value, type)

  if (!normalizedValue) {
    return ''
  }

  if (Array.isArray(normalizedValue)) {
    if (!normalizedValue.length) {
      return ''
    }

    const separator = type === 'range' ? ' ~ ' : ', '
    return join(map(normalizedValue, formatDate), separator)
  }

  return formatDate(normalizedValue)
}

export function resolveCalendarPlaceholder(
  placeholder: string | undefined,
  type: CalendarType = 'single',
) {
  return defaultTo(
    placeholder || undefined,
    type === 'range' ? '请选择日期范围' : '请选择日期',
  )
}

export function resolveCalendarResetValue(
  value: CalendarModelValue,
  type: CalendarType = 'single',
) {
  if (isUndefined(value)) {
    return undefined
  }

  return normalizeCalendarValue(value, type)
}
