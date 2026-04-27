import type { PickerOption } from '../picker/types'
import type { DatePickerResolvedOptions } from './columns'
import type {
  DatePickerDisplayFormatter,
  DatePickerModelValue,
  DatePickerResolvedValue,
} from './types'
import { cloneDeep } from 'es-toolkit/compat'
import {
  parseDatePickerValue,
  resolveDatePickerBoundaryDates,
  resolveDatePickerContext,
  resolveDatePickerState,
} from './columns'
import {
  resolveDatePickerFormat,
  resolveDatePickerValueFormat,
} from './format'

export { resolveDatePickerBoundaryDates }
export {
  resolveDatePickerFormat,
  resolveDatePickerValueFormat,
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
