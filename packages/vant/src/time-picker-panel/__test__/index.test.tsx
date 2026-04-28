import type { PickerOption } from '../../picker'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import FormItem from '../../form-item'
import TimePickerPanel from '../index'
import 'vant/lib/index.css'

const minTime = '09:00:00'
const maxTime = '21:30:30'

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
      throw new Error('Selected time picker item not found')

    return selected.textContent?.trim() ?? ''
  })
}

function getConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('TimePickerPanel confirm button not found')

  return button
}

function getCancelButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__cancel')

  if (!button)
    throw new Error('TimePickerPanel cancel button not found')

  return button
}

describe('time-picker-panel', () => {
  it('应该直接渲染滚轮，并只在确认后写回时间字符串', async () => {
    const form = createForm({
      values: {
        appointmentTime: '09:30',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePickerPanel, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
      expect(document.querySelector('.van-popup')).toBeNull()
      expect(getVisibleSelectedTexts()).toEqual(['09', '30'])
    })

    getVisibleOption('10', 0).click()
    getVisibleOption('15', 1).click()

    expect(form.values.appointmentTime).toBe('09:30')

    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('10:15')
      expect(getVisibleSelectedTexts()).toEqual(['10', '15'])
    })
  })

  it('应该支持秒列、valueFormat 和格式化配置', async () => {
    const form = createForm({
      values: {
        appointmentTime: '09-30-15',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          component={[TimePickerPanel, {
            columnsType: ['hour', 'minute', 'second'],
            format: 'HH时mm分ss秒',
            maxTime,
            minTime,
            valueFormat: 'HH-mm-ss',
          }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
      expect(getVisibleSelectedTexts()).toEqual(['09', '30', '15'])
    })

    getVisibleOption('20', 2).click()
    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('09-30-20')
      expect(getVisibleSelectedTexts()).toEqual(['09', '30', '20'])
    })
  })

  it('应该支持 filter 与 formatter', async () => {
    const form = createForm({
      values: {
        appointmentTime: '10:00',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          component={[TimePickerPanel, {
            filter: (type, options) => {
              if (type === 'minute')
                return options.filter(option => Number(option.value) % 15 === 0)

              return options
            },
            formatter: (type, option) => {
              return {
                ...option,
                text: type === 'hour' ? `${option.text}时` : `${option.text}分`,
              }
            },
            maxTime,
            minTime,
          }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['10时', '00分'])
    })

    expect(getVisibleOption('15分', 1)).not.toBeNull()
    expect(getVisibleOption('16分', 1)).toBeUndefined()

    getVisibleOption('15分', 1).click()
    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('10:15')
    })
  })

  it('应该在取消时回滚临时选择', async () => {
    const form = createForm({
      values: {
        appointmentTime: '09:30',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          component={[TimePickerPanel, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['09', '30'])
    })

    getVisibleOption('11', 0).click()
    getVisibleOption('45', 1).click()
    getCancelButton().click()

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('09:30')
      expect(getVisibleSelectedTexts()).toEqual(['09', '30'])
    })
  })

  it.each([
    ['disabled', { disabled: true }],
    ['readonly', { readonly: true }],
  ])('应该在 %s 下让内部滚轮进入只读态', async (_name, panelProps) => {
    const form = createForm({
      values: {
        appointmentTime: '09:30',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          component={[TimePickerPanel, { ...panelProps, maxTime, minTime }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['09', '30'])
    })

    getVisibleOption('10', 0).click()
    getConfirmButton().click()

    await waitForAnimationFrame()

    expect(form.values.appointmentTime).toBe('09:30')
    expect(getVisibleSelectedTexts()).toEqual(['09', '30'])
  })

  it('应该透传 title、cancel、confirm、option、columns-top、columns-bottom 插槽', async () => {
    render(() => (
      <TimePickerPanel maxTime={maxTime} minTime={minTime}>
        {{
          'title': () => <div class="time-picker-panel-slot-title">自定义标题</div>,
          'cancel': () => <span class="time-picker-panel-slot-cancel">返回</span>,
          'confirm': () => <span class="time-picker-panel-slot-confirm">确定提交</span>,
          'option': (option: PickerOption) => <div class="time-picker-panel-slot-option">{option.text}</div>,
          'columns-top': () => <div class="time-picker-panel-slot-top">顶部说明</div>,
          'columns-bottom': () => <div class="time-picker-panel-slot-bottom">底部说明</div>,
        }}
      </TimePickerPanel>
    ))

    await vi.waitFor(() => {
      expect(document.querySelector('.time-picker-panel-slot-title')).not.toBeNull()
      expect(document.querySelector('.time-picker-panel-slot-cancel')).not.toBeNull()
      expect(document.querySelector('.time-picker-panel-slot-confirm')).not.toBeNull()
      expect(document.querySelector('.time-picker-panel-slot-option')).not.toBeNull()
      expect(document.querySelector('.time-picker-panel-slot-top')).not.toBeNull()
      expect(document.querySelector('.time-picker-panel-slot-bottom')).not.toBeNull()
    })
  })

  it('应该透传 toolbar 插槽', async () => {
    render(() => (
      <TimePickerPanel maxTime={maxTime} minTime={minTime}>
        {{
          toolbar: () => <div class="time-picker-panel-slot-toolbar">自定义工具栏</div>,
        }}
      </TimePickerPanel>
    ))

    await vi.waitFor(() => {
      expect(document.querySelector('.time-picker-panel-slot-toolbar')).not.toBeNull()
    })
  })
})
