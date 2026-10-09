import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'
import { reaction } from '@silver-formily/reactive'
import { useEffect, useState } from 'react'
import { createDeferred } from '../shared'
import { useCompatFactory } from './useCompatFactory'

export interface IComputedOptions<T> extends IReactionOptions<T> {
  /**
   * getter 依赖组件内的 props/state 等非响应式数据时传入：
   * 变化时用新 getter 重建追踪，对齐 Vue 版靠 watchEffect 重建 reaction 的行为。
   */
  deps?: DependencyList
}

/**
 * 把 Formily 响应式表达式桥接为组件状态：返回表达式的最新值，数据变化时触发重渲染。
 * getter 应只读取 Formily observable；读取 props/state 必须通过 options.deps 声明，
 * 否则闭包停留在首次渲染，看不到后续更新。
 */
export function useComputed<T>(
  getter: () => T,
  options?: IComputedOptions<T>,
): T {
  const { deps, ...reactionOptions } = options ?? {}
  // 初值在首渲染同步计算，避免首帧拿到 undefined；
  // reaction 建立后 fireImmediately 推送的相同初值被 Object.is 去重，不触发重渲染
  const [value, setValue] = useState(() => getter())
  const computed = useCompatFactory(() =>
    createDeferred((nextGetter: () => T) =>
      reaction(nextGetter, (next) => {
        setValue(next)
      }, { fireImmediately: true, ...reactionOptions }),
    ),
  )
  useEffect(() => {
    computed.run(getter)
  }, deps ?? [])
  return value
}
