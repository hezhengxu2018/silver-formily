import type { CalendarType } from 'vant'
import type { CalendarInnerValue, CalendarModelValue, CalendarResolvedValue } from './types'
import { DEFAULT_DATE_FORMAT, formatDateValue, isValidDate, parseDateValue } from '../__builtins__/shared/date'

interface CalendarFormatOptions {
  format?: string
  valueFormat?: string
}

export function resolveCalendarFormat(format?: string) {
  return format || DEFAULT_DATE_FORMAT
}

export function resolveCalendarValueFormat(valueFormat?: string) {
  return valueFormat || DEFAULT_DATE_FORMAT
}

function normalizeCalendarDates(
  value: CalendarModelValue | CalendarInnerValue,
  valueFormat = DEFAULT_DATE_FORMAT,
) {
  const values = Array.isArray(value) ? value : [value]
  return values
    .map(value => parseDateValue(value, valueFormat))
    .filter(isValidDate)
}

export function resolveCalendarInnerValue(
  value: CalendarModelValue | CalendarInnerValue,
  type: CalendarType = 'single',
  options: Pick<CalendarFormatOptions, 'valueFormat'> = {},
): CalendarInnerValue {
  const dates = normalizeCalendarDates(value, resolveCalendarValueFormat(options.valueFormat))

  if (type === 'single') {
    return dates[0] ?? null
  }

  if (type === 'range') {
    return dates.length >= 2 ? dates.slice(0, 2) : null
  }

  return dates.length ? dates : null
}

export function resolveCalendarModelValue(
  value: CalendarModelValue | CalendarInnerValue,
  type: CalendarType = 'single',
  options: Pick<CalendarFormatOptions, 'valueFormat'> = {},
): CalendarResolvedValue {
  const resolvedValue = resolveCalendarInnerValue(
    value,
    type,
    options,
  )
  const valueFormat = resolveCalendarValueFormat(options.valueFormat)

  if (!resolvedValue) {
    return null
  }

  if (Array.isArray(resolvedValue)) {
    return resolvedValue.map(value => formatDateValue(value, valueFormat))
  }

  return formatDateValue(resolvedValue, valueFormat)
}

export function resolveCalendarSelectedValue(
  value: CalendarModelValue | CalendarInnerValue,
  type: CalendarType = 'single',
  options: Pick<CalendarFormatOptions, 'valueFormat'> = {},
): CalendarResolvedValue {
  const dates = normalizeCalendarDates(value, resolveCalendarValueFormat(options.valueFormat))
  const valueFormat = resolveCalendarValueFormat(options.valueFormat)

  if (type === 'single') {
    return dates[0] ? formatDateValue(dates[0], valueFormat) : null
  }

  return dates.length
    ? dates.map(value => formatDateValue(value, valueFormat))
    : null
}

export function normalizeCalendarValue(
  value: CalendarModelValue,
  type: CalendarType = 'single',
  options: Pick<CalendarFormatOptions, 'valueFormat'> = {},
): CalendarResolvedValue {
  return resolveCalendarModelValue(value, type, options)
}

export function formatCalendarValue(
  value: CalendarResolvedValue,
  type: CalendarType = 'single',
  options: CalendarFormatOptions = {},
): string {
  if (!value) {
    return ''
  }

  const format = resolveCalendarFormat(options.format)
  const valueFormat = resolveCalendarValueFormat(options.valueFormat)
  const dates = normalizeCalendarDates(value, valueFormat)

  if (!dates.length) {
    return ''
  }

  if (Array.isArray(value)) {
    const separator = type === 'range' ? ' ~ ' : ', '
    return dates.map(value => formatDateValue(value, format)).join(separator)
  }

  return formatDateValue(dates[0], format)
}

export function resolveCalendarPlaceholder(
  placeholder: string | undefined,
  type: CalendarType = 'single',
) {
  return placeholder || (type === 'range' ? '请选择日期范围' : '请选择日期')
}
