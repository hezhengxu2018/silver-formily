import type { Reaction } from '@silver-formily/reactive'
import type { DependencyList } from 'react'
import { autorun } from '@silver-formily/reactive'
import { useEffect } from 'react'
import { useCommittedRef } from './useCommittedRef'

export interface IAutorunEffectOptions {
  /** Passed to the underlying autorun each time tracking is established. */
  name?: string
  /** Rebuild tracking when non-observable inputs (props/state) change. */
  deps?: DependencyList
}

/** Uses the latest committed callback; deps rebuild tracking when props/state change. */
export function useAutorunEffect(tracker: Reaction, options?: IAutorunEffectOptions): void {
  const { name, deps } = options ?? {}
  const latest = useCommittedRef(tracker)
  useEffect(() => autorun(() => latest.current(), name), deps ?? [])
}
