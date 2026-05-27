import { describe, expect, it, vi } from 'vitest'
import { autorun, observable, raw } from '..'

describe('map', () => {
  it('should be a proper JS Map', () => {
    const map = observable(new Map())
    expect(map).toBeInstanceOf(Map)
    expect(raw(map)).toBeInstanceOf(Map)
  })

  it('should autorun mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    map.set('key', 'value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith('value2')
    map.delete('key')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(undefined)
  })

  it('should autorun size mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(map.size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key1', 'value')
    map.set('key2', 'value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(2)
    map.delete('key1')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(1)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  it('should autorun for of iteration', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0

      for (const [, num] of map) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  it('should autorun forEach iteration', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      map.forEach(num => (sum += num))
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  it('should autorun keys iteration', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      for (const key of map.keys()) {
        sum += key
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set(3, 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set(2, 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  it('should autorun values iteration', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      for (const num of map.values()) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  it('should autorun entries iteration', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0

      for (const [, num] of map.entries()) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  it('should be triggered by clearing', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.clear()
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(undefined)
  })

  it('should not autorun custom property mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map()) as Map<any, any> & {
      customProp?: string
    }
    autorun(() => handler(map.customProp))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.customProp = 'Hello World'
    expect(handler).toBeCalledTimes(1)
  })

  it('should not autorun non value changing mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(2)
    map.delete('key')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(undefined)
    map.delete('key')
    expect(handler).toBeCalledTimes(3)
    map.clear()
    expect(handler).toBeCalledTimes(3)
  })

  it('should not autorun raw data', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(raw(map).get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 'Hello')
    expect(handler).toBeCalledTimes(1)
    map.delete('key')
    expect(handler).toBeCalledTimes(1)
  })

  it('should not autorun raw iterations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0

      for (const [, num] of raw(map).entries()) {
        sum += num
      }
      for (const key of raw(map).keys()) {
        sum += raw(map).get(key)
      }
      for (const num of raw(map).values()) {
        sum += num
      }
      raw(map).forEach((num) => {
        sum += num
      })

      for (const [, num] of raw(map)) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key1', 2)
    map.set('key2', 3)
    expect(handler).toBeCalledTimes(1)
    map.delete('key1')
    expect(handler).toBeCalledTimes(1)
  })

  it('should not be triggered by raw mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    raw(map).set('key', 'Hello')
    expect(handler).toBeCalledTimes(1)
    raw(map).delete('key')
    expect(handler).toBeCalledTimes(1)
    raw(map).clear()
    expect(handler).toBeCalledTimes(1)
  })

  it('should not autorun raw size mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(raw(map).size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(1)
  })

  it('should not be triggered by raw size mutations', () => {
    const handler = vi.fn()
    const map = observable(new Map())
    autorun(() => handler(map.size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    raw(map).set('key', 'value')
    expect(handler).toBeCalledTimes(1)
  })

  it('should support objects as key', () => {
    const handler = vi.fn()
    const key = {}
    const map = observable(new Map())
    autorun(() => handler(map.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)

    map.set(key, 1)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(1)

    map.set({}, 2)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(1)
  })

  it('observer object', () => {
    const handler = vi.fn()
    const map = observable(new Map<string, Record<string, any>>([]))
    map.set('key', {})
    map.set('key2', observable({}))
    autorun(() => {
      const [obs1, obs2] = [...map.values()]

      handler(obs1.aa, obs2.aa)
    })

    expect(handler).toBeCalledTimes(1)
    const obs1 = map.get('key')
    const obs2 = map.get('key2')
    obs1.aa = '123'
    obs2.aa = '234'
    expect(handler).toBeCalledTimes(3)
  })

  it('shallow', () => {
    const handler = vi.fn()
    const map = observable.shallow(new Map<string, Record<string, any>>([]))
    map.set('key', {})
    autorun(() => {
      const [obs] = [...map.values()]

      handler(obs.aa)
    })

    expect(handler).toBeCalledTimes(1)
    const obs = map.get('key')
    obs.aa = '123'
    expect(handler).toBeCalledTimes(1)
  })
})
