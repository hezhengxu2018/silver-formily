import type { Reaction } from '@silver-formily/reactive'
import { autorun } from '@silver-formily/reactive'
import { useEffect } from 'react'
import { createDeferred } from '../shared'
import { useCompatFactory } from './useCompatFactory'

/**
 * 在组件提交后运行 `autorun`，组件卸载时自动 dispose。
 * 实例由 useCompatFactory 保证唯一并兜底回收，不返回 Dispose：
 * 生命周期完全交给 React，避免外部提前销毁与卸载清理的二次触发。
 */
export function autorunEffect(tracker: Reaction, name?: string): void {
  const deferred = useCompatFactory(() =>
    createDeferred(() => autorun(tracker, name)),
  )
  useEffect(() => {
    deferred.run()
  }, [])
}
