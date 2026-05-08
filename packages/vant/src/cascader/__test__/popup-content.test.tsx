import type { CascaderChangeEvent, CascaderOption } from '../types'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import CascaderPopupContent from '../cascader-popup-content.vue'

const cascaderMockState = vi.hoisted(() => {
  return {
    lastModelValue: undefined as unknown,
  }
})

vi.mock('vant', async () => {
  const vue = await import('vue')

  return {
    Cascader: vue.defineComponent({
      name: 'MockVanCascader',
      props: {
        modelValue: {
          type: [String, Number, Array],
          default: undefined,
        },
      },
      emits: ['change', 'finish', 'close', 'click-tab'],
      setup(props, { emit, slots }) {
        return () => {
          cascaderMockState.lastModelValue = props.modelValue

          return vue.h('div', { class: 'mock-cascader-popup-content' }, [
            vue.h('div', { class: 'mock-model-value' }, JSON.stringify(props.modelValue ?? null)),
            vue.h('button', {
              class: 'mock-change',
              type: 'button',
              onClick: () => emit('change', {
                value: 'hz',
                tabIndex: 1,
                selectedOptions: [
                  { text: '浙江', value: 'zj' },
                  { text: '杭州', value: 'hz' },
                ],
                currentValue: ['zj', 'hz'],
              }),
            }, 'change'),
            vue.h('button', {
              class: 'mock-finish',
              type: 'button',
              onClick: () => emit('finish', {
                value: 'hz',
                tabIndex: 1,
                selectedOptions: [
                  { text: '浙江', value: 'zj' },
                  { text: '杭州', value: 'hz' },
                ],
                currentValue: ['zj', 'hz'],
              }),
            }, 'finish'),
            vue.h('button', {
              class: 'mock-close',
              type: 'button',
              onClick: () => emit('close'),
            }, 'close'),
            vue.h('button', {
              class: 'mock-click-tab',
              type: 'button',
              onClick: () => emit('click-tab', 2, '城市'),
            }, 'click-tab'),
            slots.title?.(),
            slots.option?.({ option: { text: '杭州', value: 'hz' }, selected: true }),
            slots['options-top']?.({ tabIndex: 1 }),
            slots['options-bottom']?.({ tabIndex: 1 }),
          ])
        }
      },
    }),
  }
})

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

afterEach(async () => {
  document.body.innerHTML = ''
  cascaderMockState.lastModelValue = undefined
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

describe('cascader-popup-content', () => {
  it('应该透传插槽和可选回调，并在未显式传入 modelValue 时回退到 cascaderProps.modelValue', async () => {
    const onUpdateModelValue = vi.fn()
    const onChange = vi.fn()
    const onFinish = vi.fn()
    const onCancel = vi.fn()
    const onClickTab = vi.fn()

    render(() => (
      <CascaderPopupContent
        cascaderProps={{
          modelValue: 'zj',
          options: [] as CascaderOption[],
        }}
        onUpdate:modelValue={onUpdateModelValue}
        onChange={onChange}
        onFinish={onFinish}
        onCancel={onCancel}
        onClickTab={onClickTab}
      >
        {{
          'title': () => <div class="slot-title">标题</div>,
          'option': ({ option, selected }: { option: CascaderOption, selected: boolean }) => (
            <div class="slot-option">
              {option.text}
              -
              {String(selected)}
            </div>
          ),
          'options-top': ({ tabIndex }: { tabIndex: number }) => (
            <div class="slot-options-top">
              top-
              {tabIndex}
            </div>
          ),
          'options-bottom': ({ tabIndex }: { tabIndex: number }) => (
            <div class="slot-options-bottom">
              bottom-
              {tabIndex}
            </div>
          ),
        }}
      </CascaderPopupContent>
    ))

    expect(cascaderMockState.lastModelValue).toBe('zj')
    expect(document.querySelector('.slot-title')?.textContent).toContain('标题')
    expect(document.querySelector('.slot-option')?.textContent).toContain('杭州-true')
    expect(document.querySelector('.slot-options-top')?.textContent).toContain('top-1')
    expect(document.querySelector('.slot-options-bottom')?.textContent).toContain('bottom-1')

    await userEvent.click(document.querySelector<HTMLElement>('.mock-change')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-finish')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-close')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-click-tab')!)

    const expectedPayload: CascaderChangeEvent = {
      value: 'hz',
      tabIndex: 1,
      selectedOptions: [
        { text: '浙江', value: 'zj' },
        { text: '杭州', value: 'hz' },
      ],
      currentValue: ['zj', 'hz'],
    }

    expect(onUpdateModelValue).toHaveBeenCalledWith('hz')
    expect(onChange).toHaveBeenCalledWith(expectedPayload)
    expect(onFinish).toHaveBeenCalledWith(expectedPayload)
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onClickTab).toHaveBeenCalledWith(2, '城市')
  })

  it('应该优先使用显式 modelValue，并允许缺省可选回调', async () => {
    const onUpdateModelValue = vi.fn()
    const onChange = vi.fn()

    render(() => (
      <CascaderPopupContent
        modelValue="js"
        cascaderProps={{
          modelValue: 'zj',
          options: [] as CascaderOption[],
        }}
        onUpdate:modelValue={onUpdateModelValue}
        onChange={onChange}
      />
    ))

    expect(cascaderMockState.lastModelValue).toBe('js')

    await userEvent.click(document.querySelector<HTMLElement>('.mock-change')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-click-tab')!)

    expect(onUpdateModelValue).toHaveBeenCalledWith('hz')
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      value: 'hz',
      currentValue: ['zj', 'hz'],
    }))
  })
})
