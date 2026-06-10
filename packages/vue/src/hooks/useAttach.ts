import type { Ref } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export function useAttach<T extends IRecycleTarget>(target: Ref<T>): Ref<T> {
  let mounted = false

  watch(target, (v, old) => {
    if (!mounted || v === old)
      return
    old?.onUnmount()
    v?.onMount()
  }, { flush: 'sync' })

  onMounted(() => {
    mounted = true
    target.value?.onMount()
  })

  onUnmounted(() => {
    mounted = false
    target.value?.onUnmount()
  })

  return target
}
