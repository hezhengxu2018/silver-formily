import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import FormItem from '../../form-item'
import DatePickerPanel from '../index'
import 'vant/lib/index.css'

const minDate = '2025-01-01'
const maxDate = '2027-12-31'
const slashMinDate = '01/01/2025'
const slashMaxDate = '31/12/2027'

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

afterEach(async () => {
  document.body.innerHTML = ''
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

function getVisiblePicker() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-picker')).find((picker) => {
    const popup = picker.closest<HTMLElement>('.van-popup')

    if (!popup)
      return true

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisiblePickerColumns() {
  const picker = getVisiblePicker()

  if (!picker)
    throw new Error('Visible picker not found')

  return Array.from(picker.querySelectorAll<HTMLElement>('.van-picker-column'))
}

function getVisibleOption(text: string, columnIndex = 0) {
  return Array.from(getVisiblePickerColumns()[columnIndex].querySelectorAll<HTMLElement>('.van-picker-column__item')).find((element) => {
    return element.textContent?.trim() === text
  })!
}

function getVisibleSelectedTexts() {
  return getVisiblePickerColumns().map((column) => {
    const selected = column.querySelector<HTMLElement>('.van-picker-column__item--selected')

    if (!selected)
      throw new Error('Selected date picker item not found')

    return selected.textContent?.trim() ?? ''
  })
}

function getPickerConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('DatePicker confirm button not found')

  return button
}

function getCancelButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__cancel')

  if (!button)
    throw new Error('DatePicker cancel button not found')

  return button
}

describe('date-picker-panel', () => {
  it('应该直接渲染滚轮，并只在确认后写回字段值', async () => {
    const form = createForm({
      values: {
        appointmentDate: '2026-03-30',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePickerPanel, { minDate, maxDate }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
      expect(document.querySelector('.van-popup')).toBeNull()
    })

    expect(getVisibleSelectedTexts()).toEqual(['2026', '03', '30'])

    getVisibleOption('05', 1).click()
    getVisibleOption('20', 2).click()

    expect(form.values.appointmentDate).toBe('2026-03-30')

    getPickerConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('2026-05-20')
      expect(getVisibleSelectedTexts()).toEqual(['2026', '05', '20'])
    })
  })

  it('应该在取消时回滚临时选择', async () => {
    const form = createForm({
      values: {
        appointmentDate: '2026-03-30',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePickerPanel, { minDate, maxDate }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['2026', '03', '30'])
    })

    getVisibleOption('12', 1).click()
    getVisibleOption('31', 2).click()
    getCancelButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('2026-03-30')
      expect(getVisibleSelectedTexts()).toEqual(['2026', '03', '30'])
    })
  })

  it('应该支持 valueFormat 和字符串边界值', async () => {
    const form = createForm({
      values: {
        appointmentDate: '30/03/2026',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePickerPanel, {
            format: 'YYYY年MM月DD日',
            maxDate: slashMaxDate,
            minDate: slashMinDate,
            valueFormat: 'DD/MM/YYYY',
          }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['2026', '03', '30'])
    })

    getVisibleOption('31', 2).click()
    getPickerConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('31/03/2026')
      expect(getVisibleSelectedTexts()).toEqual(['2026', '03', '31'])
    })
  })
})
