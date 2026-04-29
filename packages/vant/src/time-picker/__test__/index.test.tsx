import type { PickerGroupDefaultSlotProps } from '../../picker-group'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { h } from 'vue'
import FormProviderComponent from '../../form'
import FormItem from '../../form-item'
import PickerGroup from '../../picker-group'
import TimePickerPanel from '../../time-picker-panel'
import TimePicker from '../index'
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

function getVisiblePopup() {
  const popup = getVisiblePicker()?.closest<HTMLElement>('.van-popup')

  if (!popup)
    throw new Error('Visible popup not found')

  return popup
}

function getVisibleOverlay() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-overlay')).find((overlay) => {
    return window.getComputedStyle(overlay).display !== 'none'
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

function getPickerConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('TimePicker confirm button not found')

  return button
}

function getCancelButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__cancel')

  if (!button)
    throw new Error('TimePicker cancel button not found')

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

describe('time-picker', () => {
  it('应该给 popup trigger 补齐和 Field 一致的标签关联属性', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePicker, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    const label = container.querySelector('label')
    const input = getTrigger(container)

    expect(label).not.toBeNull()
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.id)
    expect(input).toHaveAttribute('aria-labelledby', label!.id)
    expect(input).toHaveAttribute('data-allow-mismatch', 'attribute')
  })

  it('应该在确认后写回时间字符串并更新字段展示', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePicker, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).toHaveAttribute('placeholder', '请选择时间')
    expect(trigger).toHaveAttribute('readonly')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getVisibleOption('10', 0))
    await userEvent.click(getVisibleOption('15', 1))
    await userEvent.click(getPickerConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('10:15')
      expect(trigger.value).toBe('10:15')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该在取消时回滚临时选择', async () => {
    const form = createForm({
      values: {
        appointmentTime: '09:30',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePicker, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('09:30')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getVisibleOption('11', 0))
    await userEvent.click(getVisibleOption('45', 1))
    await userEvent.click(getCancelButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('09:30')
      expect(trigger.value).toBe('09:30')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该在点击遮罩关闭时回滚临时选择', async () => {
    const form = createForm({
      values: {
        appointmentTime: '09:30',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePicker, {
            maxTime,
            minTime,
            popupProps: {
              duration: 0.01,
            },
          }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleOverlay()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('11', 0))
    await userEvent.click(getVisibleOverlay() as HTMLElement)

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('09:30')
      expect(trigger.value).toBe('09:30')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该默认允许在 disabled、readonly 下打开只读弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="disabledTime"
          title="禁用"
          decorator={[FormItem]}
          component={[TimePicker, { disabled: true, maxTime, minTime }]}
        />
        <Field
          name="readonlyTime"
          title="只读"
          decorator={[FormItem]}
          component={[TimePicker, { maxTime, minTime, readonly: true }]}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container, 0))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getCancelButton())
    await userEvent.click(getTrigger(container, 1))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getCancelButton())
  })

  it('应该在 disableTriggerWhenInactive 下于 trigger 层阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="disabledTime"
          title="禁用"
          decorator={[FormItem]}
          component={[TimePicker, { disableTriggerWhenInactive: true, disabled: true, maxTime, minTime }]}
        />
        <Field
          name="readonlyTime"
          title="只读"
          decorator={[FormItem]}
          component={[TimePicker, { disableTriggerWhenInactive: true, maxTime, minTime, readonly: true }]}
        />
      </FormProvider>
    ))

    getTrigger(container, 0).click()
    getTrigger(container, 1).click()

    await vi.waitFor(() => {
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该通过 popupProps 透传 Popup 配置，并继续触发 opened / closed 事件', async () => {
    const onOpened = vi.fn()
    const onClosed = vi.fn()
    const popupProps = {
      duration: 0.01,
      overlay: false,
      position: 'top',
      round: false,
    } as const
    const { container } = render(() => h(TimePicker, {
      maxTime,
      minTime,
      popupProps,
      onClosed,
      onOpened,
    }))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      const overlay = document.querySelector<HTMLElement>('.van-overlay')

      expect(getVisiblePicker()).not.toBeNull()
      expect(getVisiblePopup()).toHaveClass('van-popup--top')
      expect(getVisiblePopup()).not.toHaveClass('van-popup--round-top')
      if (overlay) {
        expect(window.getComputedStyle(overlay).display).toBe('none')
      }
      expect(onOpened).toHaveBeenCalledOnce()
    })

    await userEvent.click(getPickerConfirmButton())

    await vi.waitFor(() => {
      expect(getVisiblePicker()).toBeNull()
      expect(onClosed).toHaveBeenCalledOnce()
    })
  })

  it('应该支持通过 valueFormat 自定义提交值格式，并用 format 控制展示格式', async () => {
    const form = createForm({
      values: {
        appointmentTime: '09-30-15',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePicker, {
            columnsType: ['hour', 'minute', 'second'],
            format: 'HH时mm分ss秒',
            maxTime,
            minTime,
            valueFormat: 'HH-mm-ss',
          }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('09时30分15秒')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
    })

    expect(getVisibleSelectedTexts()).toEqual(['09', '30', '15'])

    await userEvent.click(getVisibleOption('20', 2))
    await userEvent.click(getPickerConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointmentTime).toBe('09-30-20')
      expect(trigger.value).toBe('09时30分20秒')
    })
  })

  it('应该在 readPretty 模式下展示时间文本', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="appointmentTime"
          initialValue="09:30"
          readPretty={true}
          component={[TimePicker, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('09:30')
  })

  it('应该保留超出范围的原始字段值展示，不在封装层自动修正', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm({
        values: {
          appointmentTime: '08:20',
        },
      })}
      >
        <Field
          name="appointmentTime"
          title="预约时间"
          decorator={[FormItem]}
          component={[TimePicker, { maxTime, minTime }]}
        />
      </FormProvider>
    ))

    expect(getTrigger(container).value).toBe('08:20')
  })

  it('应该能和 TimePickerPanel 一起作为 PickerGroup 默认插槽子组件工作', async () => {
    const form = createForm({
      values: {
        schedule: ['09:30', '10:15:20'],
      },
    })

    const { container } = render(() => (
      <FormProviderComponent form={form}>
        <Field
          name="schedule"
          title="营业时段"
          decorator={[FormItem]}
          component={[PickerGroup, {
            displayFormatter: (value) => {
              return (value ?? [])
                .map(item => String(item ?? ''))
                .filter(Boolean)
                .join(' / ')
            },
          }]}
          dataSource={[
            { title: '开始时间' },
            { title: '结束时间' },
          ]}
        >
          {{
            default: ({ panelProps }: PickerGroupDefaultSlotProps) => [
              <TimePickerPanel
                {...(panelProps[0] as any)}
                minTime={minTime}
                maxTime={maxTime}
              />,
              <TimePickerPanel
                {...(panelProps[1] as any)}
                columnsType={['hour', 'minute', 'second']}
                minTime={minTime}
                maxTime={maxTime}
              />,
            ],
          }}
        </Field>
      </FormProviderComponent>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('09:30 / 10:15:20')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerGroup()).not.toBeNull()
      expect(getVisibleGroupPickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getVisibleGroupOption('10', 0))
    await userEvent.click(getPickerGroupConfirmButton())

    await vi.waitFor(() => {
      expect(getVisibleGroupPickerColumns()).toHaveLength(3)
    })

    await userEvent.click(getPickerGroupConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.schedule).toEqual(['10:30', '10:15:20'])
      expect(trigger.value).toBe('10:30 / 10:15:20')
      expect(getVisiblePickerGroup()).toBeNull()
    })
  })
})
