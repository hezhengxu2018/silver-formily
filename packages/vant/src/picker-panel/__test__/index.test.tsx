import type { FieldDataSource } from '@formily/core'
import type { PickerColumns, PickerOption } from '../../picker'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import FormItem from '../../form-item'
import PickerPanel from '../index'
import 'vant/lib/index.css'

const cityOptions = [
  { label: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { label: '苏州', name: 'sz' },
] satisfies FieldDataSource

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
const scheduleDataSource = scheduleColumns as unknown as FieldDataSource

const cascaderLikeColumns = [
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
      { text: '苏州', value: 'sz' },
    ],
  },
] satisfies FieldDataSource

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
      throw new Error('Selected picker item not found')

    return selected.textContent?.trim() ?? ''
  })
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

describe('picker-panel', () => {
  it('应该直接渲染滚轮，并只在确认后写回单列标量值', async () => {
    const form = createForm({
      values: {
        city: 'hz',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="city"
          title="城市"
          decorator={[FormItem]}
          component={[PickerPanel]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(1)
      expect(document.querySelector('.van-popup')).toBeNull()
    })

    expect(getVisibleSelectedTexts()).toEqual(['杭州'])

    getVisibleOption('苏州').click()

    expect(form.values.city).toBe('hz')

    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.city).toBe('sz')
      expect(getVisibleSelectedTexts()).toEqual(['苏州'])
    })
  })

  it('应该在多列场景下确认后写回数组值', async () => {
    const form = createForm({
      values: {
        schedule: ['hz', 'am'],
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="schedule"
          component={[PickerPanel]}
          dataSource={scheduleDataSource}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
      expect(getVisibleSelectedTexts()).toEqual(['杭州', '上午'])
    })

    getVisibleOption('上海', 0).click()
    getVisibleOption('晚上', 1).click()
    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.schedule).toEqual(['sh', 'pm'])
      expect(getVisibleSelectedTexts()).toEqual(['上海', '晚上'])
    })
  })

  it('应该在级联场景下确认后写回当前路径数组', async () => {
    const form = createForm({
      values: {
        region: ['zj', 'hz'],
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="region"
          component={[PickerPanel]}
          dataSource={cascaderLikeColumns}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
      expect(getVisibleSelectedTexts()).toEqual(['浙江', '杭州'])
    })

    getVisibleOption('江苏', 0).click()

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['江苏', '南京'])
    })

    getVisibleOption('苏州', 1).click()
    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.region).toEqual(['js', 'sz'])
      expect(getVisibleSelectedTexts()).toEqual(['江苏', '苏州'])
    })
  })

  it('应该在取消时回滚临时选择', async () => {
    const form = createForm({
      values: {
        city: 'hz',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="city"
          component={[PickerPanel]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['杭州'])
    })

    getVisibleOption('宁波').click()
    getCancelButton().click()

    await vi.waitFor(() => {
      expect(form.values.city).toBe('hz')
      expect(getVisibleSelectedTexts()).toEqual(['杭州'])
    })
  })

  it('应该支持自定义字段名', async () => {
    const form = createForm({
      values: {
        scene: ['work', 'remote'],
      },
    })
    const customColumns = [
      {
        labelText: '工作',
        code: 'work',
        nodes: [
          { labelText: '远程', code: 'remote' },
          { labelText: '办公室', code: 'office' },
        ],
      },
    ]

    render(() => (
      <FormProvider form={form}>
        <Field
          name="scene"
          component={[PickerPanel, {
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

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['工作', '远程'])
    })

    getVisibleOption('办公室', 1).click()
    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.scene).toEqual(['work', 'office'])
    })
  })

  it.each([
    ['disabled', { disabled: true }],
    ['readonly', { readonly: true }],
  ])('应该在 %s 下让内部滚轮进入只读态', async (_name, panelProps) => {
    const form = createForm({
      values: {
        city: 'hz',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="city"
          component={[PickerPanel, panelProps]}
          dataSource={cityOptions}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisibleSelectedTexts()).toEqual(['杭州'])
    })

    getVisibleOption('宁波').click()
    getConfirmButton().click()

    await waitForAnimationFrame()

    expect(form.values.city).toBe('hz')
    expect(getVisibleSelectedTexts()).toEqual(['杭州'])
  })

  it('应该透传 title、cancel、confirm、option、columns-top、columns-bottom 插槽', async () => {
    render(() => (
      <PickerPanel columns={cityOptions as PickerColumns}>
        {{
          'title': () => <div class="picker-panel-slot-title">自定义标题</div>,
          'cancel': () => <span class="picker-panel-slot-cancel">返回</span>,
          'confirm': () => <span class="picker-panel-slot-confirm">确定提交</span>,
          'option': (option: PickerOption) => <div class="picker-panel-slot-option">{option.text}</div>,
          'columns-top': () => <div class="picker-panel-slot-top">顶部说明</div>,
          'columns-bottom': () => <div class="picker-panel-slot-bottom">底部说明</div>,
        }}
      </PickerPanel>
    ))

    await vi.waitFor(() => {
      expect(document.querySelector('.picker-panel-slot-title')).not.toBeNull()
      expect(document.querySelector('.picker-panel-slot-cancel')).not.toBeNull()
      expect(document.querySelector('.picker-panel-slot-confirm')).not.toBeNull()
      expect(document.querySelector('.picker-panel-slot-option')).not.toBeNull()
      expect(document.querySelector('.picker-panel-slot-top')).not.toBeNull()
      expect(document.querySelector('.picker-panel-slot-bottom')).not.toBeNull()
    })
  })

  it('应该透传 toolbar 与 empty 插槽', async () => {
    render(() => (
      <PickerPanel columns={[]}>
        {{
          toolbar: () => <div class="picker-panel-slot-toolbar">自定义工具栏</div>,
          empty: () => <div class="picker-panel-slot-empty">暂无选项</div>,
        }}
      </PickerPanel>
    ))

    await vi.waitFor(() => {
      expect(document.querySelector('.picker-panel-slot-toolbar')).not.toBeNull()
      expect(document.querySelector('.picker-panel-slot-empty')).not.toBeNull()
    })
  })
})
