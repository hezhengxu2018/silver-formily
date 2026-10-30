import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

/** Own the DOM host and React root for an imperative popup session. */
export function createPopupRoot(className: string) {
  const host = document.createElement('div')
  host.className = className
  document.body.append(host)
  const root = createRoot(host)
  let disposed = false

  return {
    get disposed() {
      return disposed
    },
    render(content: ReactNode) {
      if (!disposed)
        flushSync(() => root.render(content))
    },
    dispose() {
      if (disposed)
        return
      disposed = true
      // afterClose can run inside React's commit phase.
      queueMicrotask(() => {
        root.unmount()
        host.remove()
      })
    },
    scheduleClose(close: () => void) {
      // Let the opening spring advance before reversing it. A same-tick
      // reversal can otherwise leave the spring at rest without afterClose.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!disposed)
          close()
      }))
    },
  }
}
