import type { ICalendarPickerProps } from '../src'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, expectTypeOf, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { CalendarPicker, FormItem } from '../src'

afterEach(cleanup)

it.each(['single', 'range'] as const)('confirms formatted %s values and restores focus', async (selectionMode) => {
  const value = selectionMode === 'range' ? ['2024-03-15', '2024-03-20'] : '2024-03-15'
  const form = createForm({ initialValues: { date: value } })
  const onConfirm = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="date" title="日期" decorator={[FormItem]} component={[CalendarPicker, { selectionMode, onConfirm, confirmText: '确认日期' }]} /></FormProvider>)
  await screen.getByText('日期', { exact: true }).click()
  await screen.getByRole('button', { name: '确认日期', exact: true }).click()
  expect(form.values.date).toEqual(value)
  expect(onConfirm).toHaveBeenCalledWith(selectionMode === 'range' ? [expect.any(Date), expect.any(Date)] : expect.any(Date))
  expect(document.activeElement).toBe(document.querySelector('.adm-formily-calendar-picker-trigger'))
})

it('keeps draft selection out of the form and resets it after cancellation', async () => {
  const form = createForm({ initialValues: { date: '2024-03-15' } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="date" component={[CalendarPicker, { onChange, confirmText: '确认日期' }]} /></FormProvider>)
  await screen.getByRole('button', { name: '2024-03-15', exact: true }).click()
  document.querySelectorAll<HTMLElement>('.adm-calendar-picker-view-cell')[20].click()
  expect(form.values.date).toBe('2024-03-15')
  expect(onChange).not.toHaveBeenCalled()
  document.querySelector<HTMLElement>('.adm-popup-close-icon')!.click()
  await screen.getByRole('button', { name: '2024-03-15', exact: true }).click()
  await screen.getByRole('button', { name: '确认日期', exact: true }).click()
  expect(form.values.date).toBe('2024-03-15')
})

it.each(['disabled', 'readOnly', 'readPretty'] as const)('protects values in %s mode', async (pattern) => {
  const form = createForm({ initialValues: { date: '2024-03-15' } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="date" title="日期" pattern={pattern} component={[CalendarPicker, { onChange, confirmText: '确认日期' }]} /></FormProvider>)
  await expect.element(screen.getByText('2024-03-15', { exact: true })).toBeInTheDocument()
  if (pattern === 'disabled') {
    await expect.element(screen.getByRole('button', { name: '日期', exact: true })).toBeDisabled()
  }
  else if (pattern === 'readOnly') {
    await screen.getByRole('button', { name: '日期', exact: true }).click()
    await screen.getByRole('button', { name: '确认日期', exact: true }).click()
  }
  else {
    expect(document.querySelector('.adm-formily-calendar-picker-trigger')).toBeNull()
  }
  expect(onChange).not.toHaveBeenCalled()
  expect(form.values.date).toBe('2024-03-15')
})

it('preserves mode-specific public value and callback types', () => {
  const single: ICalendarPickerProps = { value: new Date(), onChange: value => expectTypeOf(value).toEqualTypeOf<string | null>() }
  const range: ICalendarPickerProps = { selectionMode: 'range', value: ['2024-03-15', new Date()], onChange: value => expectTypeOf(value).toEqualTypeOf<[string, string] | null>() }
  // @ts-expect-error range mode requires a pair
  const invalid: ICalendarPickerProps = { selectionMode: 'range', value: '2024-03-15' }
  expect(single).toBeDefined()
  expect(range).toBeDefined()
  expect(invalid).toBeDefined()
})
