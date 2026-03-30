import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { TimePicker as VanTimePicker } from 'vant'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Form from '../../form'
import FormButtonGroup from '../../form-button-group'
import FormItem from '../../form-item'
import PickerGroup from '../../picker-group'
import Submit from '../../submit'
import DatePicker from '../index'
import 'vant/lib/index.css'

const minDate = new Date(2025, 0, 1)
const maxDate = new Date(2027, 11, 31)

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

afterEach(async () => {
  await waitForAnimationFrame()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

function getTrigger(container: Element, index = 0) {
  return container.querySelectorAll<HTMLInputElement>('input.van-field__control')[index]!
}

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

function getVisiblePickerGroup() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-picker-group')).find((group) => {
    const popup = group.closest<HTMLElement>('.van-popup')

    if (!popup)
      return true

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getPickerGroupConfirmButton() {
  const button = getVisiblePickerGroup()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('PickerGroup confirm button not found')

  return button
}

function getVisibleActivePanel() {
  const group = getVisiblePickerGroup()

  if (!group)
    throw new Error('Visible PickerGroup not found')

  const panel = Array.from(group.querySelectorAll<HTMLElement>('.van-tab__panel-wrapper')).find((item) => {
    return !item.classList.contains('van-tab__panel-wrapper--inactive')
  }) ?? group.querySelector<HTMLElement>('.van-tab__panel-wrapper')

  if (!panel)
    throw new Error('Visible tab panel not found')

  return panel
}

function getVisibleGroupPicker() {
  const picker = getVisibleActivePanel().querySelector<HTMLElement>('.van-picker')

  if (!picker)
    throw new Error('Visible group picker not found')

  return picker
}

function getVisibleGroupPickerColumns() {
  return Array.from(getVisibleGroupPicker().querySelectorAll<HTMLElement>('.van-picker-column'))
}

function getVisibleGroupOption(text: string, columnIndex = 0) {
  return Array.from(getVisibleGroupPickerColumns()[columnIndex].querySelectorAll<HTMLElement>('.van-picker-column__item')).find((element) => {
    return element.textContent?.trim() === text
  })!
}

describe('date-picker', () => {
  it('应该在确认后写回日期字符串并更新字段展示', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePicker, { minDate, maxDate }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).toHaveAttribute('placeholder', '请选择日期')
    expect(trigger).toHaveAttribute('readonly')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
    })

    await userEvent.click(getVisibleOption('2026', 0))
    await userEvent.click(getVisibleOption('05', 1))
    await userEvent.click(getVisibleOption('20', 2))
    await userEvent.click(getPickerConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('2026-05-20')
      expect(trigger.value).toBe('2026-05-20')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该在取消时回滚临时选择', async () => {
    const form = createForm({
      values: {
        appointmentDate: '2026-03-30',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePicker, { minDate, maxDate }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('2026-03-30')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
    })

    await userEvent.click(getVisibleOption('12', 1))
    await userEvent.click(getVisibleOption('31', 2))
    await userEvent.click(getCancelButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('2026-03-30')
      expect(trigger.value).toBe('2026-03-30')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该支持通过 valueFormat 自定义提交值格式，并用 format 控制展示格式', async () => {
    const form = createForm({
      values: {
        appointmentDate: '30/03/2026',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePicker, {
            format: 'YYYY年MM月DD日',
            maxDate,
            minDate,
            valueFormat: 'DD/MM/YYYY',
          }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('2026年03月30日')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
    })

    expect(getVisibleSelectedTexts()).toEqual(['2026', '03', '30'])

    await userEvent.click(getVisibleOption('31', 2))
    await userEvent.click(getPickerConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('31/03/2026')
      expect(trigger.value).toBe('2026年03月31日')
    })
  })

  it('应该在提交回调里返回 valueFormat 格式的字符串值', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const form = createForm({
      values: {
        appointmentDate: '30/03/2026',
      },
    })

    const { container } = render(() => (
      <Form form={form}>
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePicker, {
            format: 'YYYY年MM月DD日',
            maxDate,
            minDate,
            valueFormat: 'DD/MM/YYYY',
          }]}
        />

        <FormButtonGroup>
          <Submit onSubmit={onSubmit}>
            查看结果
          </Submit>
        </FormButtonGroup>
      </Form>
    ))

    const trigger = getTrigger(container)

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
    })

    await userEvent.click(getVisibleOption('31', 2))
    await userEvent.click(getPickerConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentDate).toBe('31/03/2026')
    })

    const submitButton = Array.from(container.querySelectorAll<HTMLElement>('button')).find((element) => {
      return element.textContent?.trim() === '查看结果'
    })

    if (!submitButton)
      throw new Error('Submit button not found')

    await userEvent.click(submitButton)

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        appointmentDate: '31/03/2026',
      })
    })
  })

  it('应该在 readPretty 模式下展示日期文本', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="appointmentDate"
          initialValue="2026-03-30"
          readPretty={true}
          component={[DatePicker, { minDate, maxDate }]}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('2026-03-30')
  })

  it('应该在未传 minDate 和 maxDate 时也能正常回显初始值', async () => {
    const currentYear = new Date().getFullYear()
    const defaultValue = `${currentYear}-03-30`

    const { container } = render(() => (
      <FormProvider form={createForm({
        values: {
          appointmentDate: defaultValue,
        },
      })}
      >
        <Field
          name="appointmentDate"
          title="预约日期"
          decorator={[FormItem]}
          component={[DatePicker]}
        />
      </FormProvider>
    ))

    expect(getTrigger(container).value).toBe(defaultValue)
  })

  it('应该能作为 PickerGroup 默认插槽子组件以内联模式工作', async () => {
    const form = createForm({
      values: {
        schedule: ['2026-03-30', ['09', '30']],
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="schedule"
          title="预约时间"
          decorator={[FormItem]}
          component={[PickerGroup, {
            displayFormatter: (value) => {
              const [date = '', time = []] = value ?? []

              return [
                String(date ?? ''),
                Array.isArray(time) ? time.join(':') : String(time ?? ''),
              ].filter(Boolean).join(' / ')
            },
          }]}
          dataSource={[
            { title: '日期' },
            { title: '时间' },
          ]}
        >
          {{
            default: () => [
              <DatePicker minDate={minDate} maxDate={maxDate} />,
              <VanTimePicker />,
            ],
          }}
        </Field>
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('2026-03-30 / 09:30')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerGroup()).not.toBeNull()
      expect(getVisibleGroupPickerColumns()).toHaveLength(3)
    })

    await userEvent.click(getVisibleGroupOption('31', 2))
    await userEvent.click(getPickerGroupConfirmButton())

    await vi.waitFor(() => {
      expect(getVisibleGroupPickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getPickerGroupConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.schedule).toEqual(['2026-03-31', ['09', '30']])
      expect(trigger.value).toBe('2026-03-31 / 09:30')
      expect(getVisiblePickerGroup()).toBeNull()
    })
  })
})
