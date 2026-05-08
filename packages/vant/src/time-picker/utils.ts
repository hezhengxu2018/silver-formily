import type { Dayjs } from 'dayjs'
import type { TimePickerProps as VanTimePickerProps } from 'vant'
import type { PickerOption } from '../picker/types'
import type {
  TimePickerColumnType,
  TimePickerDisplayFormatter,
  TimePickerModelValue,
  TimePickerResolvedValue,
} from './types'
import { isValid } from '@formily/shared'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cloneDeep } from 'es-toolkit/compat'

dayjs.extend(customParseFormat)

const DEFAULT_COLUMNS_TYPE: TimePickerColumnType[] = ['hour', 'minute']
const FULL_COLUMNS_TYPE: TimePickerColumnType[] = ['hour', 'minute', 'second']
const COLUMN_TYPE_TOKEN_MAP: Record<TimePickerColumnType, string> = {
  hour: 'HH',
  minute: 'mm',
  second: 'ss',
}

interface TimePickerResolvedContext {
  columnsType: TimePickerColumnType[]
  filter?: VanTimePickerProps['filter']
  format?: string
  formatter?: VanTimePickerProps['formatter']
  maxHour: number
  maxMinute: number
  maxSecond: number
  maxTime?: string
  minHour: number
  minMinute: number
  minSecond: number
  minTime?: string
  valueFormat?: string
}

type TimePickerResolvedOptions = Pick<
  TimePickerPropsForResolve,
  | 'columnsType'
  | 'filter'
  | 'formatter'
  | 'format'
  | 'maxHour'
  | 'maxMinute'
  | 'maxSecond'
  | 'maxTime'
  | 'minHour'
  | 'minMinute'
  | 'minSecond'
  | 'minTime'
  | 'valueFormat'
>

interface TimePickerPropsForResolve {
  columnsType?: VanTimePickerProps['columnsType']
  filter?: VanTimePickerProps['filter']
  format?: string
  formatter?: VanTimePickerProps['formatter']
  maxHour?: VanTimePickerProps['maxHour']
  maxMinute?: VanTimePickerProps['maxMinute']
  maxSecond?: VanTimePickerProps['maxSecond']
  maxTime?: VanTimePickerProps['maxTime']
  minHour?: VanTimePickerProps['minHour']
  minMinute?: VanTimePickerProps['minMinute']
  minSecond?: VanTimePickerProps['minSecond']
  minTime?: VanTimePickerProps['minTime']
  valueFormat?: string
}

function times<T>(count: number, iteratee: (index: number) => T) {
  if (count < 0)
    return [] as T[]

  return Array.from({ length: count }, (_, index) => iteratee(index))
}

function padZero(value: string | number) {
  return `${value}`.padStart(2, '0')
}

function getColumnTypeToken(type: TimePickerColumnType) {
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

function resolveNumericValue(value: unknown, fallback: number) {
  const nextValue = Number(value)

  return Number.isFinite(nextValue) ? nextValue : fallback
}

function resolveTimePickerColumnsType(columnsType?: TimePickerColumnType[]) {
  return Array.isArray(columnsType) && columnsType.length
    ? [...columnsType]
    : [...DEFAULT_COLUMNS_TYPE]
}

function getDefaultTimePickerFormat(columnsType?: TimePickerColumnType[]) {
  return resolveTimePickerColumnsType(columnsType)
    .map(type => getColumnTypeToken(type))
    .join(':')
}

function parseFullTimeValue(value: unknown) {
  return parseDayjsValue(value, 'HH:mm:ss')
}

function isValidTime(value: unknown): value is string {
  return typeof value === 'string' && !!parseFullTimeValue(value)
}

function getValidTimeLimit(
  time: string,
  columnsType: TimePickerColumnType[],
) {
  const parsedTime = parseFullTimeValue(time)

  if (!parsedTime) {
    return FULL_COLUMNS_TYPE.map(() => '00')
  }

  return FULL_COLUMNS_TYPE.map((columnType, index) => {
    return columnsType.includes(columnType)
      ? parsedTime.format(getColumnTypeToken(FULL_COLUMNS_TYPE[index]))
      : '00'
  })
}

export function resolveTimePickerFormat(
  format?: string,
  columnsType?: TimePickerColumnType[],
) {
  return format || getDefaultTimePickerFormat(columnsType)
}

export function resolveTimePickerValueFormat(
  valueFormat?: string,
  columnsType?: TimePickerColumnType[],
) {
  return valueFormat || getDefaultTimePickerFormat(columnsType)
}

function resolveTimePickerContext(options: TimePickerResolvedOptions = {}): TimePickerResolvedContext {
  return {
    columnsType: resolveTimePickerColumnsType(options.columnsType),
    filter: options.filter,
    format: options.format,
    formatter: options.formatter,
    maxHour: resolveNumericValue(options.maxHour, 23),
    maxMinute: resolveNumericValue(options.maxMinute, 59),
    maxSecond: resolveNumericValue(options.maxSecond, 59),
    maxTime: isValidTime(options.maxTime) ? options.maxTime : undefined,
    minHour: resolveNumericValue(options.minHour, 0),
    minMinute: resolveNumericValue(options.minMinute, 0),
    minSecond: resolveNumericValue(options.minSecond, 0),
    minTime: isValidTime(options.minTime) ? options.minTime : undefined,
    valueFormat: options.valueFormat,
  }
}

// Accept both the external field value string and Vant TimePicker's internal string array.
function parseTimePickerValue(
  modelValue: TimePickerModelValue | Array<string | number>,
  context: TimePickerResolvedContext,
) {
  if (Array.isArray(modelValue)) {
    const values = modelValue.filter(isValid).map(value => String(value))

    if (!values.length)
      return null

    const pickerValueFormat = context.columnsType
      .slice(0, values.length)
      .map(type => getColumnTypeToken(type))
      .join(':')

    return parseDayjsValue(values.join(':'), pickerValueFormat)
  }

  return parseDayjsValue(
    modelValue,
    resolveTimePickerValueFormat(context.valueFormat, context.columnsType),
  )
}

function createTimePickerInnerValue(
  modelValue: TimePickerModelValue | Array<string | number>,
  context: TimePickerResolvedContext,
) {
  const parsedValue = parseTimePickerValue(modelValue, context)

  if (!parsedValue)
    return [] as string[]

  return context.columnsType.map(type => parsedValue.format(getColumnTypeToken(type)))
}

function genOptions(
  min: number,
  max: number,
  type: TimePickerColumnType,
  values: string[],
  context: TimePickerResolvedContext,
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

function buildTimePickerColumns(values: string[], context: TimePickerResolvedContext) {
  let minHour = context.minHour
  let maxHour = context.maxHour
  let minMinute = context.minMinute
  let maxMinute = context.maxMinute
  let minSecond = context.minSecond
  let maxSecond = context.maxSecond

  if (context.minTime || context.maxTime) {
    const fullTime = {
      hour: 0,
      minute: 0,
      second: 0,
    }

    context.columnsType.forEach((columnType, index) => {
      fullTime[columnType] = Number(values[index] ?? 0)
    })

    if (context.minTime) {
      const [nextMinHour, nextMinMinute, nextMinSecond] = getValidTimeLimit(context.minTime, context.columnsType)
      minHour = Number(nextMinHour)
      minMinute = fullTime.hour <= minHour ? Number(nextMinMinute) : 0
      minSecond = fullTime.hour <= minHour && fullTime.minute <= minMinute
        ? Number(nextMinSecond)
        : 0
    }

    if (context.maxTime) {
      const [nextMaxHour, nextMaxMinute, nextMaxSecond] = getValidTimeLimit(context.maxTime, context.columnsType)
      maxHour = Number(nextMaxHour)
      maxMinute = fullTime.hour >= maxHour ? Number(nextMaxMinute) : 59
      maxSecond = fullTime.hour >= maxHour && fullTime.minute >= maxMinute
        ? Number(nextMaxSecond)
        : 59
    }
  }

  return context.columnsType.map((type) => {
    switch (type) {
      case 'hour':
        return genOptions(minHour, maxHour, type, values, context)
      case 'minute':
        return genOptions(minMinute, maxMinute, type, values, context)
      case 'second':
        return genOptions(minSecond, maxSecond, type, values, context)
      default:
        return []
    }
  })
}

function resolveTimePickerState(
  modelValue: TimePickerModelValue | Array<string | number>,
  options: TimePickerResolvedOptions = {},
  context = resolveTimePickerContext(options),
) {
  const currentValues = createTimePickerInnerValue(modelValue, context)

  return {
    columns: buildTimePickerColumns(currentValues, context),
    values: currentValues,
  }
}

export function resolveTimePickerInnerValue(
  modelValue: TimePickerModelValue | Array<string | number>,
  options: TimePickerResolvedOptions = {},
) {
  return resolveTimePickerState(modelValue, options).values
}

export function resolveTimePickerModelValue(
  modelValue: TimePickerModelValue | Array<string | number>,
  options: TimePickerResolvedOptions = {},
): TimePickerResolvedValue {
  const context = resolveTimePickerContext(options)
  const { values } = resolveTimePickerState(modelValue, options, context)

  if (!values.length)
    return null

  const parsedValue = parseTimePickerValue(values, context)

  return parsedValue
    ? parsedValue.format(resolveTimePickerValueFormat(context.valueFormat, context.columnsType))
    : null
}

export function resolveTimePickerSelectedOptions(
  modelValue: TimePickerModelValue | Array<string | number>,
  options: TimePickerResolvedOptions = {},
): Array<PickerOption | undefined> {
  const { columns, values } = resolveTimePickerState(modelValue, options)

  return columns.map((column, index) => {
    const matched = column.find(option => option.value === values[index])

    return matched
      ? cloneDeep(matched)
      : undefined
  })
}

export function formatTimePickerValue(
  value: TimePickerResolvedValue,
  options: Pick<TimePickerResolvedOptions, 'columnsType' | 'format' | 'valueFormat'> = {},
) {
  if (!value)
    return ''

  const context = resolveTimePickerContext(options)
  const parsedValue = parseTimePickerValue(value, context)

  if (!parsedValue)
    return value

  return parsedValue.format(
    resolveTimePickerFormat(context.format, context.columnsType),
  )
}

export type { TimePickerDisplayFormatter }
