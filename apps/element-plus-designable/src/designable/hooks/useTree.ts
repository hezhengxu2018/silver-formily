import { computed } from 'vue'
import { useOperation } from './useOperation'

export function useTree() {
  const operationRef = useOperation()
  return computed(() => operationRef.value?.tree ?? null)
}
