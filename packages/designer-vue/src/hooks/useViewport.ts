import type { Viewport } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '../shared/reactive'
import { useWorkspace } from './useWorkspace'

export function useViewport(): Ref<Viewport | null> {
  const workspaceRef = useWorkspace()
  return reactiveComputed(() => workspaceRef.value?.viewport ?? null)
}
