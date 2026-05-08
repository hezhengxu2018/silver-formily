import type { DatePickerColumnType } from './types'
import dayjs from 'dayjs'
import { isValidDate, parseDayjsValue } from '../__builtins__/shared/date'

export { isValidDate, parseDayjsValue }

const DEFAULT_COLUMNS_TYPE: DatePickerColumnType[] = ['year', 'month', 'day']
const COLUMN_TYPE_TOKEN_MAP: Record<DatePickerColumnType, string> = {
  year: 'YYYY',
  month: 'MM',
  day: 'DD',
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
