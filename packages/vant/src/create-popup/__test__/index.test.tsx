import type { PropType } from 'vue'
import { Picker as VanPicker } from 'vant'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { computed, defineComponent, reactive, ref } from 'vue'
import { createPopup } from '../index'
import 'vant/lib/index.css'

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

function getVisiblePopup() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-popup')).find((popup) => {
    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisibleOverlay() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-overlay')).find((overlay) => {
    return window.getComputedStyle(overlay).display !== 'none'
  }) ?? null
}

function getVisibleElement<T extends Element>(selector: string) {
  const element = getVisiblePopup()?.querySelector<T>(selector) ?? null

  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }

  return element
}

function getVisiblePicker() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-picker')).find((picker) => {
    const popup = picker.closest<HTMLElement>('.van-popup')

    if (!popup) {
      return true
    }

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisibleOption(text: string, columnIndex = 0) {
  const picker = getVisiblePicker()

  if (!picker) {
    throw new Error('Visible picker not found')
  }

  const columns = Array.from(picker.querySelectorAll<HTMLElement>('.van-picker-column'))
  const column = columns[columnIndex]

  if (!column) {
    throw new Error(`Visible picker column not found: ${columnIndex}`)
  }

  const option = Array.from(column.querySelectorAll<HTMLElement>('.van-picker-column__item')).find((element) => {
    return element.textContent?.trim() === text
  })

  if (!option) {
    throw new Error(`Visible option not found: ${text}`)
  }

  return option
}

function getPickerConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button) {
    throw new Error('Picker confirm button not found')
  }

  return button
}

const SessionValueComponent = defineComponent({
  name: 'FunctionalPopupSessionValueComponent',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['confirm', 'cancel', 'update:modelValue'],
  setup(props, { emit, slots }) {
    return () => (
      <div class="functional-popup-session-value">
        {slots.default?.()}
        <div class="current-model-value">{JSON.stringify(props.modelValue ?? [])}</div>
        <button
          class="update-model-value"
          type="button"
          onClick={() => emit('update:modelValue', ['nb'])}
        >
          update
        </button>
        <button
          class="confirm-model-value"
          type="button"
          onClick={() => emit('confirm', { value: [...(props.modelValue ?? [])] })}
        >
          confirm
        </button>
        <button
          class="cancel-model-value"
          type="button"
          onClick={() => emit('cancel')}
        >
          cancel
        </button>
      </div>
    )
  },
})

const FinishValueComponent = defineComponent({
  name: 'FunctionalPopupFinishValueComponent',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['finish', 'cancel', 'update:modelValue'],
  setup(props, { emit }) {
    return () => (
      <div class="functional-popup-finish-value">
        <div class="current-finish-model-value">{JSON.stringify(props.modelValue ?? [])}</div>
        <button
          class="update-finish-model-value"
          type="button"
          onClick={() => emit('update:modelValue', ['sz'])}
        >
          update
        </button>
        <button
          class="finish-model-value"
          type="button"
          onClick={() => emit('finish', { value: [...(props.modelValue ?? [])] })}
        >
          finish
        </button>
      </div>
    )
  },
})

afterEach(async () => {
  document.body.innerHTML = ''
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

describe('functional-popup', () => {
  it('resolves confirm payload after close and keeps modelValue updates in the current session only', async () => {
    const initialValue = ['hz']
    const popup = createPopup<typeof SessionValueComponent, { value: string[] }>(
      {
        duration: 0.01,
      },
      SessionValueComponent,
    )

    const promise = popup.open({
      modelValue: initialValue,
    })

    let settled = false
    let resolvedValue: { value: string[] } | undefined

    promise.then((value) => {
      settled = true
      resolvedValue = value
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
    })

    expect(getVisibleElement('.current-model-value').textContent).toContain('hz')

    await userEvent.click(getVisibleElement('.update-model-value'))

    await vi.waitFor(() => {
      expect(getVisibleElement('.current-model-value').textContent).toContain('nb')
    })

    expect(initialValue).toEqual(['hz'])

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await vi.waitFor(() => {
      expect(settled).toBe(true)
    })

    expect(resolvedValue).toEqual({
      value: ['nb'],
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).toBeNull()
    })
  })

  it('rejects with cancel when the component emits cancel', async () => {
    const popup = createPopup(
      {
        duration: 0.01,
      },
      SessionValueComponent,
    )

    let rejectedError: unknown

    popup.open().catch((error) => {
      rejectedError = error
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
    })

    await userEvent.click(getVisibleElement('.cancel-model-value'))

    await vi.waitFor(() => {
      expect(rejectedError).toBeInstanceOf(Error)
      expect((rejectedError as Error).message).toBe('cancel')
      expect(getVisiblePopup()).toBeNull()
    })
  })

  it('rejects with cancel on overlay close and can open a new session afterwards', async () => {
    const popup = createPopup(
      {
        duration: 0.01,
      },
      SessionValueComponent,
    )

    let rejectedError: unknown

    popup.open().catch((error) => {
      rejectedError = error
    })

    await vi.waitFor(() => {
      expect(getVisibleOverlay()).not.toBeNull()
    })

    await userEvent.click(getVisibleOverlay() as HTMLElement)

    await vi.waitFor(() => {
      expect(rejectedError).toBeInstanceOf(Error)
      expect((rejectedError as Error).message).toBe('cancel')
      expect(getVisiblePopup()).toBeNull()
    })

    const secondPromise = popup.open({
      modelValue: ['hz'],
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
    })

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await expect(secondPromise).resolves.toEqual({
      value: ['hz'],
    })
  })

  it('forwards slots through the third argument', async () => {
    const popup = createPopup<typeof SessionValueComponent, { value: string[] }>(
      {
        duration: 0.01,
      },
      SessionValueComponent,
      {
        default: () => <div class="injected-default-slot">custom slot</div>,
      },
    )

    const promise = popup.open({
      modelValue: ['hz'],
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(getVisibleElement('.injected-default-slot').textContent).toContain('custom slot')
    })

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await expect(promise).resolves.toEqual({
      value: ['hz'],
    })
  })

  it('returns the same promise while the current open session is still pending', async () => {
    const popup = createPopup<typeof SessionValueComponent, { value: string[] }>(
      {
        duration: 0.01,
      },
      SessionValueComponent,
    )

    const firstPromise = popup.open({
      modelValue: ['hz'],
    })
    const secondPromise = popup.open({
      modelValue: ['nb'],
    })

    expect(secondPromise).toBe(firstPromise)

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(getVisibleElement('.current-model-value').textContent).toContain('hz')
    })

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await expect(firstPromise).resolves.toEqual({
      value: ['hz'],
    })
  })

  it('syncs reactive component props source while keeping current session modelValue', async () => {
    const sourceValue = ref(['hz'])
    const popup = createPopup<typeof SessionValueComponent, { value: string[] }>(
      {
        duration: 0.01,
      },
      SessionValueComponent,
    )

    const promise = popup.open(computed(() => {
      return {
        modelValue: sourceValue.value,
      }
    }))

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(getVisibleElement('.current-model-value').textContent).toContain('hz')
    })

    await userEvent.click(getVisibleElement('.update-model-value'))

    await vi.waitFor(() => {
      expect(getVisibleElement('.current-model-value').textContent).toContain('nb')
    })

    sourceValue.value = ['sz']

    await vi.waitFor(() => {
      expect(getVisibleElement('.current-model-value').textContent).toContain('nb')
    })

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await expect(promise).resolves.toEqual({
      value: ['nb'],
    })
  })

  it('syncs reactive object component props source while popup is open', async () => {
    const componentProps = reactive({
      modelValue: ['hz'],
    })
    const popup = createPopup<typeof SessionValueComponent, { value: string[] }>(
      {
        duration: 0.01,
      },
      SessionValueComponent,
    )

    const promise = popup.open(componentProps)

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(getVisibleElement('.current-model-value').textContent).toContain('hz')
    })

    componentProps.modelValue = ['nb']

    await vi.waitFor(() => {
      expect(getVisibleElement('.current-model-value').textContent).toContain('nb')
    })

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await expect(promise).resolves.toEqual({
      value: ['nb'],
    })
  })

  it('overrides reserved props passed through open(componentProps)', async () => {
    const popup = createPopup({}, SessionValueComponent)
    const externalConfirm = vi.fn()
    const externalUpdateModelValue = vi.fn()

    let resolvedValue: { value: string[] } | undefined

    popup.open({
      'modelValue': ['hz'],
      'onConfirm': externalConfirm,
      'onUpdate:modelValue': externalUpdateModelValue,
    } as any).then((value) => {
      resolvedValue = value
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
    })

    await userEvent.click(getVisibleElement('.update-model-value'))

    expect(externalUpdateModelValue).not.toHaveBeenCalled()

    await userEvent.click(getVisibleElement('.confirm-model-value'))

    await vi.waitFor(() => {
      expect(resolvedValue).toEqual({
        value: ['nb'],
      })
    })

    expect(externalConfirm).not.toHaveBeenCalled()
  })

  it('works with official VanPicker confirm payload and forwarded slots', async () => {
    const popup = createPopup<typeof VanPicker, {
      selectedIndexes: number[]
      selectedOptions: Array<{ text?: string, value?: string } | undefined>
      selectedValues: string[]
    }>(
      {
        duration: 0.01,
      },
      VanPicker,
      {
        title: () => <span class="picker-title-slot">custom title</span>,
      },
    )

    const promise = popup.open({
      columns: [
        { text: '杭州', value: 'hz' },
        { text: '宁波', value: 'nb' },
      ],
      modelValue: ['hz'],
      title: '城市',
    })

    await vi.waitFor(() => {
      expect(getVisiblePicker()).not.toBeNull()
      expect(getVisibleElement('.picker-title-slot').textContent).toContain('custom title')
    })

    await userEvent.click(getVisibleOption('宁波'))
    await userEvent.click(getPickerConfirmButton())

    await expect(promise).resolves.toMatchObject({
      selectedValues: ['nb'],
      selectedIndexes: [1],
    })
  })

  it('resolves finish payload for components like Cascader', async () => {
    const popup = createPopup<typeof FinishValueComponent, { value: string[] }>(
      {
        duration: 0.01,
      },
      FinishValueComponent,
    )

    const promise = popup.open({
      modelValue: ['hz'],
    })

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(getVisibleElement('.current-finish-model-value').textContent).toContain('hz')
    })

    await userEvent.click(getVisibleElement('.update-finish-model-value'))

    await vi.waitFor(() => {
      expect(getVisibleElement('.current-finish-model-value').textContent).toContain('sz')
    })

    await userEvent.click(getVisibleElement('.finish-model-value'))

    await expect(promise).resolves.toEqual({
      value: ['sz'],
    })
  })
})
