import { afterEach, describe, expect, it, vi } from 'vitest'
import { onUrlChange } from '../url-change-listener'

describe('url-change-listener', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should notify listeners when pushState or replaceState is called', () => {
    const listener = vi.fn()
    const dispose = onUrlChange(listener)

    window.history.pushState({}, '', '/push-state-test')
    window.history.replaceState({}, '', '/replace-state-test')

    expect(listener).toHaveBeenCalledTimes(2)

    dispose()
  })

  it('should notify listeners when popstate or hashchange is dispatched', () => {
    const listener = vi.fn()
    const dispose = onUrlChange(listener)

    window.dispatchEvent(new PopStateEvent('popstate'))
    window.dispatchEvent(new HashChangeEvent('hashchange'))

    expect(listener).toHaveBeenCalledTimes(2)

    dispose()
  })

  it('should restore patched history methods after the last listener unsubscribes', () => {
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState
    const firstListener = vi.fn()
    const secondListener = vi.fn()

    const disposeFirst = onUrlChange(firstListener)
    const disposeSecond = onUrlChange(secondListener)

    expect(window.history.pushState).not.toBe(originalPushState)
    expect(window.history.replaceState).not.toBe(originalReplaceState)

    disposeFirst()
    expect(window.history.pushState).not.toBe(originalPushState)
    expect(window.history.replaceState).not.toBe(originalReplaceState)

    disposeSecond()
    expect(window.history.pushState).toBe(originalPushState)
    expect(window.history.replaceState).toBe(originalReplaceState)
  })

  it('should stop notifying a listener after unsubscribe', () => {
    const listener = vi.fn()
    const dispose = onUrlChange(listener)

    dispose()
    window.dispatchEvent(new PopStateEvent('popstate'))

    expect(listener).not.toHaveBeenCalled()
  })
})
