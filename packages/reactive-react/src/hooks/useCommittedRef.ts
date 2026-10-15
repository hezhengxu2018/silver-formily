import { useRef } from 'react'
import { useLayoutEffect } from './useLayoutEffect'

/** Publish callbacks only after commit, so abandoned renders never change subscriptions. */
export function useCommittedRef<T>(value: T) {
  const ref = useRef(value)
  useLayoutEffect(() => {
    ref.current = value
  })
  return ref
}
