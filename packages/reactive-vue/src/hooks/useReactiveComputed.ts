import type { IReactionOptions } from '@silver-formily/reactive'
import type { ComputedRef } from 'vue'
import { reaction } from '@silver-formily/reactive'
import { computed, shallowRef, watchEffect } from 'vue'

/**
 * Bridges a Formily observable expression into a Vue computed ref.
 * The getter runs inside a Formily reaction so Vue stays reactive to Formily sources.
 */
export function reactiveComputed<T>(getter: () => T, options?: IReactionOptions<T>): ComputedRef<T> {
  const state = shallowRef<T>()

  watchEffect((onCleanup) => {
    const stop = reaction(
      () => getter(),
      (value) => {
        state.value = value
      },
      { fireImmediately: true, ...options },
    )

    onCleanup(() => {
      stop?.()
    })
  })

  return computed(() => state.value as T)
}

/**
 * @deprecated Use `reactiveComputed` instead.
 */
export const formilyComputed: typeof reactiveComputed = reactiveComputed
