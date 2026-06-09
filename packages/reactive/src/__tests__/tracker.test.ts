import { expect, it, vi } from 'vitest'
import { observable, Tracker } from '../'

it('base tracker', () => {
  const obs = observable<any>({})
  const fn = vi.fn()
  let tracker: Tracker
  const view = () => {
    fn(obs.value)
  }
  const scheduler = () => {
    tracker.track(view)
  }
  tracker = new Tracker(scheduler)

  tracker.track(view)
  obs.value = 123
  expect(fn).nthCalledWith(1, undefined)
  expect(fn).nthCalledWith(2, 123)
  tracker.dispose()
})

it('nested tracker', () => {
  const obs = observable<any>({})
  const fn = vi.fn()
  let tracker: Tracker
  const view = () => {
    obs.value = obs.value || 321
    fn(obs.value)
  }
  const scheduler = () => {
    tracker.track(view)
  }
  tracker = new Tracker(scheduler)

  tracker.track(view)
  expect(fn).toBeCalledTimes(1)
  expect(fn).nthCalledWith(1, 321)
  obs.value = 123
  expect(fn).toBeCalledTimes(2)
  expect(fn).nthCalledWith(2, 123)
  tracker.dispose()
})

it('tracker recollect dependencies', () => {
  const obs = observable<any>({
    aa: 'aaa',
    bb: 'bbb',
    cc: 'ccc',
  })
  const fn = vi.fn()
  let tracker: Tracker
  const view = () => {
    fn()
    if (obs.aa === 'aaa') {
      return obs.bb
    }
    return obs.cc
  }
  const scheduler = () => {
    tracker.track(view)
  }
  tracker = new Tracker(scheduler)

  tracker.track(view)
  obs.aa = '111'
  obs.bb = '222'
  expect(fn).toBeCalledTimes(2)
  tracker.dispose()
})

it('shared scheduler with multi tracker(mock react strict mode)', () => {
  const obs = observable<any>({})
  let tracker1: Tracker
  let tracker2: Tracker

  const component = () => obs.value

  const render = () => {
    tracker1.track(component)
    tracker2.track(component)
  }

  const scheduler1 = vi.fn(() => {
    tracker2.track(component)
  })
  const scheduler2 = vi.fn(() => {
    tracker1.track(component)
  })
  tracker1 = new Tracker(scheduler1, 'tracker1')
  tracker2 = new Tracker(scheduler2, 'tracker2')

  render()

  obs.value = 123

  expect(scheduler1).toBeCalledTimes(1)
  expect(scheduler2).toBeCalledTimes(0)
})
