import type { Workspace } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { inject, ref } from 'vue'
import { WorkspaceSymbol } from '../context'
import { useDesigner } from './useDesigner'

export function useWorkspace(id?: string): Ref<Workspace | null> {
  const designerRef = useDesigner()
  const workspaceContextRef = inject(WorkspaceSymbol, ref(null))

  return reactiveComputed(() => {
    const designer = designerRef.value
    if (!designer)
      return null

    const workspaceId = id || workspaceContextRef.value?.id
    if (workspaceId)
      return designer.workbench.findWorkspaceById(workspaceId) ?? null

    return designer.workbench.currentWorkspace ?? null
  })
}
