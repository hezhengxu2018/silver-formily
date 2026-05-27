import { expect, it } from 'vitest'

import { autorun, hasCollected, observable } from '../'

it('hasCollected', () => {
  const obs = observable({ value: '' })
  autorun(() => {
    expect(
      hasCollected(() => {
        return obs.value
      }),
    ).toBe(true)
    expect(hasCollected(() => {})).toBe(false)
    expect(hasCollected()).toBe(false)
  })
})
