import { computed } from 'vue'
import { useWorkspace } from './useWorkspace'

export function useOperation() {
  const workspaceRef = useWorkspace()
  return computed(() => workspaceRef.value?.operation ?? null)
}
