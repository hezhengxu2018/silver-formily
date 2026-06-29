import type { Operation } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '../shared/reactive'
import { useWorkspace } from './useWorkspace'

export function useOperation(): Ref<Operation | null> {
  const workspaceRef = useWorkspace()
  return reactiveComputed(() => workspaceRef.value?.operation ?? null)
}
