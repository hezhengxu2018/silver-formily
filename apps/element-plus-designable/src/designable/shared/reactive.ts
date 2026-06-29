import type { ComputedGetter, ComputedRef, WatchSource } from 'vue'
import { autorun, reaction } from '@silver-formily/reactive'
import {
  onBeforeUnmount,
  shallowRef,
  computed as vueComputed,
  watch as vueWatch,
  watchEffect as vueWatchEffect,
} from 'vue'

export function reactiveComputed<T>(getter: ComputedGetter<T>): ComputedRef<T> {
  const state = shallowRef<T>()
  let dispose: (() => void) | undefined

  onBeforeUnmount(() => {
    dispose?.()
  })

  return vueComputed(() => {
    dispose?.()
    dispose = autorun(() => {
      state.value = getter()
    })
    return state.value as T
  })
}

export function reactiveWatch<T>(
  source: WatchSource<T> | Array<WatchSource<unknown>>,
  callback: (...args: any[]) => void,
  options?: Parameters<typeof vueWatch>[2],
) {
  if (Array.isArray(source)) {
    const disposes = source.map((item, index) => {
      if (typeof item !== 'function')
        return undefined

      const nextValues: unknown[] = []
      const prevValues: unknown[] = []

      return reaction(item as () => unknown, (next, prev) => {
        nextValues[index] = next
        prevValues[index] = prev
        callback(nextValues, prevValues)
      })
    }).filter(Boolean)

    onBeforeUnmount(() => {
      disposes.forEach(dispose => dispose?.())
    })
  }
  else if (typeof source === 'function') {
    const dispose = reaction(source as () => unknown, (next, prev) => {
      callback(next, prev)
    })
    onBeforeUnmount(() => {
      dispose?.()
    })
  }

  return vueWatch(source as any, callback as any, options)
}

export const reactiveWatchEffect: typeof vueWatchEffect = (effect, options) => {
  let dispose: (() => void) | undefined

  return vueWatchEffect((onInvalidate) => {
    dispose = autorun(() => effect(onInvalidate))
    onInvalidate(() => {
      dispose?.()
    })
  }, options)
}
