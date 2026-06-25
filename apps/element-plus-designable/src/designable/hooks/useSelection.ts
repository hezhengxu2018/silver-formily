import { computed } from 'vue'
import { useOperation } from './useOperation'

export function useSelection() {
  const operationRef = useOperation()
  return computed(() => operationRef.value?.selection ?? null)
}
