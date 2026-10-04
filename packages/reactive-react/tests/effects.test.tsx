import { StrictMode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { useCompatEffect, useDidUpdate } from '../src'

afterEach(cleanup)

describe('useCompatEffect', () => {
  it.each([false, true])('cleans up on each update without deps (StrictMode: %s)', async (strict) => {
    const events: string[] = []
    const Comp = ({ value }: { value: number }) => {
      useCompatEffect(() => {
        events.push(`setup:${value}`)
        return () => {
          events.push(`dispose:${value}`)
        }
      })
      return <div>{value}</div>
    }
    const view = (value: number) => strict
      ? <StrictMode><Comp value={value} /></StrictMode>
      : <Comp value={value} />
    const { rerender, unmount } = await render(view(1))
    expect(events).not.toContain('dispose:1')
    events.length = 0

    await rerender(view(2))
    expect(events).toEqual(['dispose:1', 'setup:2'])
    await rerender(view(3))
    expect(events).toEqual(['dispose:1', 'setup:2', 'dispose:2', 'setup:3'])
    await unmount()
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(events.at(-1)).toBe('dispose:3')
  })

  it('cleans up when a dependency changes from positive to negative zero', async () => {
    const dispose = vi.fn()
    const Comp = ({ value }: { value: number }) => {
      useCompatEffect(() => dispose, [value])
      return <div>{value}</div>
    }
    const { rerender } = await render(<Comp value={0} />)
    await rerender(<Comp value={-0} />)
    expect(dispose).toHaveBeenCalledTimes(1)
  })

  it('keeps a NaN dependency stable during StrictMode replay', async () => {
    const dispose = vi.fn()
    const Comp = () => {
      useCompatEffect(() => dispose, [Number.NaN])
      return <div>content</div>
    }
    const { unmount } = await render(<StrictMode><Comp /></StrictMode>)
    expect(dispose).not.toHaveBeenCalled()
    await unmount()
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(dispose).toHaveBeenCalledTimes(1)
  })

  it('invokes dispose synchronously when deps change', async () => {
    const dispose = vi.fn()
    const Comp = ({ dep }: { dep: number }) => {
      useCompatEffect(() => dispose, [dep])
      return <div>{dep}</div>
    }
    const { rerender } = await render(<Comp dep={1} />)
    await rerender(<Comp dep={2} />)
    expect(dispose).toHaveBeenCalledTimes(1)
  })

  it('does not run dispose during StrictMode remount cycles', async () => {
    const dispose = vi.fn()
    const Comp = () => {
      useCompatEffect(() => dispose, [])
      return <div>content</div>
    }
    const { unmount } = await render(
      <StrictMode>
        <Comp />
      </StrictMode>,
    )
    // StrictMode 下 effect 会经历 mount → cleanup → remount，
    // cleanup 因 deps 未变化走 immediate 延迟路径，重挂载后 mountedRef 恢复为 true，
    // 因此不应触发 dispose
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(dispose).not.toHaveBeenCalled()

    await unmount()
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(dispose).toHaveBeenCalledTimes(1)
  })

  it('runs dispose after unmount even when deps are stable', async () => {
    const dispose = vi.fn()
    const Comp = () => {
      useCompatEffect(() => dispose, [])
      return <div>content</div>
    }
    const { unmount } = await render(<Comp />)
    await unmount()
    // deps 未变化的卸载走 immediate 延迟路径
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(dispose).toHaveBeenCalledTimes(1)
  })
})

describe('useDidUpdate', () => {
  it('invokes callback synchronously on every commit', async () => {
    const callback = vi.fn()
    const Comp = ({ value }: { value: number }) => {
      useDidUpdate(callback)
      return <div>{value}</div>
    }
    const { rerender } = await render(<Comp value={1} />)
    // 上游语义：render 期间排 immediate，layout effect 中取消并同步调用，
    // 因此首次 commit 也会调用（与 useForceUpdate 的 RENDER_COUNT 配对计数依赖该行为）
    expect(callback).toHaveBeenCalledTimes(1)

    await rerender(<Comp value={2} />)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
