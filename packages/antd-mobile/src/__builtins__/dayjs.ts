import { isArr, isFn } from '@silver-formily/shared'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

export { dayjs }

export function dayjsable(value: any, format?: string) {
  return Array.isArray(value)
    ? value.map(val => dayjs(val, format))
    : value
      ? dayjs(value, format)
      : value
}

export function formatDayjsValue(value: any, format: any, placeholder?: string): string | string[] {
  const formatDate = (date: any, format: any, i = 0) => {
    if (!date)
      return placeholder
    if (!dayjs.isDayjs(date)) {
      date = dayjs(date)
    }
    if (isArr(format)) {
      const _format = format[i]
      if (isFn(_format)) {
        return _format(date)
      }
      return date?.format ? date.format(_format) : date
    }
    else {
      if (isFn(format)) {
        return format(date)
      }
      return date?.format ? date.format(format) : date
    }
  }
  if (isArr(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index)
    })
  }
  else {
    return value ? formatDate(value, format) : value || placeholder
  }
}
