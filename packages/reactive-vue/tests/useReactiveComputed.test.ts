import { observable } from '@silver-formily/reactive'
import { describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { reactiveComputed } from '../src/hooks/useReactiveComputed'

describe('reactiveComputed', () => {
  it('updates for both Vue and Formily reactive dependencies', async () => {
    const vueValue = ref(1)
    const formilyState = observable({ multiplier: 2 })
    const scope = effectScope()
    const value = scope.run(() => reactiveComputed(() => vueValue.value * formilyState.multiplier))!

    expect(value.value).toBe(2)

    vueValue.value = 3
    await nextTick()
    expect(value.value).toBe(6)

    formilyState.multiplier = 4
    expect(value.value).toBe(12)

    scope.stop()
  })
})
