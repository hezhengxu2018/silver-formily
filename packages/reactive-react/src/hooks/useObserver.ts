import type { IObserverOptions } from '../types'
import { Tracker } from '@silver-formily/reactive'
import { useCompatFactory } from './useCompatFactory'
import { useForceUpdate } from './useForceUpdate'

export function useObserver<T extends () => unknown>(view: T, options?: IObserverOptions): ReturnType<T> {
  const forceUpdate = useForceUpdate()
  const tracker = useCompatFactory(
    () =>
      new Tracker(() => {
        if (typeof options?.scheduler === 'function') {
          options.scheduler(forceUpdate)
        }
        else {
          forceUpdate()
        }
      }, options?.displayName),
  )
  return tracker.track(view)
}
