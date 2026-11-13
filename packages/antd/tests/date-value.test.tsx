import type { ComponentRef } from 'react'
import { createForm } from '@silver-formily/core'
import { createSchemaField, Field } from '@silver-formily/react'
import dayjs from 'dayjs'
import { createRef } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { DatePicker, Form, FormItem, TimePicker } from '../src'
import { getDateValueFormat, parseDateValue } from '../src/__builtins__/date-value'
import 'dayjs/locale/zh-cn'

afterEach(cleanup)

it.each([
  ['2026-11-06', 'YYYY-MM-DD'],
  ['06/11/2026', 'DD/MM/YYYY'],
  ['2026-11', 'YYYY-MM'],
  ['2026', 'YYYY'],
  ['2026-Q4', 'YYYY-[Q]Q'],
  ['09:30:45', 'HH:mm:ss'],
  ['2026-11-06 09:30:45', 'YYYY-MM-DD HH:mm:ss'],
  ['2027-1st', 'gggg-wo'],
  ['2026-53', 'GGGG-WW'],
  ['2027-01', 'gggg-ww'],
  ['2026-W53', 'GGGG-[W]WW'],
])('round trips %s using %s', (value, format) => {
  const parsed = parseDateValue(value, format, 'en')
  expect(parsed?.isValid()).toBe(true)
  expect(parsed?.format(format)).toBe(value)
})

it('handles locale week-year boundaries and rejects invalid dates without rollover', () => {
  expect(parseDateValue('2021-53周', 'YYYY-wo', 'zh-cn')?.format('YYYY-wo')).toBe('2021-53周')
  expect(parseDateValue('2020-53周', 'gggg-wo', 'zh-cn')?.format('gggg-wo')).toBe('2020-53周')
  for (const [value, format] of [['2026-02-30', 'YYYY-MM-DD'], ['2026-Q5', 'YYYY-[Q]Q'], ['25:00:00', 'HH:mm:ss'], ['2026-54', 'GGGG-WW'], ['2021-53', 'GGGG-WW'], ['', 'YYYY-MM-DD'], ['invalid', 'YYYY-MM-DD']])
    expect(parseDateValue(value, format)).toBeNull()
})

it.each([
  ['date', false, 'YYYY-MM-DD'],
  ['week', false, 'YYYY-MM-DD'],
  ['month', false, 'YYYY-MM'],
  ['year', false, 'YYYY'],
  ['quarter', false, 'YYYY-[Q]Q'],
  ['time', false, 'HH:mm:ss'],
  ['date', true, 'YYYY-MM-DD HH:mm:ss'],
])('selects the independent default format for %s (showTime=%s)', (picker, showTime, expected) => {
  expect(getDateValueFormat(picker, showTime)).toBe(expected)
})

it('stores strings, preserves display callback text and ref, resets and submits through Field', async () => {
  const form = createForm({ initialValues: { date: '2026-11-06' } })
  const onChange = vi.fn()
  const ref = createRef<ComponentRef<typeof DatePicker>>()
  const { container, getByRole, getByText } = await render(
    <Form form={form}>
      <Field name="date" title="Date" decorator={[FormItem]} component={[DatePicker, { ref: (instance) => { ref.current = instance }, format: 'DD/MM/YYYY', onChange }]} />
    </Form>,
  )
  expect(ref.current?.nativeElement).toBe(container.querySelector('.ant-picker'))
  await expect.element(getByRole('textbox')).toHaveValue('06/11/2026')
  await getByRole('textbox').fill('07/11/2026')
  await userEvent.keyboard('{Enter}')
  await vi.waitFor(() => expect(form.values.date).toBe('2026-11-07'))
  expect(onChange).toHaveBeenLastCalledWith('2026-11-07', '07/11/2026')
  const submit = vi.fn()
  await form.submit(submit)
  expect(submit.mock.calls[0][0].date).toBe('2026-11-07')
  form.setPattern('readPretty')
  await expect.element(getByText('07/11/2026')).toBeVisible()
  expect(form.values.date).toBe('2026-11-07')
  form.setPattern('editable')
  await form.reset()
  await expect.element(getByRole('textbox')).toHaveValue('06/11/2026')
  await page.elementLocator(container.querySelector('.ant-picker-clear')!).click()
  expect(form.values.date).toBeNull()
  expect(onChange).toHaveBeenLastCalledWith(null, null)
})

it('supports Schema value formats, partial ranges and native calendar callback values', async () => {
  const form = createForm({ initialValues: { range: ['06/11/2026', null] } })
  const onCalendarChange = vi.fn()
  const SchemaField = createSchemaField({ components: { DatePicker } })
  const { getByRole, container } = await render(
    <Form form={form}>
      <SchemaField schema={{ type: 'object', properties: { range: { 'type': 'array', 'x-component': 'DatePicker.RangePicker', 'x-component-props': { valueFormat: 'DD/MM/YYYY', allowEmpty: [false, true], onCalendarChange } } } }} />
    </Form>,
  )
  const inputs = getByRole('textbox')
  await expect.element(inputs.first()).toHaveValue('2026-11-06')
  await expect.element(inputs.last()).toHaveValue('')
  await inputs.first().fill('2026-11-08')
  await userEvent.keyboard('{Enter}')
  await inputs.last().fill('2026-11-09')
  await userEvent.keyboard('{Enter}')
  await vi.waitFor(() => expect(form.values.range).toEqual(['08/11/2026', '09/11/2026']))
  expect(dayjs.isDayjs(onCalendarChange.mock.calls.at(-1)?.[0][0])).toBe(true)
  form.setPattern('readPretty')
  await vi.waitFor(() => expect(container.textContent).toContain('2026-11-08 ~ 2026-11-09'))
})

it('serializes multiple selections and keeps custom formats out of native DOM props', async () => {
  const onChange = vi.fn()
  const form = createForm({ initialValues: { dates: ['2026/11/06'] } })
  const { container } = await render(<Form form={form}><Field name="dates" component={[DatePicker, { multiple: true, valueFormat: 'YYYY/MM/DD', onChange }]} /></Form>)
  await page.elementLocator(container.querySelector('.ant-picker')!).click()
  await page.elementLocator(document.querySelector('td[title="2026-11-07"]')!).click()
  await userEvent.keyboard('{Escape}')
  await vi.waitFor(() => expect(form.values.dates).toEqual(['2026/11/06', '2026/11/07']))
  expect(onChange).toHaveBeenLastCalledWith(['2026/11/06', '2026/11/07'], ['2026-11-06', '2026-11-07'])
  expect(container.querySelector('[valueFormat]')).toBeNull()
})

it('supports native Dayjs mode and preserves identity in the callback', async () => {
  const form = createForm({ initialValues: { date: dayjs('2026-11-06') } })
  const onChange = vi.fn()
  const { getByRole } = await render(<Form form={form}><Field name="date" component={[DatePicker, { valueFormat: false, onChange }]} /></Form>)
  await getByRole('textbox').fill('2026-11-07')
  await userEvent.keyboard('{Enter}')
  await vi.waitFor(() => expect(onChange).toHaveBeenCalled())
  expect(dayjs.isDayjs(form.values.date)).toBe(true)
  expect(form.values.date).toBe(onChange.mock.calls.at(-1)![0])
})

it('handles defaultValue, invalid strings and Dayjs migration inputs without rewriting fields', async () => {
  const initial = dayjs('2026-11-06')
  const ref = createRef<ComponentRef<typeof DatePicker>>()
  const form = createForm({ initialValues: { invalid: '2026-02-30', date: initial } })
  const { getByRole, container } = await render(
    <Form form={form}>
      <DatePicker ref={ref} value={undefined} defaultValue="2026-11-06" />
      <Field name="invalid" component={[DatePicker]} />
      <Field name="date" component={[DatePicker]} />
    </Form>,
  )
  expect(ref.current?.nativeElement).toBe(container.querySelector('.ant-picker'))
  await expect.element(getByRole('textbox').nth(0)).toHaveValue('2026-11-06')
  await expect.element(getByRole('textbox').nth(1)).toHaveValue('')
  await expect.element(getByRole('textbox').nth(2)).toHaveValue('2026-11-06')
  form.setPattern('readPretty')
  await vi.waitFor(() => expect(container.textContent).toContain('N/A'))
  expect(form.values.invalid).toBe('2026-02-30')
  expect(form.values.date).toBe(initial)
})

it('applies defaults to every static picker and independent time ranges in readPretty', async () => {
  const form = createForm({ pattern: 'readPretty', initialValues: {
    week: '2026-11-06',
    month: '2026-11',
    year: '2026',
    quarter: '2026-Q4',
    time: '09:30:45',
    range: ['09:30:45', null],
  } })
  const { container } = await render(
    <Form form={form}>
      <Field name="week" component={[DatePicker.WeekPicker, { format: 'YYYY-MM-DD' }]} />
      <Field name="month" component={[DatePicker.MonthPicker]} />
      <Field name="year" component={[DatePicker.YearPicker]} />
      <Field name="quarter" component={[DatePicker.QuarterPicker]} />
      <Field name="time" component={[DatePicker.TimePicker]} />
      <Field name="range" component={[TimePicker.RangePicker, { format: 'hh:mm a' }]} />
    </Form>,
  )
  for (const text of ['2026-11-06', '2026-11', '2026', '2026-Q4', '09:30:45', '09:30 am ~ N/A'])
    expect(container.textContent).toContain(text)
})

it('keeps time submission independent of 12-hour display and supports custom time formats', async () => {
  const form = createForm({ initialValues: { time: '09:30:45' } })
  const onChange = vi.fn()
  const { getByRole } = await render(<Form form={form}><Field name="time" component={[TimePicker, { use12Hours: true, format: 'hh:mm:ss a', needConfirm: false, onChange }]} /></Form>)
  await getByRole('textbox').fill('02:15:20 pm')
  await userEvent.keyboard('{Enter}')
  await vi.waitFor(() => expect(form.values.time).toBe('14:15:20'))
  expect(onChange).toHaveBeenLastCalledWith('14:15:20', '02:15:20 pm')
})
