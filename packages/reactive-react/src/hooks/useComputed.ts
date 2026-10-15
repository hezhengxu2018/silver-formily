import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'
import { reaction } from '@silver-formily/reactive'
import { useEffect, useState } from 'react'

export interface IComputedOptions<T> extends Omit<IReactionOptions<T>, 'fireImmediately'> {
  /** Rebuild tracking when non-observable inputs (props/state) change. */
  deps?: DependencyList
}

/** Returns a reactive expression's value. Declare props/state inputs in options.deps. */
export function useComputed<T>(getter: () => T, options?: IComputedOptions<T>): T {
  const { deps, ...reactionOptions } = options ?? {}
  const [value, setValue] = useState(() => getter())

  useEffect(() => reaction(getter, (next) => {
    // T may itself be a function; never pass it as React's state updater.
    setValue(() => next)
  }, { ...reactionOptions, fireImmediately: true }), deps ?? [])

  return value
}
