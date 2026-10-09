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
  // track 在正常路径下总返回 view 的执行结果，undefined 仅出现在异常用法
  return tracker.track(view) as ReturnType<T>
}
