import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'
import { reaction } from '@silver-formily/reactive'
import { useEffect } from 'react'
import { useCommittedRef } from './useCommittedRef'

export interface IReactionWatchOptions<T> extends IReactionOptions<T> {
  /** Rebuild tracking when non-observable inputs (props/state) change. */
  deps?: DependencyList
}

/** Tracks observable changes using the latest committed tracker and subscriber. */
export function useReactionWatch<T>(
  tracker: () => T,
  subscriber?: (value: T, oldValue: T) => void,
  options?: IReactionWatchOptions<T>,
): void {
  const latest = useCommittedRef({ tracker, subscriber })
  const { deps, ...reactionOptions } = options ?? {}
  useEffect(() => reaction(
    () => latest.current.tracker(),
    (value, oldValue) => latest.current.subscriber?.(value, oldValue),
    reactionOptions,
  ), deps ?? [])
}
