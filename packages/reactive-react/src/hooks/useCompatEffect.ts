import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'
import { immediate } from '../shared'

interface RetainedEffect {
  renderToken: object
  dispose: ReturnType<EffectCallback>
  cancelCleanup?: () => void
}

/** Retains one setup across synchronous StrictMode replay; final cleanup is deferred. */
export function useCompatEffect(effect: EffectCallback, deps?: DependencyList) {
  const retained = useRef<RetainedEffect | undefined>(undefined)
  // Effect replay reuses this closure; a new committed render gets a new token.
  // Unlike render-written deps refs, abandoned renders cannot affect cleanup.
  const renderToken = {}

  useEffect(() => {
    const previous = retained.current
    previous?.cancelCleanup?.()
    if (previous && previous.renderToken !== renderToken) {
      retained.current = undefined
      if (typeof previous.dispose === 'function')
        previous.dispose()
    }
    if (!retained.current) {
      retained.current = { renderToken, dispose: effect() }
    }
    const current = retained.current
    return () => {
      current.cancelCleanup = immediate(() => {
        if (retained.current === current) {
          retained.current = undefined
          if (typeof current.dispose === 'function')
            current.dispose()
        }
      })
    }
  }, deps)
}
