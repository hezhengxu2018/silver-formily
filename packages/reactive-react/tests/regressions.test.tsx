import type { Ref } from 'react'
import { observable } from '@silver-formily/reactive'
import { createRef, forwardRef, memo, StrictMode, Suspense, version } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Observer, observer, useAutorunEffect, useCompatEffect, useComputed, useObserver, useReactionWatch } from '../src'

afterEach(cleanup)

it('keeps function-valued computed results without executing them', async () => {
  const first = vi.fn(() => 'first')
  const second = vi.fn(() => 'second')
  let actual: unknown
  function App({ fn }: { fn: () => string }) {
    actual = useComputed(() => fn, { deps: [fn] })
    return null
  }
  const screen = await render(<App fn={first} />)
  expect(actual).toBe(first)
  await screen.rerender(<App fn={second} />)
  expect(actual).toBe(second)
  expect(first).not.toHaveBeenCalled()
  expect(second).not.toHaveBeenCalled()
})

it('always synchronizes computed values after deps changes, even with unsupported runtime options', async () => {
  let actual: unknown
  function App({ value }: { value: number }) {
    // @ts-expect-error fireImmediately is not configurable for computed state
    actual = useComputed(() => value, { deps: [value], fireImmediately: false })
    return null
  }
  const screen = await render(<App value={1} />)
  await screen.rerender(<App value={2} />)
  expect(actual).toBe(2)
})

it('uses updated computed equality options when rebuilding', async () => {
  const state = observable({ value: 0 })
  let actual: unknown
  function App({ freeze }: { freeze: boolean }) {
    actual = useComputed(() => state.value, { deps: [freeze], equals: () => freeze })
    return null
  }
  const screen = await render(<App freeze />)
  state.value = 1
  expect(actual).toBe(0)
  await screen.rerender(<App freeze={false} />)
  state.value = 2
  await vi.waitFor(() => expect(actual).toBe(2))
})

it('retains exactly one compat effect resource through StrictMode replay and deps changes', async () => {
  const active = new Set<object>()
  const setup = vi.fn()
  function App({ dep }: { dep: number }) {
    useCompatEffect(() => {
      setup()
      const subscription = {}
      active.add(subscription)
      return () => {
        active.delete(subscription)
      }
    }, [dep])
    return null
  }
  const screen = await render(<StrictMode><App dep={1} /></StrictMode>)
  expect(setup).toHaveBeenCalledTimes(1)
  expect(active.size).toBe(1)
  await screen.rerender(<StrictMode><App dep={2} /></StrictMode>)
  expect(setup).toHaveBeenCalledTimes(2)
  expect(active.size).toBe(1)
  await screen.unmount()
  await new Promise(resolve => setTimeout(resolve, 0))
  expect(active.size).toBe(0)
})

it('tracks memo components while preserving their props comparator', async () => {
  const state = observable({ value: 0 })
  const compare = vi.fn(() => true)
  const App = observer(memo(({ label }: { label: string }) => (
    <div data-testid="memo">
      {label}
      :
      {state.value}
    </div>
  ), compare))
  const screen = await render(<App label="first" />)
  await screen.rerender(<App label="second" />)
  expect(compare).toHaveBeenCalled()
  await expect.element(screen.getByTestId('memo')).toHaveTextContent('first:0')
  state.value = 1
  await expect.element(screen.getByTestId('memo')).toHaveTextContent('first:1')
})

it('tracks nested memo and forwardRef components and forwards their refs', async () => {
  const state = observable({ value: 0 })
  const App = observer(memo(memo(forwardRef<HTMLDivElement>((_props, ref) => (
    <div ref={ref} data-testid="forward">{state.value}</div>
  )))))
  const ref = createRef<HTMLDivElement>()
  const screen = await render(<App ref={ref} />)
  expect(ref.current?.textContent).toBe('0')
  state.value = 1
  await expect.element(screen.getByTestId('forward')).toHaveTextContent('1')
  await screen.unmount()
  expect(ref.current).toBeNull()
})

it.skipIf(Number.parseInt(version) < 19)('preserves React 19 ref props without forwardRef options', async () => {
  const App = observer((props: { ref?: Ref<HTMLDivElement> }) => <div ref={props.ref}>ref</div>)
  const ref = createRef<HTMLDivElement>()
  const screen = await render(<App ref={ref} />)
  expect(ref.current?.textContent).toBe('ref')
  await screen.unmount()
  expect(ref.current).toBeNull()
})

it('renders nullable and primitive Observer render props', async () => {
  const screen = await render(<Observer>{() => null}</Observer>)
  expect(screen.container.textContent).toBe('')
  await screen.rerender(<Observer>{() => 'text'}</Observer>)
  expect(screen.container.textContent).toBe('text')
  await screen.rerender(<Observer>{() => [1, 2]}</Observer>)
  expect(screen.container.textContent).toBe('12')
})

it('uses the latest committed reaction callbacks without resetting oldValue', async () => {
  const state = observable({ value: 0 })
  const received: number[][] = []
  function App({ multiplier }: { multiplier: number }) {
    useReactionWatch(() => state.value, (value, oldValue) => {
      received.push([value * multiplier, oldValue])
    })
    return null
  }
  const screen = await render(<App multiplier={1} />)
  state.value = 1
  await screen.rerender(<App multiplier={2} />)
  state.value = 3
  expect(received).toEqual([[1, 0], [6, 1]])
})

it('rebinds reaction dependencies and disposes the old observable on deps changes', async () => {
  const first = observable({ value: 1 })
  const second = observable({ value: 2 })
  const received: number[] = []
  function App({ state }: { state: typeof first }) {
    useReactionWatch(() => state.value, value => received.push(value), { deps: [state], fireImmediately: true })
    return null
  }
  const screen = await render(<App state={first} />)
  await screen.rerender(<App state={second} />)
  first.value = 10
  second.value = 20
  expect(received).toEqual([1, 2, 20])
  await screen.unmount()
  second.value = 30
  expect(received).toEqual([1, 2, 20])
})

it('uses fresh autorun callbacks and rebuilds tracking when deps change', async () => {
  const state = observable({ value: 1 })
  const received: number[] = []
  function App({ multiplier }: { multiplier: number }) {
    useAutorunEffect(() => {
      received.push(state.value * multiplier)
    }, { name: 'props', deps: [multiplier] })
    return null
  }
  const screen = await render(<App multiplier={1} />)
  await screen.rerender(<App multiplier={2} />)
  state.value = 3
  expect(received).toEqual([1, 2, 6])
  await screen.unmount()
  state.value = 4
  expect(received).toEqual([1, 2, 6])
})


it('does not publish callbacks from a suspended render', async () => {
  const state = observable({ value: 0 })
  const pending = new Promise<never>(() => {})
  let actual: number | undefined
  function App({ multiplier, suspend }: { multiplier: number, suspend?: boolean }) {
    useReactionWatch(() => state.value, (value) => {
      actual = value * multiplier
    })
    if (suspend)
      throw pending
    return null
  }
  const screen = await render(<Suspense fallback="loading"><App multiplier={1} /></Suspense>)
  await screen.rerender(<Suspense fallback="loading"><App multiplier={2} suspend /></Suspense>)
  state.value = 3
  expect(actual).toBe(3)
})

it('uses the latest committed useObserver scheduler', async () => {
  const state = observable({ value: 0 })
  const first = vi.fn((update: () => void) => update())
  const second = vi.fn((update: () => void) => update())
  function App({ scheduler }: { scheduler: (update: () => void) => void }) {
    return useObserver(() => <div>{state.value}</div>, { scheduler })
  }
  const screen = await render(<App scheduler={first} />)
  await screen.rerender(<App scheduler={second} />)
  state.value = 1
  expect(first).not.toHaveBeenCalled()
  expect(second).toHaveBeenCalledTimes(1)
})


it('honors a memo comparator that requests a render for unchanged props', async () => {
  const renders = vi.fn()
  const App = observer(memo(({ value }: { value: number }) => {
    renders()
    return <div>{value}</div>
  }, () => false))
  const screen = await render(<App value={1} />)
  const initial = renders.mock.calls.length
  await screen.rerender(<App value={1} />)
  expect(renders).toHaveBeenCalledTimes(initial + 1)
})
