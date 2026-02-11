import type { IReactionOptions } from '@formily/reactive'
import { reaction } from '@formily/reactive'
import { computed, onBeforeUnmount, shallowRef } from 'vue'

/**
 * Bridges a Formily observable expression into a Vue computed ref.
 * The getter runs inside a Formily reaction so Vue stays reactive to Formily sources.
 */
export function formilyComputed<T>(getter: () => T, options?: IReactionOptions<T>) {
  const state = shallowRef<T>()
  const stop = reaction(
    () => getter(),
    (value) => {
      state.value = value
    },
    { fireImmediately: true, ...options },
  )

  onBeforeUnmount(() => {
    stop?.()
  })

  return computed(() => state.value as T)
}
