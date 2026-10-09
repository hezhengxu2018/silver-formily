import type { IReactionOptions } from '@silver-formily/reactive'
import { reaction } from '@silver-formily/reactive'
import { useEffect } from 'react'
import { createDeferred } from '../shared'
import { useCompatFactory } from './useCompatFactory'

/**
 * 在组件提交后建立 `reaction`，组件卸载时自动 dispose。
 * 与 autorunEffect 的区别：只在 tracker 返回值变化时通知 subscriber，适合"监听"而非"自动运行"。
 */
export function reactionWatch<T>(
  tracker: () => T,
  subscriber?: (value: T, oldValue: T) => void,
  options?: IReactionOptions<T>,
): void {
  const deferred = useCompatFactory(() =>
    createDeferred(() => reaction(tracker, subscriber, options)),
  )
  useEffect(() => {
    deferred.run()
  }, [])
}
