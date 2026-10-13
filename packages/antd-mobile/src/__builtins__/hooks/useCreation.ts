import { useRef } from 'react'

function depsEqual(a: any[], b: any[]) {
  if (a.length !== b.length)
    return false
  return a.every((dep, i) => !Object.is(dep, b[i]))
}

/**
 * Keeps the factory result referentially stable until any dep changes.
 * Local replacement for `useCreation` from ahooks.
 */
export function useCreation<T>(factory: () => T, deps: any[]): T {
  const current = useRef<{ deps: any[], value: T }>(null)
  if (!current.current || !depsEqual(current.current.deps, deps)) {
    current.current = { deps, value: factory() }
  }
  return current.current.value
}
