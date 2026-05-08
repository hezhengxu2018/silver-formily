import type { Dayjs } from 'dayjs'
import { isValid } from '@formily/shared'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function parseDayjsValue(
  value: unknown,
  format?: string,
): Dayjs | null {
  if (!isValid(value))
    return null

  if (dayjs.isDayjs(value))
    return value.isValid() ? value : null

  if (isValidDate(value)) {
    const parsed = dayjs(value)
    return parsed.isValid() ? parsed : null
  }

  const rawValue = String(value).trim()

  if (!rawValue)
    return null

  if (format) {
    const parsed = dayjs(rawValue, format, true)

    if (parsed.isValid())
      return parsed

    return null
  }

  const fallback = dayjs(rawValue)

  return fallback.isValid()
    ? fallback
    : null
}

export function parseDateValue(value: unknown, format = DEFAULT_DATE_FORMAT) {
  return parseDayjsValue(value, format)?.toDate() ?? null
}

export function formatDateValue(value: Date, format = DEFAULT_DATE_FORMAT) {
  return dayjs(value).format(format)
}
