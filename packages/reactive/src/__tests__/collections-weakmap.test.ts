import { describe, expect, it, vi } from 'vitest'
import { autorun, observable, raw } from '..'

describe('weakMap', () => {
  it('should be a proper JS WeakMap', () => {
    const weakMap = observable(new WeakMap())
    expect(weakMap).toBeInstanceOf(WeakMap)
    expect(raw(weakMap)).toBeInstanceOf(WeakMap)
  })

  it('should autorun mutations', () => {
    const handler = vi.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.set(key, 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    weakMap.set(key, 'value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith('value2')
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(undefined)
  })

  it('should not autorun custom property mutations', () => {
    const handler = vi.fn()
    const weakMap = observable(new WeakMap()) as WeakMap<WeakKey, any> & {
      customProp?: string
    }
    autorun(() => handler(weakMap.customProp))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.customProp = 'Hello World'
    expect(handler).toBeCalledTimes(1)
  })

  it('should not autorun non value changing mutations', () => {
    const handler = vi.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.set(key, 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    weakMap.set(key, 'value')
    expect(handler).toBeCalledTimes(2)
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(undefined)
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(3)
  })

  it('should not autorun raw data', () => {
    const handler = vi.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(raw(weakMap).get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.set(key, 'Hello')
    expect(handler).toBeCalledTimes(1)
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(1)
  })

  it('should not be triggered by raw mutations', () => {
    const handler = vi.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    raw(weakMap).set(key, 'Hello')
    expect(handler).toBeCalledTimes(1)
    raw(weakMap).delete(key)
    expect(handler).toBeCalledTimes(1)
  })
})
