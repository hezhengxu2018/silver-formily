import type { IObserverOptions } from '../src'
import { observable } from '@silver-formily/reactive'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { useObserver } from '../src'

afterEach(cleanup)

function setupUseObserver(options?: IObserverOptions) {
  const obs = observable({ value: 'initial' })
  let renderCount = 0
  const App = () => {
    renderCount++
    return useObserver(
      () => <div data-testid="value">{obs.value}</div>,
      options,
    )
  }
  return { obs, render: () => render(<App />), renderCount: () => renderCount }
}

describe('useObserver', () => {
  it('tracks dependencies and re-renders on mutation', async () => {
    const { obs, render, renderCount } = setupUseObserver()
    const screen = await render()
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('initial')

    obs.value = 'updated'
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('updated')
    expect(renderCount()).toBe(2)
  })

  it('delegates updates to the custom scheduler when provided', async () => {
    const scheduler = vi.fn((updater: () => void) => {
      // 延迟一拍再执行更新，验证 scheduler 完全接管更新时机
      Promise.resolve().then(updater)
    })
    const { obs, render } = setupUseObserver({ scheduler })
    const screen = await render()
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('initial')

    obs.value = 'scheduled'
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('scheduled')
    expect(scheduler).toHaveBeenCalled()
  })

  it('re-collects dependencies on each render', async () => {
    const a = observable({ value: 'a' })
    const b = observable({ value: 'b' })
    const toggle = observable({ useB: false })
    let renderCount = 0
    const App = () => {
      renderCount++
      return useObserver(() => (
        <div data-testid="value">{toggle.useB ? b.value : a.value}</div>
      ))
    }
    const screen = await render(<App />)
    await expect.element(screen.getByTestId('value')).toHaveTextContent('a')

    // 切换到 b 之后，a 的变更不应再触发渲染
    toggle.useB = true
    await expect.element(screen.getByTestId('value')).toHaveTextContent('b')
    const countAfterToggle = renderCount

    a.value = 'a2'
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(renderCount).toBe(countAfterToggle)

    b.value = 'b2'
    await expect.element(screen.getByTestId('value')).toHaveTextContent('b2')
    expect(renderCount).toBe(countAfterToggle + 1)
  })

  it('stops tracking after unmount without errors', async () => {
    const { obs, render, renderCount } = setupUseObserver()
    const { unmount } = await render()
    await unmount()

    obs.value = 'after-unmount'
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(renderCount()).toBe(1)
  })
})
