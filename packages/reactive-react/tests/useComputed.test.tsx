import type { IComputedOptions } from '../src'
import { observable } from '@silver-formily/reactive'
import { StrictMode } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { useComputed } from '../src'

afterEach(cleanup)

const flushAsyncCleanup = () => new Promise(resolve => setTimeout(resolve, 0))

function setupComputed<T>(getter: () => T, options?: IComputedOptions<T>) {
  let renderCount = 0
  const App = () => {
    renderCount++
    const value = useComputed(getter, options)
    return <div data-testid="value">{String(value)}</div>
  }
  return { render: () => render(<App />), renderCount: () => renderCount }
}

describe('useComputed', () => {
  it('returns the initial value on first render and updates on mutation', async () => {
    const obs = observable({ price: 10, count: 2 })
    const { render, renderCount } = setupComputed(() => obs.price * obs.count)
    const screen = await render()
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('20')

    obs.count = 3
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('30')
    expect(renderCount()).toBe(2)
  })

  it('skips re-render when equals reports the value as unchanged', async () => {
    const obs = observable({ a: 1, b: 2 })
    const { render, renderCount } = setupComputed(
      () => obs.a + obs.b,
      { equals: (oldValue, newValue) => oldValue === newValue },
    )
    const screen = await render()
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('3')

    obs.a = 2
    obs.b = 1
    await flushAsyncCleanup()
    expect(renderCount()).toBe(1)
  })

  it('rebuilds tracking with the fresh getter when deps change', async () => {
    const obs = observable({ usd: 100, rate: 7.2 })
    let multiplier = 1
    const received: string[] = []
    const App = ({ step }: { step: number }) => {
      multiplier = step
      const value = useComputed(() => obs.usd * obs.rate * multiplier, {
        deps: [step],
      })
      received.push(String(value))
      return <div data-testid="value">{value}</div>
    }
    const screen = await render(<App step={1} />)
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('720')

    // 只改 deps：旧 getter 不再生效，新 getter 立即接管
    await screen.rerender(<App step={2} />)
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('1440')

    // deps 重建后 observable 变更仍能推送，且使用的是新 getter
    obs.usd = 200
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('2880')
  })

  it('stops updating after unmount', async () => {
    const obs = observable({ count: 0 })
    const { render, renderCount } = setupComputed(() => obs.count)
    const screen = await render()
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('0')

    await screen.unmount()
    await flushAsyncCleanup()
    obs.count = 42
    await flushAsyncCleanup()
    expect(renderCount()).toBe(1)
  })

  it('works under StrictMode without duplicate instances', async () => {
    const obs = observable({ count: 0 })
    const renders: boolean[] = []
    const App = () => {
      renders.push(true)
      const value = useComputed(() => obs.count)
      return <div data-testid="value">{value}</div>
    }
    const screen = await render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('0')
    const rendersAfterMount = renders.length

    obs.count = 5
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('5')
    // StrictMode 每次提交都会双调用渲染函数：+2 表示一次 setValue 只触发了一轮提交，
    // 若存在重复 reaction 实例则会翻倍
    expect(renders.length).toBe(rendersAfterMount + 2)
  })
})
