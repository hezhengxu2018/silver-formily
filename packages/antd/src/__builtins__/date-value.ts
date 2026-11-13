import type { Dayjs } from 'dayjs'
import { mapProps } from '@silver-formily/react'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { useContext } from 'react'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(isoWeek)

export type DateValueFormat = string | false
export type DateOutput<F extends DateValueFormat> = F extends false ? Dayjs : string
export type DateInput<F extends DateValueFormat> = F extends false ? Dayjs : string | Dayjs
export type DateMultiple<T, M extends boolean> = M extends true ? T[] : T

export type DateValueProps<P, F extends DateValueFormat, M extends boolean = false> = Omit<P, 'value' | 'defaultValue' | 'onChange' | 'multiple'> & {
  /** Serialized value format, independent of display format. false preserves Dayjs. */
  valueFormat?: F
  multiple?: M
  value?: DateMultiple<DateInput<NoInfer<F>>, M> | null
  defaultValue?: DateMultiple<DateInput<NoInfer<F>>, M> | null
  onChange?: (value: DateMultiple<DateOutput<NoInfer<F>>, M> | null, dateString: DateMultiple<string, M> | null) => void
}
export type DateRangeValueProps<P, F extends DateValueFormat> = Omit<P, 'value' | 'defaultValue' | 'onChange'> & {
  valueFormat?: F
  value?: [DateInput<NoInfer<F>> | null, DateInput<NoInfer<F>> | null] | null
  defaultValue?: [DateInput<NoInfer<F>> | null, DateInput<NoInfer<F>> | null] | null
  onChange?: (value: [DateOutput<NoInfer<F>> | null, DateOutput<NoInfer<F>> | null] | null, dateStrings: [string, string] | null) => void
}

export function getDateValueFormat(picker?: string, showTime?: unknown) {
  return ({ year: 'YYYY', month: 'YYYY-MM', quarter: 'YYYY-[Q]Q', time: 'HH:mm:ss' }[picker ?? ''])
    ?? (showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
}

const weekTokens = /\[[^\]]*\]|gggg|GGGG|YYYY|YY|wo|ww?|WW?|M{1,4}|Do|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|ZZ?|./g
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// customParseFormat cannot parse week-years, ISO weeks or ordinal weeks.
// Extract those tokens, parse the remaining units, then verify a full round trip.
function parseWeek(value: string, format: string, locale: string): Dayjs | null {
  const tokens = format.match(weekTokens) ?? []
  const weekToken = tokens.find(token => /^(?:wo|ww?|WW?)$/.test(token))
  if (!weekToken)
    return null
  let capturedWeek = false
  const pattern = tokens.map((token) => {
    if (/^(?:gggg|GGGG|YYYY|YY)$/.test(token))
      return `\\d{${token === 'YY' ? 2 : 4}}`
    if (token === weekToken) {
      if (capturedWeek)
        return '\\k<week>'
      capturedWeek = true
      return '(?<week>\\d{1,2}[^\\d]*?)'
    }
    return token.startsWith('[') ? escapeRegExp(token.slice(1, -1)) : /^[A-Z]+$/i.test(token) ? '.+?' : escapeRegExp(token)
  }).join('')
  const match = new RegExp(`^${pattern}$`).exec(value)
  if (!match?.groups)
    return null
  const week = Number.parseInt(match.groups.week, 10)
  if (week < 1 || week > 53)
    return null
  const parseFormat = tokens.map(token => token === weekToken ? `[${match.groups!.week}]` : /^(?:gggg|GGGG)$/.test(token) ? 'YYYY' : token).join('')
  const base = dayjs(value, parseFormat, locale, true)
  if (!base.isValid())
    return null
  const iso = weekToken.startsWith('W')
  // Calendar-year formats (YYYY-ww) can refer to the previous week-year
  // during the first days of January. Check both, accepting only exact matches.
  for (const yearOffset of [0, -1]) {
    let anchor = base.add(yearOffset, 'year').startOf('year')
    for (let index = 0; index < 7; index++, anchor = anchor.add(1, 'day')) {
      if ((iso ? anchor.isoWeek() : anchor.week()) === 1)
        break
    }
    const start = (iso ? anchor.isoWeek(week).startOf('isoWeek') : anchor.week(week).startOf('week'))
      .hour(base.hour())
      .minute(base.minute())
      .second(base.second())
      .millisecond(base.millisecond())
    for (let index = 0; index < 7; index++) {
      const candidate = start.add(index, 'day')
      if (candidate.format(format) === value)
        return candidate
    }
  }
  return null
}

export function parseDateValue(value: unknown, format: string, locale = dayjs.locale()): Dayjs | null {
  if (dayjs.isDayjs(value))
    return value.isValid() ? value : null
  if (typeof value !== 'string' || !value)
    return null
  if ((format.match(weekTokens) ?? []).some(token => /^(?:wo|ww?|WW?)$/.test(token)))
    return parseWeek(value, format, locale)
  const date = dayjs(value, format, locale, true)
  return date.isValid() ? date : null
}

export function mapDateValue(picker?: string) {
  return mapProps((props) => {
    const config = useContext(ConfigProvider.ConfigContext)
    const format = props.valueFormat ?? getDateValueFormat(picker ?? props.picker, props.showTime)
    delete props.valueFormat
    if (format === false)
      return props
    const localeName = (props.locale ?? config.locale?.DatePicker)?.lang?.locale?.replace('_', '-').toLowerCase() || 'en'
    const locale = dayjs().locale(localeName === 'en-us' ? 'en' : localeName).locale()
    const parse = (value: unknown) => {
      if (value === undefined)
        return undefined
      if (!Array.isArray(value))
        return parseDateValue(value, format, locale)
      const dates = value.map(item => parseDateValue(item, format, locale))
      return props.multiple ? dates.filter(date => date !== null) : dates
    }
    const serialize = (value: Dayjs | null): string | null => value?.format(format) ?? null
    const onChange = props.onChange
    return {
      ...('value' in props ? { value: parse(props.value) } : {}),
      ...('defaultValue' in props ? { defaultValue: parse(props.defaultValue) } : {}),
      onChange: (value: Dayjs | (Dayjs | null)[] | null, dateStrings: string | string[] | null) => {
        onChange?.(Array.isArray(value) ? value.map(serialize) : serialize(value), dateStrings)
      },
    }
  })
}
