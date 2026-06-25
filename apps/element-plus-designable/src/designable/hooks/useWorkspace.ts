import type { Workspace } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { WorkspaceSymbol } from '../context'

export function useWorkspace(): Ref<Workspace | null> {
  return inject(WorkspaceSymbol, ref(null))
}
