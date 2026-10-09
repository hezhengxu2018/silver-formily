import type { Dispose } from '@silver-formily/reactive'

/**
 * 把 reaction/autorun 的建立推迟到 effect 提交后执行：
 * 渲染期只创建容器，不在渲染阶段执行 tracker（避免副作用与污染外层依赖收集）。
 * run 每次先销毁旧实例再重建，StrictMode 重放与 deps 变化后不会残留实例；
 * dispose 幂等，交给 useCompatFactory 在组件真实卸载时触发。
 */
export function createDeferred<Args extends unknown[]>(factory: (...args: Args) => Dispose) {
  let dispose: Dispose | undefined
  return {
    run(...args: Args) {
      dispose?.()
      dispose = factory(...args)
    },
    dispose() {
      dispose?.()
      dispose = undefined
    },
  }
}
