import type { Field as FormilyField } from '@formily/core'
import type { CascaderChangeEvent, CascaderOption } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FormItem from '../../form-item'
import Cascader from '../index'
import 'vant/lib/index.css'

const TestCascader = Cascader as any

const options: CascaderOption[] = [
  {
    text: '浙江',
    value: 'zj',
    children: [
      {
        text: '杭州',
        value: 'hz',
        children: [
          {
            text: '西湖区',
            value: 'xh',
          },
          {
            text: '余杭区',
            value: 'yh',
          },
        ],
      },
      {
        text: '宁波',
        value: 'nb',
        children: [
          {
            text: '鄞州区',
            value: 'yz',
          },
        ],
      },
    ],
  },
  {
    text: '江苏',
    value: 'js',
    children: [
      {
        text: '南京',
        value: 'nj',
        children: [
          {
            text: '鼓楼区',
            value: 'gl',
          },
        ],
      },
    ],
  },
]

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

function getTrigger(container: Element) {
  return container.querySelector<HTMLInputElement>('input.van-field__control')!
}

function getVisibleCascader() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-cascader')).find((cascader) => {
    const popup = cascader.closest<HTMLElement>('.van-popup')

    if (!popup) {
      return true
    }

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisibleOverlay() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-overlay')).find((overlay) => {
    return window.getComputedStyle(overlay).display !== 'none'
  }) ?? null
}

function getVisibleOption(text: string) {
  const cascader = getVisibleCascader()

  if (!cascader) {
    throw new Error('Visible cascader not found')
  }

  return Array.from(cascader.querySelectorAll<HTMLElement>('.van-cascader__option')).find((element) => {
    return element.textContent?.trim() === text
  })!
}

describe('cascader', () => {
  it('应该给 popup trigger 补齐和 Field 一致的标签关联属性', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader]}
          dataSource={options}
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

  it('应该在不手动维护 show 的情况下打开和关闭弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader]}
          dataSource={options}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).toHaveAttribute('placeholder', '请选择选项')
    expect(trigger).toHaveAttribute('readonly')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleCascader()).not.toBeNull()
    })

    getVisibleOverlay()?.click()

    await vi.waitFor(() => {
      expect(getVisibleCascader()).toBeNull()
    })
  })

  it('应该在选中叶子节点后更新字段值并关闭弹层', async () => {
    const form = createForm()

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader]}
          dataSource={options}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleCascader()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('浙江'))
    await userEvent.click(getVisibleOption('杭州'))
    await userEvent.click(getVisibleOption('西湖区'))

    await vi.waitFor(() => {
      expect(form.values.region).toEqual(['zj', 'hz', 'xh'])
      expect(trigger.value).toBe('浙江 / 杭州 / 西湖区')
      expect(getVisibleCascader()).toBeNull()
    })
  })

  it('应该在 change 和 finish 事件中暴露当前字段实例', async () => {
    const form = createForm()
    const handleChange = vi.fn()
    const handleFinish = vi.fn()

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader, {
            onChange: handleChange,
            onFinish: handleFinish,
          }]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisibleCascader()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('浙江'))
    await userEvent.click(getVisibleOption('杭州'))
    await userEvent.click(getVisibleOption('西湖区'))

    const field = form.query('region').take()

    await vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
      expect(handleFinish).toHaveBeenCalledTimes(1)
      expect(handleChange.mock.calls.at(-1)?.[0]?.field).toBe(field)
      expect(handleChange.mock.calls.at(-1)?.[0]?.currentValue).toEqual(['zj', 'hz', 'xh'])
      expect(handleFinish.mock.calls[0]?.[0]?.field).toBe(field)
      expect(handleFinish.mock.calls[0]?.[0]?.currentValue).toEqual(['zj', 'hz', 'xh'])
      expect(handleFinish.mock.calls[0]?.[0]?.selectedOptions.map(({ value }) => value)).toEqual(['zj', 'hz', 'xh'])
    })
  })

  it('应该在关闭弹层时回滚未完成的临时选择', async () => {
    const form = createForm({
      values: {
        region: ['zj', 'nb', 'yz'],
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader]}
          dataSource={options}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('浙江 / 宁波 / 鄞州区')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisibleCascader()).not.toBeNull()
    })

    getVisibleOption('江苏').click()
    getVisibleOverlay()?.click()

    await vi.waitFor(() => {
      expect(form.values.region).toEqual(['zj', 'nb', 'yz'])
      expect(trigger.value).toBe('浙江 / 宁波 / 鄞州区')
      expect(getVisibleCascader()).toBeNull()
    })
  })

  it('应该在弹层打开期间响应异步更新的数据源', async () => {
    const form = createForm({
      values: {
        region: ['zj'],
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader]}
          dataSource={[
            {
              text: '浙江',
              value: 'zj',
              children: [],
            },
          ]}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisibleCascader()).not.toBeNull()
      expect(getVisibleOption('浙江')).not.toBeNull()
    })

    ;(form.query('region').take() as FormilyField | undefined)?.setDataSource([
      {
        text: '浙江',
        value: 'zj',
        children: [
          { text: '杭州', value: 'hz' },
          { text: '宁波', value: 'nb' },
        ],
      },
    ])

    await vi.waitFor(() => {
      expect(getVisibleOption('杭州')).not.toBeNull()
      expect(getVisibleOption('宁波')).not.toBeNull()
    })
  })

  it('应该在异步加载后保持当前层级并继续完成后续选择', async () => {
    const form = createForm()
    const handleChange = vi.fn(({ value, field }: CascaderChangeEvent) => {
      const currentOptions = Array.isArray(field?.dataSource)
        ? field.dataSource as CascaderOption[]
        : []

      if (value !== 'zj' || currentOptions[0]?.children?.length) {
        return
      }

      field?.setDataSource([
        {
          text: '浙江',
          value: 'zj',
          children: [
            { text: '杭州', value: 'hz' },
            { text: '宁波', value: 'nb' },
          ],
        },
      ])
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader, {
            onChange: handleChange,
          }]}
          dataSource={[
            {
              text: '浙江',
              value: 'zj',
              children: [],
            },
          ]}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisibleCascader()).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('浙江'))

    await vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
      expect(getVisibleOption('杭州')).not.toBeNull()
    })

    await userEvent.click(getVisibleOption('杭州'))

    await vi.waitFor(() => {
      expect(form.values.region).toEqual(['zj', 'hz'])
      expect(getTrigger(container).value).toBe('浙江 / 杭州')
      expect(getVisibleCascader()).toBeNull()
    })
  })

  it('应该兼容 readOnly 形式的只读属性，并阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="region"
          title="地区"
          decorator={[FormItem]}
          component={[Cascader, { readOnly: true }]}
          dataSource={options}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).not.toBeDisabled()
    trigger.click()

    expect(getVisibleCascader()).toBeNull()
  })

  it('应该透传官方插槽', async () => {
    const { container } = render(() => (
      <TestCascader options={options}>
        {{
          title: () => <div class="cascader-slot-title">自定义标题</div>,
          option: ({ option }) => <div class="cascader-slot-option">{option.text}</div>,
        }}
      </TestCascader>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(document.querySelector('.cascader-slot-title')).not.toBeNull()
      expect(document.querySelector('.cascader-slot-option')).not.toBeNull()
      expect(getVisibleCascader()).not.toBeNull()
    })
  })
})

describe('cascader readPretty', () => {
  it('应该在阅读态下显示完整路径文本', () => {
    const { container } = render(() => (
      <FormProvider form={createForm({
        values: {
          region: ['zj', 'hz', 'xh'],
        },
      })}
      >
        <Field
          name="region"
          pattern="readPretty"
          decorator={[FormItem]}
          component={[Cascader]}
          dataSource={options}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('浙江 / 杭州 / 西湖区')
  })
})
