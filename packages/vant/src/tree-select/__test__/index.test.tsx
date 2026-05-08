import type { TreeSelectItem } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FormItem from '../../form-item'
import TreeSelect from '../index'
import 'vant/lib/index.css'

const items: TreeSelectItem[] = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 'hz' },
      { text: '宁波', id: 'nb' },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 'nj' },
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

function getTrigger(container: Element, index = 0) {
  return container.querySelectorAll<HTMLInputElement>('input.van-field__control')[index]!
}

function getVisibleTreeSelect() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-tree-select')).find((treeSelect) => {
    const popup = treeSelect.closest<HTMLElement>('.van-popup')

    if (!popup)
      return true

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

describe('tree-select', () => {
  it('应该通过触发区打开 Popup，并在确认后写回选中值', async () => {
    const form = createForm({
      values: {
        area: 'hz',
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="area"
          title="地区"
          decorator={[FormItem]}
          component={[TreeSelect, { items }]}
        />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisibleTreeSelect()).not.toBeNull()
    })
  })

  it('应该在 Field.readOnly 下阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="area"
          title="地区"
          readOnly={true}
          decorator={[FormItem]}
          component={[TreeSelect, { items }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).not.toBeDisabled()
    trigger.click()

    expect(getVisibleTreeSelect()).toBeNull()
  })

  it('应该在 readPretty 下通过 dataSource 展示选中项文本', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm({ readPretty: true })}>
        <Field
          name="area"
          title="地区"
          initialValue="hz"
          decorator={[FormItem]}
          component={[TreeSelect]}
          dataSource={items as any}
        />
      </FormProvider>
    ))

    expect(container.querySelector('.van-field__control')?.textContent?.trim()).toBe('杭州')
  })
})
