import type { DatePickerPanelResolvedValue } from '../types'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { ref } from 'vue'
import DatePickerPanel from '../date-picker-panel.vue'

const datePickerMockState = vi.hoisted(() => {
  return {
    lastProps: undefined as Record<string, unknown> | undefined,
    lastModelValue: undefined as string[] | undefined,
  }
})

vi.mock('vant', async () => {
  const vue = await import('vue')

  return {
    DatePicker: vue.defineComponent({
      name: 'MockVanDatePicker',
      props: {
        modelValue: {
          type: Array,
          default: () => [],
        },
      },
      emits: ['update:model-value', 'cancel', 'confirm'],
      setup(props, { emit, slots, attrs }) {
        return () => {
          datePickerMockState.lastProps = attrs as Record<string, unknown>
          datePickerMockState.lastModelValue = [...(props.modelValue as string[])]

          return vue.h('div', { class: 'mock-date-picker-panel' }, [
            vue.h('div', { class: 'mock-model-value' }, JSON.stringify(props.modelValue ?? [])),
            vue.h('button', {
              class: 'mock-update-model-value',
              type: 'button',
              onClick: () => emit('update:model-value', ['2026', '05', '20']),
            }, 'update model value'),
            vue.h('button', {
              class: 'mock-cancel',
              type: 'button',
              onClick: () => emit('cancel'),
            }, 'cancel'),
            vue.h('button', {
              class: 'mock-confirm',
              type: 'button',
              onClick: () => emit('confirm', { selectedValues: ['2026', '05', '20'] }),
            }, 'confirm'),
            slots.option?.({ option: { text: '20' } }),
            slots.title?.(),
            slots.cancel?.(),
            slots.confirm?.(),
            slots.toolbar?.(),
            slots['columns-top']?.(),
            slots['columns-bottom']?.(),
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
  datePickerMockState.lastProps = undefined
  datePickerMockState.lastModelValue = undefined
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

describe('date-picker-panel slots', () => {
  it('应该透传全部插槽，并在确认取消时同步内部值', async () => {
    const onUpdateModelValue = vi.fn()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    render(() => (
      <DatePickerPanel
        modelValue="2026-03-30"
        disabled
        onUpdate:modelValue={onUpdateModelValue}
        onConfirm={onConfirm}
        onCancel={onCancel}
      >
        {{
          'option': ({ option }: { option: { text: string } }) => <div class="slot-option">{option.text}</div>,
          'title': () => <div class="slot-title">标题</div>,
          'cancel': () => <div class="slot-cancel">取消</div>,
          'confirm': () => <div class="slot-confirm">确认</div>,
          'toolbar': () => <div class="slot-toolbar">工具栏</div>,
          'columns-top': () => <div class="slot-columns-top">顶部</div>,
          'columns-bottom': () => <div class="slot-columns-bottom">底部</div>,
        }}
      </DatePickerPanel>
    ))

    expect(document.querySelector('.slot-option')?.textContent).toContain('20')
    expect(document.querySelector('.slot-title')?.textContent).toContain('标题')
    expect(document.querySelector('.slot-cancel')?.textContent).toContain('取消')
    expect(document.querySelector('.slot-confirm')?.textContent).toContain('确认')
    expect(document.querySelector('.slot-toolbar')?.textContent).toContain('工具栏')
    expect(document.querySelector('.slot-columns-top')?.textContent).toContain('顶部')
    expect(document.querySelector('.slot-columns-bottom')?.textContent).toContain('底部')
    expect(datePickerMockState.lastProps?.readonly).toBe(true)

    await userEvent.click(document.querySelector<HTMLElement>('.mock-update-model-value')!)

    await vi.waitFor(() => {
      expect(datePickerMockState.lastModelValue).toEqual(['2026', '05', '20'])
    })

    await userEvent.click(document.querySelector<HTMLElement>('.mock-cancel')!)

    await vi.waitFor(() => {
      expect(datePickerMockState.lastModelValue).toEqual(['2026', '03', '30'])
    })

    expect(onCancel).toHaveBeenCalledTimes(1)

    await userEvent.click(document.querySelector<HTMLElement>('.mock-update-model-value')!)
    await userEvent.click(document.querySelector<HTMLElement>('.mock-confirm')!)

    expect(onUpdateModelValue).toHaveBeenCalledWith('2026-05-20')
    expect(onConfirm).toHaveBeenCalledWith('2026-05-20')
  })

  it('应该在外部 modelValue 更新后同步内部值，并保留非禁用 readonly=false', async () => {
    const sourceValue = ref<DatePickerPanelResolvedValue>('2026-03-30')

    render(() => (
      <div>
        <button
          class="sync-model-value"
          type="button"
          onClick={() => {
            sourceValue.value = '2027-01-15'
          }}
        >
          sync
        </button>
        <DatePickerPanel modelValue={sourceValue.value} />
      </div>
    ))

    expect(datePickerMockState.lastProps?.readonly).toBe(false)
    expect(datePickerMockState.lastModelValue).toEqual(['2026', '03', '30'])

    await userEvent.click(document.querySelector<HTMLElement>('.sync-model-value')!)

    await vi.waitFor(() => {
      expect(datePickerMockState.lastModelValue).toEqual(['2027', '01', '15'])
    })
  })
})
