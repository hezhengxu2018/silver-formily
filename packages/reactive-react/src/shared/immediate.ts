// 可取消的微任务调度：queueMicrotask 无法撤销，所以用 disposed 标志包一层取消语义，
// 触发时若已取消则复位标记并跳过（上游用 Promise.resolve().then 做载体，此处改为原生 API）
export function immediate(callback?: () => void) {
  let disposed = false
  queueMicrotask(() => {
    if (disposed) {
      disposed = false
      return
    }
    callback?.()
  })
  return () => {
    disposed = true
  }
}
