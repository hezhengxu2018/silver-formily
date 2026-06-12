import type { DesignerContextValue } from '../types'

import { computed, inject } from 'vue'
import { DesignerContextSymbol } from '../types'

export function useDesigner(): DesignerContextValue {
  const context = inject(DesignerContextSymbol, null)
  if (!context)
    throw new Error('Designer context was not provided')
  return context
}

export function useDesignerCommands() {
  const context = useDesigner()

  const designer = computed(() => context.designer.value)

  return {
    designer,
    selectNode: (nodeId?: string) => designer.value.selectNode(nodeId),
    hoverNode: (nodeId?: string) => designer.value.hoverNode(nodeId),
    clearSelection: () => designer.value.clearSelection(),
    undo: () => designer.value.undo(),
    redo: () => designer.value.redo(),
    duplicateNode: (nodeId: string) => designer.value.duplicateNode(nodeId),
    removeNode: (nodeId: string) => designer.value.removeNode(nodeId),
  }
}
