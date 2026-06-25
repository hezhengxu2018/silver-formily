import { computed } from 'vue'
import { useWorkspace } from './useWorkspace'

export function useViewport() {
  const workspaceRef = useWorkspace()
  return computed(() => workspaceRef.value?.viewport ?? null)
}
