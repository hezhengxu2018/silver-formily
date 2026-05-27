import { expect, it, vi } from 'vitest'
import { observable, observe } from '../'

it('deep observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
    ee: observable([]),
  })
  const handler = vi.fn()
  observe(obs, handler)
  obs.dd = 123
  obs.aa.bb.cc.push(44)
  expect(obs.aa.bb.cc).toEqual([11, 22, 33, 44])
  expect(handler).toHaveBeenCalledTimes(2)
  delete obs.aa
  expect(handler).toHaveBeenCalledTimes(3)

  // Are these expected behaviors?
  obs.ee.push(11)
  expect(handler).toHaveBeenCalledTimes(3)
  obs.ee = []
  expect(handler).toHaveBeenCalledTimes(4)
  obs.ee.push(11)
  expect(handler).toHaveBeenCalledTimes(5)
})

it('shallow observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = vi.fn()
  observe(obs, handler, false)
  obs.dd = 123
  obs.aa.bb.cc.push(44)
  expect(obs.aa.bb.cc).toEqual([11, 22, 33, 44])
  expect(handler).toHaveBeenCalledTimes(1)
  delete obs.aa
  expect(handler).toHaveBeenCalledTimes(2)
})

it('root replace observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler1 = vi.fn()
  const handler = vi.fn()
  observe(obs, handler1)
  observe(obs.aa, handler)
  obs.aa = {
    mm: 123,
  }
  expect(handler1).toBeCalledTimes(1)
  expect(handler).toBeCalledTimes(1)
  obs.aa = {
    bb: {
      cc: [11, 22, 33],
    },
  }
  obs.aa.bb.cc.push(44)
  expect(handler1).toBeCalledTimes(3)
  expect(handler).toBeCalledTimes(3)
})

it('dispose nested observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = vi.fn()
  const dispose = observe(obs, handler)
  obs.kk = 123
  expect(handler).toBeCalledTimes(1)
  dispose()
  obs.aa = 123
  expect(handler).toBeCalledTimes(1)
})

it('dispose observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = vi.fn()
  const dispose = observe(obs.aa, handler)
  obs.kk = 111
  expect(handler).toBeCalledTimes(0)
  obs.aa = { mm: 222 }
  expect(handler).toBeCalledTimes(1)
  obs.aa = { mm: 222 }
  expect(handler).toBeCalledTimes(2)
  obs.aa = { mm: '111' }
  expect(handler).toBeCalledTimes(3)
  obs.aa = { mm: 333 }
  expect(handler).toBeCalledTimes(4)
  dispose()
  obs.aa = { mm: 444 }
  expect(handler).toBeCalledTimes(4)
})

it('array delete', () => {
  const array = observable([{ value: 1 }, { value: 2 }])

  const fn = vi.fn()

  const dispose = observe(array, (change) => {
    if (change.type === 'set' && change.key === 'value') {
      fn(change.path?.join('.'))
    }
  })

  array[0].value = 3
  expect(fn.mock.calls[0][0]).toBe('0.value')

  array.splice(0, 1)

  array[0].value = 3
  expect(fn.mock.calls[1][0]).toBe('0.value')

  dispose()
})

it('observe dynamic tree', () => {
  const handler = vi.fn()
  const tree = observable<any>({})
  const childTree = observable({})
  tree.children = childTree
  observe(tree, handler)
  tree.children.aa = 123
  expect(handler).toBeCalledTimes(1)
})

it('invalid target', () => {
  expect(() => observe(() => {})).toThrowError()
})
