import type { Engine, Operation, TreeNode, Viewport, Workspace } from '@silver-formily/designer-core'
import type { InjectionKey, Ref } from 'vue'

export const DesignerEngineSymbol: InjectionKey<Ref<Engine | null>> = Symbol('DesignerEngine')

export interface WorkspaceContext {
  description?: string
  id?: string
  title?: string
}

export const WorkspaceSymbol: InjectionKey<Ref<WorkspaceContext | null>> = Symbol('Workspace')
export const TreeNodeSymbol: InjectionKey<Ref<TreeNode | null>> = Symbol('TreeNode')
export const DesignerComponentsSymbol: InjectionKey<Ref<Record<string, any>>> = Symbol('DesignerComponents')

export interface DesignerContext {
  engine: Engine
  operation: Operation
  tree: TreeNode
  viewport: Viewport
  workspace: Workspace
}
