import type { DatePickerProps } from 'antd-mobile/es/components/date-picker'
import type { DatePickerFilter } from 'antd-mobile/es/components/date-picker/date-picker-utils'
import type { PickerColumn, PickerColumnItem } from 'antd-mobile/es/components/picker'
import { dayjs } from '../__builtins__'

export type QuarterPrecision = 'year' | 'quarter'
type RenderLabel = NonNullable<DatePickerProps['renderLabel']>

interface QuarterColumnsOptions {
  selected: string[]
  min: Date
  max: Date
  precision: QuarterPrecision
  renderLabel: RenderLabel
  filter?: DatePickerFilter
}

export function defaultRenderLabel(_type: Parameters<RenderLabel>[0], value: number) {
  return value.toString()
}

function filterRange(from: number, to: number, filter: (value: number) => boolean) {
  const values: number[] = []
  for (let value = from; value <= to; value++) {
    if (filter(value))
      values.push(value)
  }
  return values
}

export function generateDatePickerColumns({ selected, min, max, precision, renderLabel, filter }: QuarterColumnsOptions): PickerColumn[] {
  const selectedYear = Number.parseInt(selected[0])
  const selectedQuarter = Number.parseInt(selected[1])
  const minYear = min.getFullYear()
  const maxYear = max.getFullYear()

  function generateColumn(from: number, to: number, type: QuarterPrecision, selectedValue: number): PickerColumnItem[] {
    const currentFilter = filter?.[type]
    const prefix = type === 'quarter' ? selected.slice(0, 1) : []
    const values = filterRange(from, to, value => !currentFilter || currentFilter(value, {
      get date() {
        return convertStringArrayToDate([...prefix, value.toString()])
      },
    }))
    return values.map(value => ({
      label: renderLabel(type, value, { selected: selectedValue === value }),
      value: value.toString(),
    }))
  }

  const years = generateColumn(minYear, maxYear, 'year', selectedYear)
  if (precision === 'year')
    return [years]

  const lower = selectedYear === minYear ? dayjs(min).quarter() : 1
  const upper = selectedYear === maxYear ? dayjs(max).quarter() : 4
  const quarters = generateColumn(lower, upper, 'quarter', selectedQuarter)
  return [years, quarters]
}

export function convertDateToStringArray(date: Date | undefined | null): string[] {
  if (!date)
    return []
  const day = dayjs(date)
  return [day.year().toString(), day.quarter().toString()]
}

export function convertStringArrayToDate(value: (string | number | null | undefined)[]): Date {
  const year = Number.parseInt(String(value[0] ?? '1900'))
  const quarter = Number.parseInt(String(value[1] ?? '1'))
  return dayjs().year(year).quarter(quarter).toDate()
}
