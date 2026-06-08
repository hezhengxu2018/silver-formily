import type { Dispose, Reaction } from '@silver-formily/reactive'
import { autorun } from '@silver-formily/reactive'
import { getCurrentScope, onScopeDispose } from 'vue'

export function autorunEffect(tracker: Reaction, name?: string): Dispose {
  if (!getCurrentScope()) {
    throw new Error('autorunEffect must be called within setup() or an active effect scope.')
  }

  const dispose = autorun(tracker, name)
  let disposed = false
  const stop = () => {
    if (disposed)
      return
    disposed = true
    dispose()
  }

  onScopeDispose(stop)

  return stop
}
