import type { Dayjs } from 'dayjs'
import type { ReactNode } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(isoWeek)

export { dayjs }

type DateInput = string | Date | Dayjs
type DateFormat = string | ((value: Dayjs) => string)

export function dayjsable(value: DateInput | undefined, format?: string): Dayjs | undefined {
  return value ? dayjs(value, format) : undefined
}

export function formatDayjsValue(value: DateInput | undefined, format?: DateFormat): string | undefined
export function formatDayjsValue<P extends ReactNode>(value: DateInput | undefined, format: DateFormat | undefined, placeholder: P): string | P
export function formatDayjsValue(
  value: DateInput | undefined,
  format?: DateFormat,
  placeholder?: ReactNode,
): ReactNode {
  if (!value)
    return placeholder
  const parsed = dayjs.isDayjs(value) ? value : dayjs(value)
  return typeof format === 'function' ? format(parsed) : parsed.format(format)
}
