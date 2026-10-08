import { useCompatEffect } from '@silver-formily/reactive-react'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export function useAttach<T extends IRecycleTarget>(target: T): T {
  useCompatEffect(() => {
    target.onMount()
    return () => target.onUnmount()
  }, [target])
  return target
}
