import type { Dispose, IReactionOptions } from '@formily/reactive'
import { reaction } from '@formily/reactive'
import { getCurrentScope, onScopeDispose } from 'vue'

export function reactionWatch<T>(
  tracker: () => T,
  subscriber?: (value: T, oldValue: T) => void,
  options?: IReactionOptions<T>,
): Dispose {
  if (!getCurrentScope()) {
    throw new Error('reactionWatch must be called within setup() or an active effect scope.')
  }

  const dispose = reaction(tracker, subscriber, options)
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
