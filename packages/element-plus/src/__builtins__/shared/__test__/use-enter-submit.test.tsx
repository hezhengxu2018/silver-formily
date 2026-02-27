import type { Ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useEnterSubmit } from '../use-enter-submit'

interface HookHarness {
  containerRef: Ref<HTMLElement | null>
  visible: Ref<boolean>
  submitting: Ref<boolean>
  resolve: ReturnType<typeof vi.fn>
}

function createHarness(enabled: Ref<boolean> | boolean = true): HookHarness {
  const harness: HookHarness = {
    containerRef: ref<HTMLElement | null>(null),
    visible: ref(true),
    submitting: ref(false),
    resolve: vi.fn(),
  }

  const TestComp = defineComponent({
    name: 'UseEnterSubmitHarness',
    setup() {
      useEnterSubmit({
        visible: harness.visible,
        resolve: harness.resolve,
        submitting: harness.submitting,
        getContainer: () => harness.containerRef.value,
        enabled,
      })

      return () =>
        h('div', { ref: (el: Element | null) => (harness.containerRef.value = el as HTMLElement | null) }, [
          h('input', { class: 'hook-input' }),
          h('textarea', { class: 'hook-textarea' }),
          h('div', { class: 'hook-contenteditable', contenteditable: 'true' }),
        ])
    },
  })

  render(() => h(TestComp))
  return harness
}

function dispatchKeydown(target: EventTarget, init: KeyboardEventInit = {}) {
  const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    bubbles: true,
    cancelable: true,
    ...init,
  })
  target.dispatchEvent(event)
  return event
}

describe('useEnterSubmit', () => {
  it('should resolve and prevent default when pressing Enter in container input', async () => {
    const harness = createHarness(true)
    await vi.waitFor(() => {
      expect(harness.containerRef.value).not.toBeNull()
    })
    const input = harness.containerRef.value?.querySelector('.hook-input') as HTMLInputElement
    const event = dispatchKeydown(input)

    expect(harness.resolve).toHaveBeenCalledTimes(1)
    expect(event.defaultPrevented).toBe(true)
  })

  it('should skip submit for non-enter or invalid enter cases', async () => {
    const harness = createHarness(true)
    await vi.waitFor(() => {
      expect(harness.containerRef.value).not.toBeNull()
    })
    const input = harness.containerRef.value?.querySelector('.hook-input') as HTMLInputElement

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    dispatchKeydown(input, { shiftKey: true })
    dispatchKeydown(input, { altKey: true })
    dispatchKeydown(input, { ctrlKey: true })
    dispatchKeydown(input, { metaKey: true })
    dispatchKeydown(input, { isComposing: true })

    const preventedEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    })
    preventedEvent.preventDefault()
    input.dispatchEvent(preventedEvent)

    harness.visible.value = false
    await nextTick()
    dispatchKeydown(input)
    harness.visible.value = true

    harness.submitting.value = true
    await nextTick()
    dispatchKeydown(input)
    dispatchKeydown(globalThis)

    expect(harness.resolve).not.toHaveBeenCalled()
  })

  it('should skip submit for textarea and contenteditable targets', async () => {
    const harness = createHarness(true)
    await vi.waitFor(() => {
      expect(harness.containerRef.value).not.toBeNull()
    })
    const textarea = harness.containerRef.value?.querySelector('.hook-textarea') as HTMLTextAreaElement
    const contenteditable = harness.containerRef.value?.querySelector('.hook-contenteditable') as HTMLDivElement

    dispatchKeydown(textarea)
    dispatchKeydown(contenteditable)

    expect(harness.resolve).not.toHaveBeenCalled()
  })

  it('should skip submit when container is missing or target is outside container', async () => {
    const harness = createHarness(false)
    await vi.waitFor(() => {
      expect(harness.containerRef.value).not.toBeNull()
    })
    const input = harness.containerRef.value?.querySelector('.hook-input') as HTMLInputElement

    dispatchKeydown(input)

    const outside = document.createElement('input')
    document.body.append(outside)
    dispatchKeydown(outside)

    const withNoContainer = createHarness(true)
    withNoContainer.containerRef.value = null
    dispatchKeydown(globalThis)

    expect(harness.resolve).not.toHaveBeenCalled()
    expect(withNoContainer.resolve).not.toHaveBeenCalled()
    outside.remove()
  })

  it('should react to enabled ref changes', async () => {
    const enabled = ref(false)
    const harness = createHarness(enabled)
    await vi.waitFor(() => {
      expect(harness.containerRef.value).not.toBeNull()
    })
    const input = harness.containerRef.value?.querySelector('.hook-input') as HTMLInputElement

    dispatchKeydown(input)
    expect(harness.resolve).not.toHaveBeenCalled()

    enabled.value = true
    await nextTick()
    dispatchKeydown(input)
    expect(harness.resolve).toHaveBeenCalledTimes(1)

    enabled.value = false
    await nextTick()
    dispatchKeydown(input)
    expect(harness.resolve).toHaveBeenCalledTimes(1)
  })
})
