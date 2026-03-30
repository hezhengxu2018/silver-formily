import type { PickerColumn, PickerColumns } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FormItem from '../../form-item'
import PreviewText from '../../preview-text'
import Picker from '../index'
import 'vant/lib/index.css'

const cityOptions: PickerColumn = [
  { label: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { label: '苏州', name: 'sz' },
]

const scheduleColumns: PickerColumns = [
  [
    { label: '杭州', value: 'hz' },
    { label: '上海', value: 'sh' },
  ],
  [
    { text: '上午', value: 'am' },
    { text: '晚上', value: 'pm' },
  ],
]

const cascaderLikeColumns: PickerColumn = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  {
    text: '江苏',
    value: 'js',
    children: [
      { text: '南京', value: 'nj' },
    ],
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

function getConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('Picker confirm button not found')

  return button
}

function getCancelButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__cancel')

  if (!button)
    throw new Error('Picker cancel button not found')

  return button
}

describe('picker', () => {
  it('应该通过 dataSource 映射单列选项，并在确认后写回标量值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="city"
          title="城市"
          decorator={[FormItem]}
          component={[Picker]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).toHaveAttribute('placeholder', '请选择选项')
    expect(trigger).toHaveAttribute('readonly')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePicker()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('苏州'))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.city).toBe('sz')
      expect(trigger.value).toBe('苏州')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该在多列场景下写回数组值并拼接展示文本', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="schedule"
          title="行程安排"
          decorator={[FormItem]}
          component={[Picker]}
          dataSource={scheduleColumns}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
    })

    await userEvent.click(getVisibleOption('上海', 0))
    await userEvent.click(getVisibleOption('晚上', 1))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      expect(form.values.schedule).toEqual(['sh', 'pm'])
      expect(trigger.value).toBe('上海 / 晚上')
    })
  })

  it('应该在取消或关闭时回滚临时选择', async () => {
    const form = createForm({
      values: {
        city: 'hz',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="city"
          title="城市"
          decorator={[FormItem]}
          component={[Picker]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('杭州')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePicker()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('宁波'))
    await userEvent.click(getCancelButton())

    await vi.waitFor(() => {
      expect(form.values.city).toBe('hz')
      expect(trigger.value).toBe('杭州')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该支持级联数据在 readPretty 下展示完整路径', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="region"
          initialValue={['zj', 'hz']}
          readPretty={true}
          component={[Picker]}
          dataSource={cascaderLikeColumns}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('浙江 / 杭州')
  })

  it('应该在 disabled、readonly、readOnly 下阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="disabledCity"
          title="禁用"
          decorator={[FormItem]}
          component={[Picker, { disabled: true }]}
          dataSource={cityOptions}
        />
        <Field
          name="readonlyCity"
          title="只读"
          decorator={[FormItem]}
          component={[Picker, { readonly: true }]}
          dataSource={cityOptions}
        />
        <Field
          name="readOnlyCity"
          title="兼容只读"
          decorator={[FormItem]}
          component={[Picker, { readOnly: true }]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    getTrigger(container, 0).click()
    getTrigger(container, 1).click()
    getTrigger(container, 2).click()

    await vi.waitFor(() => {
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该在事件 payload 中暴露当前字段实例', async () => {
    const form = createForm()
    const handleChange = vi.fn()
    const handleCancel = vi.fn()
    const handleConfirm = vi.fn()

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="city"
          title="城市"
          decorator={[FormItem]}
          component={[Picker, {
            onCancel: handleCancel,
            onChange: handleChange,
            onConfirm: handleConfirm,
          }]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisiblePicker()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('宁波'))
    await userEvent.click(getCancelButton())

    await vi.waitFor(() => {
      const field = form.query('city').take()

      expect(handleChange).toHaveBeenCalled()
      expect(handleCancel).toHaveBeenCalledTimes(1)
      expect(handleChange.mock.calls.at(-1)?.[0]?.field).toBe(field)
      expect(handleCancel.mock.calls[0]?.[0]?.field).toBe(field)
    })

    await userEvent.click(getTrigger(container))
    await userEvent.click(getVisibleOption('苏州'))
    await userEvent.click(getConfirmButton())

    await vi.waitFor(() => {
      const field = form.query('city').take()

      expect(handleConfirm).toHaveBeenCalledTimes(1)
      expect(handleConfirm.mock.calls[0]?.[0]?.field).toBe(field)
    })
  })

  it('应该透传 title、cancel、confirm、option、columns-top、columns-bottom 插槽', async () => {
    const { container } = render(() => (
      <Picker columns={cityOptions}>
        {{
          'title': () => <div class="picker-slot-title">自定义标题</div>,
          'cancel': () => <span class="picker-slot-cancel">返回</span>,
          'confirm': () => <span class="picker-slot-confirm">确定提交</span>,
          'option': (option: PickerColumn[number]) => <div class="picker-slot-option">{(option as any).text}</div>,
          'columns-top': () => <div class="picker-slot-top">顶部说明</div>,
          'columns-bottom': () => <div class="picker-slot-bottom">底部说明</div>,
        }}
      </Picker>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(document.querySelector('.picker-slot-title')).not.toBeNull()
      expect(document.querySelector('.picker-slot-cancel')).not.toBeNull()
      expect(document.querySelector('.picker-slot-confirm')).not.toBeNull()
      expect(document.querySelector('.picker-slot-option')).not.toBeNull()
      expect(document.querySelector('.picker-slot-top')).not.toBeNull()
      expect(document.querySelector('.picker-slot-bottom')).not.toBeNull()
    })
  })

  it('应该透传 toolbar 与 empty 插槽', async () => {
    const { container } = render(() => (
      <Picker columns={[]}>
        {{
          toolbar: () => <div class="picker-slot-toolbar">自定义工具栏</div>,
          empty: () => <div class="picker-slot-empty">暂无选项</div>,
        }}
      </Picker>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(document.querySelector('.picker-slot-toolbar')).not.toBeNull()
      expect(document.querySelector('.picker-slot-empty')).not.toBeNull()
    })
  })
})

describe('picker readPretty', () => {
  it('应该支持 PreviewText 占位符与 displayFormatter', async () => {
    const modelValue = ['sh', 'pm']
    const displayFormatter = vi.fn((value, selectedOptions) => {
      expect(Array.isArray(value)).toBe(true)
      expect(value).toEqual(modelValue)
      expect(value).not.toBe(modelValue)
      expect(selectedOptions.map(option => option?.text)).toEqual(['上海', '晚上'])

      return '上海晚间场次'
    })

    const { container } = render(() => (
      <PreviewText placeholder="暂无安排">
        <FormProvider form={createForm()}>
          <Field
            name="schedule"
            initialValue={modelValue}
            readPretty={true}
            component={[Picker, {
              displayFormatter,
            }]}
            dataSource={scheduleColumns}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('上海晚间场次')
    expect(displayFormatter).toHaveBeenCalledOnce()
  })

  it('应该在空值时显示自定义占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无选择">
        <FormProvider form={createForm()}>
          <Field
            name="city"
            initialValue={null}
            readPretty={true}
            component={[Picker]}
            dataSource={cityOptions}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无选择')
  })

  it('应该支持自定义字段名回显', async () => {
    const customColumns = [
      {
        labelText: '工作',
        code: 'work',
        nodes: [
          { labelText: '远程', code: 'remote' },
        ],
      },
    ]

    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="scene"
          initialValue={['work', 'remote']}
          readPretty={true}
          component={[Picker, {
            columnsFieldNames: {
              text: 'labelText',
              value: 'code',
              children: 'nodes',
            },
          }]}
          dataSource={customColumns}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('工作 / 远程')
  })
})
