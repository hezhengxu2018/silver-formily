import type { DesignerDragSession, DesignerMaterialDragSession } from '../types'

export interface DesignerDropTarget {
  containerName: string
  index?: number
}

export function isDesignerMaterialDragSession(value: unknown): value is DesignerMaterialDragSession {
  const session = value as Partial<DesignerDragSession> | undefined

  return session?.type === 'material'
    && typeof session.materialName === 'string'
    && typeof session.componentName === 'string'
}
