import { expect, it, vi } from 'vitest'
import { Heart, LifeCycle } from '../models'

it('buildLifecycles', () => {
  const heart = new Heart({
    lifecycles: [{} as any, [{}], 123],
  })
  expect(heart.lifecycles.length).toEqual(0)
})

it('clear heart', () => {
  const handler = vi.fn()
  const heart = new Heart({
    lifecycles: [new LifeCycle('event', handler)],
  })
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.clear()
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.publish({})
})

it('set lifecycles', () => {
  const handler = vi.fn()
  const heart = new Heart()
  heart.setLifeCycles([new LifeCycle('event', handler)])
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.setLifeCycles()
})

it('add/remove lifecycle', () => {
  const handler = vi.fn()
  const heart = new Heart()
  heart.addLifeCycles('xxx', [new LifeCycle('event', handler)])
  heart.addLifeCycles('yyy')
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.removeLifeCycles('xxx')
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
})

it('add/clear lifecycle', () => {
  const handler = vi.fn()
  const heart = new Heart()
  heart.addLifeCycles('xxx', [new LifeCycle('event', handler)])
  heart.addLifeCycles('yyy')
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.clear()
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
})
