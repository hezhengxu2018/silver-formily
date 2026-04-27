import type { Dayjs } from 'dayjs'
import type { DatePickerColumnType } from './types'
import { isValid } from '@formily/shared'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const DEFAULT_COLUMNS_TYPE: DatePickerColumnType[] = ['year', 'month', 'day']
const COLUMN_TYPE_TOKEN_MAP: Record<DatePickerColumnType, string> = {
  year: 'YYYY',
  month: 'MM',
  day: 'DD',
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function getMonthEndDay(year: number, month: number) {
  return dayjs().year(year).month(month - 1).daysInMonth()
}

export function padZero(value: string | number) {
  return `${value}`.padStart(2, '0')
}

export function getColumnTypeToken(type: DatePickerColumnType) {
  return COLUMN_TYPE_TOKEN_MAP[type]
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

export function resolveDatePickerColumnsType(columnsType?: DatePickerColumnType[]) {
  return Array.isArray(columnsType) && columnsType.length
    ? [...columnsType]
    : [...DEFAULT_COLUMNS_TYPE]
}

function getDefaultDatePickerFormat(columnsType?: DatePickerColumnType[], separator = '-') {
  return resolveDatePickerColumnsType(columnsType)
    .map(type => getColumnTypeToken(type))
    .join(separator)
}

export function resolveDatePickerFormat(
  format?: string,
  columnsType?: DatePickerColumnType[],
  separator = '-',
) {
  return format || getDefaultDatePickerFormat(columnsType, separator)
}

export function resolveDatePickerValueFormat(
  valueFormat?: string,
  columnsType?: DatePickerColumnType[],
  separator = '-',
) {
  return valueFormat || getDefaultDatePickerFormat(columnsType, separator)
}
