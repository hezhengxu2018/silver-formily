import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import PrecisionDemo from '../../../apps/antd-mobile-docs/zh/demos/date-picker/precision'
import WeekQuarterDemo from '../../../apps/antd-mobile-docs/zh/demos/date-picker/week-quarter'
import { DatePicker, FormItem } from '../src'
import { generateDatePickerColumns } from '../src/date-picker/date-quarter-utils'

afterEach(cleanup)

it('renders formatted value with default date format', async () => {
  const form = createForm({ initialValues: { date: '2024-03-15' } })
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field name="date" component={[DatePicker]} />
    </FormProvider>,
  )

  await expect.element(getByText('2024-03-15')).toBeInTheDocument()
})

it('renders month picker with month format', async () => {
  const form = createForm({ initialValues: { month: '2024-03' } })
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="month"
        component={[DatePicker, { picker: 'month' }]}
      />
    </FormProvider>,
  )

  await expect.element(getByText('2024-03')).toBeInTheDocument()
})

it('shows placeholder when value is empty', async () => {
  const form = createForm()
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="date"
        component={[DatePicker, { placeholder: '请选择日期' }]}
      />
    </FormProvider>,
  )

  await expect.element(getByText('请选择日期')).toBeInTheDocument()
})


it('opens from the row, confirms formatted values and restores focus', async () => {
  const form = createForm({ initialValues: { date: '2024-03-15' } })
  const onConfirm = vi.fn()
  const onClose = vi.fn()
  const afterClose = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="date" title="日期" decorator={[FormItem]} component={[DatePicker, { onConfirm, onClose, afterClose }]} /></FormProvider>)
  await screen.getByText('日期', { exact: true }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-picker-popup')).not.toBeNull())
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  await vi.waitFor(() => expect(afterClose).toHaveBeenCalledOnce())
  expect(onClose).toHaveBeenCalledOnce()
  expect(onConfirm).toHaveBeenCalledWith(expect.any(Date))
  expect(form.values.date).toBe('2024-03-15')
  expect(document.activeElement).toBe(document.querySelector('.adm-formily-date-picker-trigger'))
})

it.each(['disabled', 'readOnly', 'readPretty'] as const)('protects the value in %s mode', async (pattern) => {
  const form = createForm({ initialValues: { date: '2024-03' } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="date" title="日期" pattern={pattern} decorator={[FormItem, { clearable: true }]} component={[DatePicker, { picker: 'month', onChange }]} /></FormProvider>)
  await expect.element(screen.getByText('2024-03', { exact: true })).toBeInTheDocument()
  expect(document.querySelector('.adm-formily-item-clear')).toBeNull()
  if (pattern === 'readOnly') {
    await screen.getByRole('button', { name: '日期', exact: true }).click()
    await vi.waitFor(() => expect(document.querySelector('.adm-formily-date-picker-readonly-popup')).not.toBeNull())
    document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  }
  else if (pattern === 'disabled') {
    await expect.element(screen.getByRole('button', { name: '日期', exact: true })).toBeDisabled()
  }
  else {
    expect(document.querySelector('.adm-formily-date-picker-trigger')).toBeNull()
  }
  expect(onChange).not.toHaveBeenCalled()
  expect(form.values.date).toBe('2024-03')
})

it('clears without opening the popup', async () => {
  const form = createForm({ initialValues: { date: '2024-03-15' } })
  const screen = await render(<FormProvider form={form}><Field name="date" title="日期" decorator={[FormItem, { clearable: true }]} component={[DatePicker]} /></FormProvider>)
  expect(document.querySelectorAll('.adm-list-item-content-arrow')).toHaveLength(1)
  expect(document.querySelector('.adm-list-item-content-arrow .adm-formily-item-clear')).not.toBeNull()
  await screen.getByRole('button', { name: '清除' }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-item-clear')).toBeNull())
  expect(document.querySelectorAll('.adm-list-item-content-arrow')).toHaveLength(1)
  expect(form.values.date).toBeUndefined()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
})


it('confirms quarter values with the quarter format', async () => {
  const form = createForm({ initialValues: { date: '2024-Q2' } })
  const screen = await render(<FormProvider form={form}><Field name="date" component={[DatePicker, { picker: 'quarter' }]} /></FormProvider>)
  await screen.getByRole('button', { name: '2024-Q2', exact: true }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-picker-popup')).not.toBeNull())
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  expect(form.values.date).toBe('2024-Q2')
})


it.each([
  ['month', '2024-03', 2],
  ['year', '2024', 1],
  ['week', '2024-W09', 2],
  ['week', '2020-W53', 2],
  ['quarter', '2024-Q1', 2],
] as const)('renders and round-trips %s value %s with the correct columns', async (picker, value, columns) => {
  const form = createForm({ initialValues: { date: value } })
  const screen = await render(<FormProvider form={form}><Field name="date" component={[DatePicker, { picker }]} /></FormProvider>)
  await screen.getByRole('button', { name: value, exact: true }).click()
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-picker-view-column')).toHaveLength(columns))
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  expect(form.values.date).toBe(value)
})


it.each([
  ['选择月份', '2024-03', 2],
  ['选择年份', '2024', 1],
  ['日期时间', '2024-03-01 10:30:00', 6],
  ['选择周', '2024-W09', 2],
  ['选择季度', '2024-Q1', 2],
] as const)('opens the actual %s demo with the correct precision', async (title, value, columns) => {
  const screen = await render(title === '选择周' || title === '选择季度' ? <WeekQuarterDemo /> : <PrecisionDemo />)
  const trigger = screen.getByRole('button', { name: title, exact: true })
  await expect.element(trigger).toHaveTextContent(value)
  await trigger.click()
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-picker-view-column')).toHaveLength(columns))
})


it('passes selection metadata to quarter renderLabel callbacks', () => {
  const renderLabel = vi.fn((type, value, info) => `${type}:${value}:${info.selected}`)
  const columns = generateDatePickerColumns(
    ['2024', '2'],
    new Date(2024, 0, 1),
    new Date(2024, 11, 31),
    'quarter',
    renderLabel,
    undefined,
  )
  expect(columns).toEqual([
    [{ label: 'year:2024:true', value: '2024' }],
    [1, 2, 3, 4].map(value => ({ label: `quarter:${value}:${value === 2}`, value: String(value) })),
  ])
  expect(renderLabel).toHaveBeenCalledWith('quarter', 2, { selected: true })
})
