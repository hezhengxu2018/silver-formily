import { observable } from '@silver-formily/reactive'
import { StrictMode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { autorunEffect, reactionWatch } from '../src'

afterEach(cleanup)

const flushAsyncCleanup = () => new Promise(resolve => setTimeout(resolve, 0))

describe('autorunEffect', () => {
  it('runs the tracker after mount and re-runs on mutation', async () => {
    const obs = observable({ count: 0 })
    const runs: number[] = []
    const Comp = () => {
      autorunEffect(() => {
        runs.push(obs.count)
      })
      return <div data-testid="count">{obs.count}</div>
    }
    await render(<Comp />)
    await vi.waitFor(() => expect(runs).toEqual([0]))

    obs.count = 1
    expect(runs).toEqual([0, 1])
  })

  it('re-runs the tracker exactly once per mutation under StrictMode', async () => {
    const obs = observable({ count: 0 })
    const runs: number[] = []
    const Comp = () => {
      autorunEffect(() => {
        runs.push(obs.count)
      })
      return <div>{obs.count}</div>
    }
    await render(
      <StrictMode>
        <Comp />
      </StrictMode>,
    )
    await vi.waitFor(() => expect(runs.length).toBeGreaterThan(0))

    // StrictMode 重放会重建 autorun，但旧实例必须被销毁：一次变更只触发一次 tracker
    obs.count = 1
    expect(runs.filter(run => run === 1)).toHaveLength(1)
  })

  it('disposes the autorun on unmount', async () => {
    const obs = observable({ count: 0 })
    const runs: number[] = []
    const Comp = () => {
      autorunEffect(() => {
        runs.push(obs.count)
      })
      return <div>{obs.count}</div>
    }
    const { unmount } = await render(<Comp />)
    await vi.waitFor(() => expect(runs).toEqual([0]))

    await unmount()
    // 卸载清理走微任务延迟路径，等一拍再变更，验证不再触发
    await flushAsyncCleanup()
    obs.count = 9
    expect(runs).toEqual([0])
  })
})

describe('reactionWatch', () => {
  it('notifies the subscriber with new and old values on mutation', async () => {
    const obs = observable({ count: 0 })
    const received: Array<[number, number]> = []
    const Comp = () => {
      reactionWatch(
        () => obs.count,
        (value, oldValue) => {
          received.push([value, oldValue])
        },
      )
      return <div>{obs.count}</div>
    }
    await render(<Comp />)
    await vi.waitFor(() => expect(received).toEqual([]))

    obs.count = 1
    obs.count = 2
    expect(received).toEqual([[1, 0], [2, 1]])
  })

  it('fires the subscriber immediately when fireImmediately is set', async () => {
    const obs = observable({ count: 0 })
    const received: number[] = []
    const Comp = () => {
      reactionWatch(
        () => obs.count,
        value => received.push(value),
        { fireImmediately: true },
      )
      return <div>{obs.count}</div>
    }
    await render(<Comp />)
    await vi.waitFor(() => expect(received).toEqual([0]))
  })

  it('disposes the reaction on unmount', async () => {
    const obs = observable({ count: 0 })
    const received: number[] = []
    const Comp = () => {
      reactionWatch(() => obs.count, value => received.push(value))
      return <div>{obs.count}</div>
    }
    const { unmount } = await render(<Comp />)
    await vi.waitFor(() => expect(received).toEqual([]))

    await unmount()
    await flushAsyncCleanup()
    obs.count = 9
    expect(received).toEqual([])
  })
})
