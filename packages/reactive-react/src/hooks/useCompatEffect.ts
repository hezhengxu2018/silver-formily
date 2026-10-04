import type { DependencyList, EffectCallback } from 'react'
import { isArr } from '@silver-formily/shared'
import { useEffect, useRef } from 'react'
import { immediate } from '../shared'

// 注意：必须保持逐项 Object.is 的浅比较，与 React 对 deps 的判断一致。
// 不能换成 shared 包的 isEqual（深比较）：内容相同但引用不同的 deps 会被判"未变化"，
// 与 React 重跑 effect 的判断脱节，重挂载后 mountedRef 恢复 true，dispose 将永远不会执行。
function isEqualDeps(target: any, source: any) {
  const arrA = isArr(target)
  const arrB = isArr(source)
  if (arrA !== arrB)
    return false
  if (arrA) {
    if (target.length !== source.length)
      return false
    return target.every((val, index) => Object.is(val, source[index]))
  }
  return target === source
}

export function useCompatEffect(effect: EffectCallback, deps?: DependencyList) {
  const depsRef = useRef<DependencyList | undefined>(undefined)
  const mountedRef = useRef(false)
  const renderIdRef = useRef(0)
  const renderId = ++renderIdRef.current
  useEffect(() => {
    mountedRef.current = true
    const dispose = effect()
    return () => {
      mountedRef.current = false
      // 省略 deps 时每次提交都要清理；StrictMode 重放同一次渲染的 effect
      // 不会改变 renderId，仍走延迟清理路径。
      if ((deps === undefined && renderIdRef.current !== renderId)
        || !isEqualDeps(depsRef.current, deps)) {
        if (dispose)
          dispose()
        return
      }
      immediate(() => {
        if (mountedRef.current)
          return
        if (dispose)
          dispose()
      })
    }
  }, deps)
  depsRef.current = deps
}
