import type { TreeSelectChild, TreeSelectResolvedValue } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FormItem from '../../form-item'
import TreeSelect from '../index'
import 'vant/lib/index.css'

const popupMockState = vi.hoisted(() => {
  const state = {
    lastOpenArg: undefined as any,
    openSpy: vi.fn((componentProps: any) => {
      state.lastOpenArg = componentProps

      return new Promise<TreeSelectResolvedValue>((resolve, reject) => {
        state.resolve = resolve
        state.reject = reject
      })
    }),
    createPopupSpy: vi.fn(() => ({
      open: state.openSpy,
    })),
    resolve: (_value: TreeSelectResolvedValue) => {},
    reject: (_error: unknown) => {},
    reset() {
      state.lastOpenArg = undefined
      state.openSpy.mockClear()
      state.createPopupSpy.mockClear()
      state.resolve = (_value: TreeSelectResolvedValue) => {}
      state.reject = (_error: unknown) => {}
    },
  }

  return state
})

vi.mock('../../create-popup', () => {
  return {
    createPopup: popupMockState.createPopupSpy,
  }
})

const items = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 'hz' },
      { text: '宁波', id: 'nb' },
    ],
  },
] as const

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

function getTrigger(container: Element) {
  return container.querySelector<HTMLInputElement>('input.van-field__control')!
}

afterEach(async () => {
  document.body.innerHTML = ''
  popupMockState.reset()
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

describe('tree-select popup', () => {
  it('应该在打开弹层后透传回调，并在成功确认后写回值', async () => {
    const onOpened = vi.fn()
    const onClosed = vi.fn()
    const onUpdateModelValue = vi.fn()
    const onClickNav = vi.fn()
    const onClickItem = vi.fn()
    const displayFormatter = vi.fn(() => '已选杭州')
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
          component={[
            TreeSelect,
            {
              items,
              displayFormatter,
              'popupProps': { position: 'bottom' },
              'onOpened': onOpened,
              'onClosed': onClosed,
              'onUpdate:modelValue': onUpdateModelValue,
              'onClickNav': onClickNav,
              'onClickItem': onClickItem,
            },
          ]}
        />
      </FormProvider>
    ))

    expect(getTrigger(container).value).toBe('已选杭州')
    expect(displayFormatter).toHaveBeenCalledWith('hz', [{ text: '杭州', id: 'hz' }])

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(popupMockState.createPopupSpy).toHaveBeenCalledTimes(1)
      expect(onOpened).toHaveBeenCalledTimes(1)
    })

    const panelProps = popupMockState.lastOpenArg.value
    const child: TreeSelectChild = { id: 'nb', text: '宁波' }

    panelProps.onClickNav(2)
    panelProps.onClickItem(child)
    popupMockState.resolve('nb')

    await vi.waitFor(() => {
      expect(onClickNav).toHaveBeenCalledWith(2)
      expect(onClickItem).toHaveBeenCalledWith(child)
      expect(onUpdateModelValue).toHaveBeenCalledWith('nb')
      expect(onClosed).toHaveBeenCalledTimes(1)
    })
  })

  it('应该在弹层 rejected 时只触发 closed 事件', async () => {
    const onClosed = vi.fn()
    const onUpdateModelValue = vi.fn()

    const { container } = render(() => (
      <TreeSelect
        items={items as any}
        modelValue="hz"
        onClosed={onClosed}
        onUpdate:modelValue={onUpdateModelValue}
      />
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(popupMockState.openSpy).toHaveBeenCalledTimes(1)
    })

    popupMockState.reject(new Error('cancel'))

    await vi.waitFor(() => {
      expect(onClosed).toHaveBeenCalledTimes(1)
    })

    expect(onUpdateModelValue).not.toHaveBeenCalled()
  })
})
