import type { TreeSelectItem, TreeSelectResolvedValue } from '../types'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { ref } from 'vue'
import TreeSelectPanel from '../tree-select-panel.vue'
import 'vant/lib/index.css'

const mockTreeSelectState = vi.hoisted(() => {
  return {
    lastActiveId: undefined as TreeSelectResolvedValue,
  }
})

vi.mock('vant', async () => {
  const vue = await import('vue')

  return {
    TreeSelect: vue.defineComponent({
      name: 'MockVanTreeSelect',
      props: {
        activeId: {
          type: [String, Number, Array],
          default: undefined,
        },
        items: {
          type: Array,
          default: () => [],
        },
      },
      emits: ['update:active-id', 'click-nav', 'click-item'],
      setup(props, { emit, slots }) {
        return () => {
          mockTreeSelectState.lastActiveId = props.activeId as TreeSelectResolvedValue

          return vue.h('div', { class: 'mock-tree-select' }, [
            vue.h('div', { class: 'mock-active-id' }, JSON.stringify(props.activeId ?? null)),
            vue.h('button', {
              class: 'mock-update-active-id',
              type: 'button',
              onClick: () => emit('update:active-id', 'nb'),
            }, 'update active'),
            vue.h('button', {
              class: 'mock-click-nav',
              type: 'button',
              onClick: () => emit('click-nav', 1),
            }, 'click nav'),
            vue.h('button', {
              class: 'mock-click-item',
              type: 'button',
              onClick: () => emit('click-item', { id: 'nb', text: '宁波' }),
            }, 'click item'),
            slots['nav-text']?.({ item: (props.items as TreeSelectItem[])[0], index: 0 }),
            slots.content?.(),
          ])
        }
      },
    }),
  }
})

const items: TreeSelectItem[] = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 'hz' },
      { text: '宁波', id: 'nb' },
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
  mockTreeSelectState.lastActiveId = undefined
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

describe('tree-select-panel', () => {
  it('应该透传插槽并在确认时提交临时选中值', async () => {
    const onUpdateModelValue = vi.fn()
    const onConfirm = vi.fn()
    const onClickNav = vi.fn()
    const onClickItem = vi.fn()

    render(() => (
      <TreeSelectPanel
        items={items}
        modelValue="hz"
        title="地区"
        onUpdate:modelValue={onUpdateModelValue}
        onConfirm={onConfirm}
        onClickNav={onClickNav}
        onClickItem={onClickItem}
      >
        {{
          'cancel': () => '返回',
          'confirm': () => '保存',
          'title': () => '自定义标题',
          'nav-text': ({ item, index }) => `${index}:${item.text}`,
          'content': () => <div class="custom-content">自定义内容</div>,
        }}
      </TreeSelectPanel>
    ))

    expect(document.querySelector('.van-picker__cancel')?.textContent).toContain('返回')
    expect(document.querySelector('.van-picker__confirm')?.textContent).toContain('保存')
    expect(document.querySelector('.van-picker__title')?.textContent).toContain('自定义标题')
    expect(document.querySelector('.mock-tree-select')?.textContent).toContain('0:浙江')
    expect(document.querySelector('.custom-content')?.textContent).toContain('自定义内容')

    await userEvent.click(document.querySelector<HTMLElement>('.mock-click-nav')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-click-item')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-update-active-id')!)

    await vi.waitFor(() => {
      expect(mockTreeSelectState.lastActiveId).toBe('nb')
    })

    await userEvent.click(document.querySelector<HTMLElement>('.van-picker__confirm')!)

    expect(onClickNav).toHaveBeenCalledWith(1)
    expect(onClickItem).toHaveBeenCalledWith({ id: 'nb', text: '宁波' })
    expect(onUpdateModelValue).toHaveBeenCalledWith('nb')
    expect(onConfirm).toHaveBeenCalledWith('nb')
  })

  it('应该在取消时回滚临时值，并响应外部 modelValue 更新', async () => {
    const sourceValue = ref<TreeSelectResolvedValue>('hz')
    const onCancel = vi.fn()

    render(() => (
      <div>
        <button
          class="sync-model-value"
          type="button"
          onClick={() => {
            sourceValue.value = 'nj'
          }}
        >
          sync
        </button>
        <TreeSelectPanel
          items={items}
          modelValue={sourceValue.value}
          onCancel={onCancel}
        />
      </div>
    ))

    expect(document.querySelector('.van-picker__cancel')?.textContent).toContain('取消')
    expect(document.querySelector('.van-picker__confirm')?.textContent).toContain('确认')
    expect(document.querySelector('.van-picker__title')).toBeNull()

    await userEvent.click(document.querySelector<HTMLElement>('.mock-update-active-id')!)

    await vi.waitFor(() => {
      expect(mockTreeSelectState.lastActiveId).toBe('nb')
    })

    await userEvent.click(document.querySelector<HTMLElement>('.van-picker__cancel')!)

    await vi.waitFor(() => {
      expect(mockTreeSelectState.lastActiveId).toBe('hz')
    })

    expect(onCancel).toHaveBeenCalledTimes(1)

    await userEvent.click(document.querySelector<HTMLElement>('.sync-model-value')!)

    await vi.waitFor(() => {
      expect(mockTreeSelectState.lastActiveId).toBe('nj')
    })
  })

  it('应该在关闭工具栏时不渲染确认和取消按钮', () => {
    render(() => (
      <TreeSelectPanel
        items={items}
        modelValue="hz"
        showToolbar={false}
      />
    ))

    expect(document.querySelector('.van-picker__toolbar')).toBeNull()
    expect(document.querySelector('.van-picker__cancel')).toBeNull()
    expect(document.querySelector('.van-picker__confirm')).toBeNull()
  })
})
