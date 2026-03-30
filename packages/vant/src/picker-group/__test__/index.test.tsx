import type { PickerGroupDataSource } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { Picker as VanPicker } from 'vant'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FormItem from '../../form-item'
import PreviewText from '../../preview-text'
import PickerGroup from '../index'
import 'vant/lib/index.css'

const appointmentOptions: PickerGroupDataSource = [
  {
    title: '城市',
    options: [
      { label: '杭州', value: 'hz' },
      { text: '上海', value: 'sh' },
      { label: '苏州', name: 'sz' },
    ],
  },
  {
    title: '时段',
    options: [
      { label: '上午', value: 'am' },
      { text: '晚上', value: 'pm' },
    ],
  },
]

const emptyOptions: PickerGroupDataSource = [
  {
    title: '空状态',
    options: [],
  },
]

const customContentTabs: PickerGroupDataSource = [
  {
    title: '城市',
  },
  {
    title: '时段',
  },
]

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

function getVisiblePickerGroup() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-picker-group')).find((group) => {
    const popup = group.closest<HTMLElement>('.van-popup')

    if (!popup)
      return true

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisibleActiveTab() {
  const tab = getVisiblePickerGroup()?.querySelector<HTMLElement>('.van-tab--active')

  if (!tab)
    throw new Error('Visible active tab not found')

  return tab
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

function getVisiblePicker() {
  const picker = getVisibleActivePanel().querySelector<HTMLElement>('.van-picker')

  if (!picker)
    throw new Error('Visible picker not found')

  return picker
}

function queryVisibleOption(text: string) {
  return Array.from(getVisiblePicker().querySelectorAll<HTMLElement>('.van-picker-column__item')).find((element) => {
    return element.textContent?.trim() === text
  }) ?? null
}

function getVisibleOptionOrThrow(text: string) {
  const option = queryVisibleOption(text)

  if (!option)
    throw new Error(`Visible option not found: ${text}`)

  return option
}

function getConfirmButton() {
  const button = getVisiblePickerGroup()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('PickerGroup confirm button not found')

  return button
}

function getCancelButton() {
  const button = getVisiblePickerGroup()?.querySelector<HTMLElement>('.van-picker__cancel')

  if (!button)
    throw new Error('PickerGroup cancel button not found')

  return button
}

function getVisibleOverlay() {
  const overlay = Array.from(document.querySelectorAll<HTMLElement>('.van-overlay')).find((element) => {
    return window.getComputedStyle(element).display !== 'none'
  })

  if (!overlay)
    throw new Error('Visible overlay not found')

  return overlay
}

describe('picker-group', () => {
  it('应该通过 dataSource 生成 tabs，并在最后一步确认后写回扁平数组值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointment"
          title="预约信息"
          decorator={[FormItem]}
          component={[PickerGroup]}
          dataSource={appointmentOptions}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).toHaveAttribute('placeholder', '请选择选项')
    expect(trigger).toHaveAttribute('readonly')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerGroup()).not.toBeNull()
      expect(getVisibleActiveTab().textContent).toContain('城市')
      expect(getConfirmButton().textContent).toContain('下一步')
    })

    await userEvent.click(getVisibleOptionOrThrow('上海'))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointment).toBeUndefined()
      expect(getVisibleActiveTab().textContent).toContain('时段')
    })

    await vi.waitFor(() => {
      expect(queryVisibleOption('晚上')).not.toBeNull()
    })

    await userEvent.click(getVisibleOptionOrThrow('晚上'))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.appointment).toEqual(['sh', 'pm'])
      expect(trigger.value).toBe('上海 / 晚上')
      expect(getVisiblePickerGroup()).toBeNull()
    })
  })

  it('应该在提供默认插槽时优先渲染自定义子组件，并保留各子组件的 modelValue 结构', async () => {
    const form = createForm({
      values: {
        schedule: [['sh'], ['pm']],
      },
    })

    const displayFormatter = vi.fn((value) => {
      const [city = [], period = []] = value ?? []

      return `${Array.isArray(city) ? city[0] ?? '' : city} / ${Array.isArray(period) ? period[0] ?? '' : period}`.trim()
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="schedule"
          title="自定义步骤内容"
          decorator={[FormItem]}
          component={[PickerGroup, { displayFormatter }]}
          dataSource={customContentTabs}
        >
          {{
            default: () => [
              <VanPicker
                columns={[
                  { text: '杭州', value: 'hz' },
                  { text: '上海', value: 'sh' },
                ]}
              />,
              <VanPicker
                columns={[
                  { text: '上午', value: 'am' },
                  { text: '晚上', value: 'pm' },
                ]}
              />,
            ],
          }}
        </Field>
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('sh / pm')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleActiveTab().textContent).toContain('城市')
      expect(getConfirmButton().textContent).toContain('下一步')
    })

    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(getVisibleActiveTab().textContent).toContain('时段')
    })

    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.schedule).toEqual([['sh'], ['pm']])
      expect(getVisiblePickerGroup()).toBeNull()
    })

    expect(displayFormatter).toHaveBeenCalled()
  })

  it('应该在遮罩关闭时回滚临时选择，并在重新打开后回到第一个 tab', async () => {
    const form = createForm({
      values: {
        appointment: ['hz', 'am'],
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointment"
          title="预约信息"
          decorator={[FormItem]}
          component={[PickerGroup]}
          dataSource={appointmentOptions}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('杭州 / 上午')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleActiveTab().textContent).toContain('城市')
    })

    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(getVisibleActiveTab().textContent).toContain('时段')
    })

    await vi.waitFor(() => {
      expect(queryVisibleOption('晚上')).not.toBeNull()
    })

    await userEvent.click(getVisibleOptionOrThrow('晚上'))
    await userEvent.click(getVisibleOverlay())

    await vi.waitFor(() => {
      expect(form.values.appointment).toEqual(['hz', 'am'])
      expect(trigger.value).toBe('杭州 / 上午')
      expect(getVisiblePickerGroup()).toBeNull()
    })

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleActiveTab().textContent).toContain('城市')
    })
  })

  it('应该在 readPretty 下支持 displayFormatter', async () => {
    const displayFormatter = vi.fn((value, selectedOptions) => {
      expect(value).toEqual(['sh', 'pm'])
      expect(selectedOptions.map(option => option?.text)).toEqual(['上海', '晚上'])

      return '上海夜间预约'
    })

    const { container } = render(() => (
      <PreviewText placeholder="暂无预约">
        <FormProvider form={createForm()}>
          <Field
            name="appointment"
            initialValue={['sh', 'pm']}
            readPretty={true}
            component={[PickerGroup, { displayFormatter }]}
            dataSource={appointmentOptions}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('上海夜间预约')
    expect(displayFormatter).toHaveBeenCalledOnce()
  })

  it('应该在 readPretty 空值时显示占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无预约">
        <FormProvider form={createForm()}>
          <Field
            name="appointment"
            initialValue={null}
            readPretty={true}
            component={[PickerGroup]}
            dataSource={appointmentOptions}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无预约')
  })

  it('应该在 disabled、readonly、readOnly 下阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="disabledAppointment"
          title="禁用"
          decorator={[FormItem]}
          component={[PickerGroup, { disabled: true }]}
          dataSource={appointmentOptions}
        />
        <Field
          name="readonlyAppointment"
          title="只读"
          decorator={[FormItem]}
          component={[PickerGroup, { readonly: true }]}
          dataSource={appointmentOptions}
        />
        <Field
          name="readOnlyAppointment"
          title="兼容只读"
          decorator={[FormItem]}
          component={[PickerGroup, { readOnly: true }]}
          dataSource={appointmentOptions}
        />
      </FormProvider>
    ))

    getTrigger(container, 0).click()
    getTrigger(container, 1).click()
    getTrigger(container, 2).click()

    await vi.waitFor(() => {
      expect(getVisiblePickerGroup()).toBeNull()
    })
  })

  it('应该在事件 payload 中暴露字段实例与 tabIndex', async () => {
    const form = createForm()
    const handleChange = vi.fn()
    const handleCancel = vi.fn()
    const handleConfirm = vi.fn()
    const handleClickOption = vi.fn()
    const handleScrollInto = vi.fn()

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="appointment"
          title="预约信息"
          decorator={[FormItem]}
          component={[PickerGroup, {
            onCancel: handleCancel,
            onChange: handleChange,
            onClickOption: handleClickOption,
            onConfirm: handleConfirm,
            onScrollInto: handleScrollInto,
          }]}
          dataSource={appointmentOptions}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisiblePickerGroup()).not.toBeNull()
    })

    await userEvent.click(getVisibleOptionOrThrow('上海'))
    await userEvent.click(getCancelButton())

    await vi.waitFor(() => {
      const field = form.query('appointment').take()

      expect(handleChange).toHaveBeenCalled()
      expect(handleCancel).toHaveBeenCalledTimes(1)
      expect(handleClickOption).toHaveBeenCalled()
      expect(handleChange.mock.calls.some(call => call[0]?.tabIndex === 0 && call[0]?.field === field)).toBe(true)
      expect(handleClickOption.mock.calls.some(call => call[0]?.tabIndex === 0 && call[0]?.field === field)).toBe(true)
      expect(handleScrollInto.mock.calls.some(call => call[0]?.tabIndex === 0 && call[0]?.field === field)).toBe(true)
      expect(handleCancel.mock.calls[0]?.[0]?.field).toBe(field)
    })

    await userEvent.click(getTrigger(container))
    await userEvent.click(getVisibleOptionOrThrow('上海'))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(queryVisibleOption('晚上')).not.toBeNull()
    })

    await userEvent.click(getVisibleOptionOrThrow('晚上'))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      const field = form.query('appointment').take()

      expect(handleConfirm).toHaveBeenCalledTimes(1)
      expect(handleConfirm.mock.calls[0]?.[0]?.field).toBe(field)
      expect(handleConfirm.mock.calls[0]?.[0]?.selectedValues).toEqual(['sh', 'pm'])
      expect(handleScrollInto.mock.calls.some(call => call[0]?.tabIndex === 0 && call[0]?.field === field)).toBe(true)
    })
  })

  it('应该透传 title、cancel、confirm、option 插槽', async () => {
    const { container } = render(() => (
      <PickerGroup dataSource={appointmentOptions}>
        {{
          title: () => <div class="picker-group-slot-title">自定义标题</div>,
          cancel: () => <span class="picker-group-slot-cancel">返回</span>,
          confirm: () => <span class="picker-group-slot-confirm">下一步</span>,
          option: (option: { text?: string }) => <div class="picker-group-slot-option">{option.text}</div>,
        }}
      </PickerGroup>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(document.querySelector('.picker-group-slot-title')).not.toBeNull()
      expect(document.querySelector('.picker-group-slot-cancel')).not.toBeNull()
      expect(document.querySelector('.picker-group-slot-confirm')).not.toBeNull()
      expect(document.querySelector('.picker-group-slot-option')).not.toBeNull()
    })
  })

  it('应该透传 toolbar 与 empty 插槽', async () => {
    const { container } = render(() => (
      <PickerGroup dataSource={emptyOptions}>
        {{
          toolbar: () => <div class="picker-group-slot-toolbar">自定义工具栏</div>,
          empty: () => <div class="picker-group-slot-empty">暂无选项</div>,
        }}
      </PickerGroup>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(document.querySelector('.picker-group-slot-toolbar')).not.toBeNull()
      expect(document.querySelector('.picker-group-slot-empty')).not.toBeNull()
    })
  })
})
