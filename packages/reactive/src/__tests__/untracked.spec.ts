import { expect, it, vi } from 'vitest'
import { autorun, observable, untracked } from '../'

it('basic untracked', () => {
  const obs = observable<any>({})
  const fn = vi.fn()
  autorun(() => {
    untracked(() => {
      fn(obs.value)
    })
  })

  expect(fn).toBeCalledTimes(1)
  obs.value = 123
  expect(fn).toBeCalledTimes(1)
})

it('no params untracked', () => {
  untracked()
})
