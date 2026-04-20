import type { Dayjs } from 'dayjs'
import type { DatePickerProps as VanDatePickerProps } from 'vant'
import type { PickerOption } from '../picker/types'
import type {
  DatePickerColumnType,
  DatePickerDisplayFormatter,
  DatePickerModelValue,
  DatePickerResolvedValue,
} from './types'
import { isValid } from '@formily/shared'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cloneDeep } from 'es-toolkit/compat'

dayjs.extend(customParseFormat)

const DEFAULT_COLUMNS_TYPE: DatePickerColumnType[] = ['year', 'month', 'day']
const COLUMN_TYPE_TOKEN_MAP: Record<DatePickerColumnType, string> = {
  year: 'YYYY',
  month: 'MM',
  day: 'DD',
}

interface DatePickerResolvedContext {
  columnsType: DatePickerColumnType[]
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  maxDate: Date
  minDate: Date
  separator: string
  valueFormat?: string
}

type DatePickerResolvedOptions = Pick<
  DatePickerPropsForResolve,
  'columnsType' | 'filter' | 'formatter' | 'format' | 'maxDate' | 'minDate' | 'separator' | 'valueFormat'
>

interface DatePickerPropsForResolve {
  columnsType?: VanDatePickerProps['columnsType']
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  maxDate?: VanDatePickerProps['maxDate']
  minDate?: VanDatePickerProps['minDate']
  separator?: string
  valueFormat?: string
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function times<T>(count: number, iteratee: (index: number) => T) {
  if (count < 0)
    return [] as T[]

  return Array.from({ length: count }, (_, index) => iteratee(index))
}

function getMonthEndDay(year: number, month: number) {
  return dayjs().year(year).month(month - 1).daysInMonth()
}

function padZero(value: string | number) {
  return `${value}`.padStart(2, '0')
}

function getColumnTypeToken(type: DatePickerColumnType) {
  return COLUMN_TYPE_TOKEN_MAP[type]
}

function parseDayjsValue(
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

function resolveDatePickerColumnsType(columnsType?: DatePickerColumnType[]) {
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

function resolveDatePickerContext(options: DatePickerResolvedOptions = {}): DatePickerResolvedContext {
  return {
    columnsType: resolveDatePickerColumnsType(options.columnsType),
    filter: options.filter,
    format: options.format,
    formatter: options.formatter,
    maxDate: isValidDate(options.maxDate)
      ? options.maxDate
      : dayjs()
          .add(10, 'year')
          .endOf('year')
          .startOf('day')
          .toDate(),
    minDate: isValidDate(options.minDate)
      ? options.minDate
      : dayjs()
          .subtract(10, 'year')
          .startOf('year')
          .toDate(),
    separator: options.separator ?? '-',
    valueFormat: options.valueFormat,
  }
}

// Accept both the external field value string and Vant DatePicker's internal string array.
function parseDatePickerValue(
  modelValue: DatePickerModelValue | Array<string | number>,
  context: DatePickerResolvedContext,
) {
  if (Array.isArray(modelValue)) {
    const values = modelValue.filter(isValid).map(value => String(value))

    if (!values.length)
      return null

    const pickerValueFormat = context.columnsType
      .slice(0, values.length)
      .map(type => getColumnTypeToken(type))
      .join('-')

    return parseDayjsValue(values.join('-'), pickerValueFormat)
  }

  return parseDayjsValue(
    modelValue,
    resolveDatePickerValueFormat(context.valueFormat, context.columnsType, context.separator),
  )
}

function createDatePickerInnerValue(
  modelValue: DatePickerModelValue | Array<string | number>,
  context: DatePickerResolvedContext,
) {
  const parsedValue = parseDatePickerValue(modelValue, context)

  if (!parsedValue)
    return [] as string[]

  return context.columnsType.map(type => parsedValue.format(getColumnTypeToken(type)))
}

function genOptions(
  min: number,
  max: number,
  type: DatePickerColumnType,
  values: string[],
  context: DatePickerResolvedContext,
) {
  const options = times(max - min + 1, (index) => {
    const value = padZero(min + index)
    const option = {
      text: value,
      value,
    }

    return context.formatter
      ? context.formatter(type, option)
      : option
  })

  return context.filter
    ? context.filter(type, options, values)
    : options
}

function normalizeDatePickerValues(values: string[], columns: PickerOption[][]) {
  return values.map((value, index) => {
    const column = columns[index]

    if (!column?.length)
      return value

    const minValue = Number(column[0]?.value)
    const maxValue = Number(column[column.length - 1]?.value)

    return padZero(clamp(Number(value), minValue, maxValue))
  })
}

function getDatePickerValueByType(
  values: string[],
  context: DatePickerResolvedContext,
  type: DatePickerColumnType,
) {
  const index = context.columnsType.indexOf(type)
  const value = values[index]

  if (isValid(value))
    return Number(value)

  switch (type) {
    case 'year':
      return context.minDate.getFullYear()
    case 'month':
      return context.minDate.getMonth() + 1
    case 'day':
      return context.minDate.getDate()
  }
}

function buildDatePickerColumns(values: string[], context: DatePickerResolvedContext) {
  const isMinYear = (year: number) => year === context.minDate.getFullYear()
  const isMaxYear = (year: number) => year === context.maxDate.getFullYear()
  const isMinMonth = (month: number) => month === context.minDate.getMonth() + 1
  const isMaxMonth = (month: number) => month === context.maxDate.getMonth() + 1

  return context.columnsType.map((type) => {
    switch (type) {
      case 'year': {
        return genOptions(
          context.minDate.getFullYear(),
          context.maxDate.getFullYear(),
          type,
          values,
          context,
        )
      }
      case 'month': {
        const year = getDatePickerValueByType(values, context, 'year')
        const minMonth = isMinYear(year) ? context.minDate.getMonth() + 1 : 1
        const maxMonth = isMaxYear(year) ? context.maxDate.getMonth() + 1 : 12

        return genOptions(minMonth, maxMonth, type, values, context)
      }
      case 'day': {
        const year = getDatePickerValueByType(values, context, 'year')
        const month = getDatePickerValueByType(values, context, 'month')
        const minDay = isMinYear(year) && isMinMonth(month) ? context.minDate.getDate() : 1
        const maxDay = isMaxYear(year) && isMaxMonth(month) ? context.maxDate.getDate() : getMonthEndDay(year, month)

        return genOptions(minDay, maxDay, type, values, context)
      }
      default:
        return []
    }
  })
}

function resolveDatePickerState(
  modelValue: DatePickerModelValue | Array<string | number>,
  options: DatePickerResolvedOptions = {},
  context = resolveDatePickerContext(options),
) {
  let currentValues = createDatePickerInnerValue(modelValue, context)

  for (let index = 0; index < 4; index += 1) {
    const columns = buildDatePickerColumns(currentValues, context)
    const nextValues = normalizeDatePickerValues(currentValues, columns)

    if (nextValues.length === currentValues.length && nextValues.every((value, currentIndex) => value === currentValues[currentIndex])) {
      return {
        columns,
        values: currentValues,
      }
    }

    currentValues = nextValues
  }

  return {
    columns: buildDatePickerColumns(currentValues, context),
    values: currentValues,
  }
}

export function resolveDatePickerInnerValue(
  modelValue: DatePickerModelValue | Array<string | number>,
  options: DatePickerResolvedOptions = {},
) {
  return resolveDatePickerState(modelValue, options).values
}

export function resolveDatePickerModelValue(
  modelValue: DatePickerModelValue | Array<string | number>,
  options: DatePickerResolvedOptions = {},
): DatePickerResolvedValue {
  const context = resolveDatePickerContext(options)
  const { values } = resolveDatePickerState(modelValue, options, context)

  if (!values.length)
    return null

  const parsedValue = parseDatePickerValue(values, context)

  return parsedValue
    ? parsedValue.format(resolveDatePickerValueFormat(context.valueFormat, context.columnsType, context.separator))
    : null
}

export function resolveDatePickerSelectedOptions(
  modelValue: DatePickerModelValue | Array<string | number>,
  options: DatePickerResolvedOptions = {},
): Array<PickerOption | undefined> {
  const { columns, values } = resolveDatePickerState(modelValue, options)

  return columns.map((column, index) => {
    const matched = column.find(option => option.value === values[index])

    return matched
      ? cloneDeep(matched)
      : undefined
  })
}

export function formatDatePickerValue(
  value: DatePickerResolvedValue,
  options: Pick<DatePickerResolvedOptions, 'columnsType' | 'format' | 'separator' | 'valueFormat'> = {},
) {
  if (!value)
    return ''

  const context = resolveDatePickerContext(options)
  const parsedValue = parseDatePickerValue(value, context)

  if (!parsedValue)
    return value

  return parsedValue.format(
    resolveDatePickerFormat(context.format, context.columnsType, context.separator),
  )
}

export type { DatePickerDisplayFormatter }
