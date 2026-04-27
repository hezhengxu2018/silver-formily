import type { DatePickerProps as VanDatePickerProps } from 'vant'
import type { PickerOption } from '../picker/types'
import type {
  DatePickerBoundaryValue,
  DatePickerColumnType,
  DatePickerModelValue,
} from './types'
import { isValid } from '@formily/shared'
import dayjs from 'dayjs'
import {
  getColumnTypeToken,
  getMonthEndDay,
  isValidDate,
  padZero,
  parseDayjsValue,
  resolveDatePickerColumnsType,
  resolveDatePickerValueFormat,
} from './format'

export interface DatePickerResolvedContext {
  columnsType: DatePickerColumnType[]
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  maxDate: Date
  minDate: Date
  separator: string
  valueFormat?: string
}

interface DatePickerPropsForResolve {
  columnsType?: VanDatePickerProps['columnsType']
  filter?: VanDatePickerProps['filter']
  format?: string
  formatter?: VanDatePickerProps['formatter']
  maxDate?: DatePickerBoundaryValue | VanDatePickerProps['maxDate']
  minDate?: DatePickerBoundaryValue | VanDatePickerProps['minDate']
  separator?: string
  valueFormat?: string
}

export type DatePickerResolvedOptions = Pick<
  DatePickerPropsForResolve,
  'columnsType' | 'filter' | 'formatter' | 'format' | 'maxDate' | 'minDate' | 'separator' | 'valueFormat'
>

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function times<T>(count: number, iteratee: (index: number) => T) {
  if (count < 0)
    return [] as T[]

  return Array.from({ length: count }, (_, index) => iteratee(index))
}

function parseDatePickerBoundaryDate(value: DatePickerPropsForResolve['minDate'], valueFormat: string) {
  if (isValidDate(value))
    return value

  return parseDayjsValue(value, valueFormat)?.startOf('day').toDate() ?? null
}

export function resolveDatePickerContext(options: DatePickerResolvedOptions = {}): DatePickerResolvedContext {
  const columnsType = resolveDatePickerColumnsType(options.columnsType)
  const separator = options.separator ?? '-'
  const valueFormat = resolveDatePickerValueFormat(options.valueFormat, columnsType, separator)

  return {
    columnsType,
    filter: options.filter,
    format: options.format,
    formatter: options.formatter,
    maxDate: parseDatePickerBoundaryDate(options.maxDate, valueFormat)
      ?? dayjs()
        .add(10, 'year')
        .endOf('year')
        .startOf('day')
        .toDate(),
    minDate: parseDatePickerBoundaryDate(options.minDate, valueFormat)
      ?? dayjs()
        .subtract(10, 'year')
        .startOf('year')
        .toDate(),
    separator,
    valueFormat: options.valueFormat,
  }
}

export function resolveDatePickerBoundaryDates(options: DatePickerResolvedOptions = {}) {
  const { maxDate, minDate } = resolveDatePickerContext(options)

  return {
    maxDate,
    minDate,
  }
}

// Accept both the external field value string and Vant DatePicker's internal string array.
export function parseDatePickerValue(
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

export function resolveDatePickerState(
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
