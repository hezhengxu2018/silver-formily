import type { DesignerCore } from './models/DesignerCore'
import type { DesignerHistory } from './models/DesignerHistory'
import type { DesignerMaterialRegistry } from './models/DesignerMaterialRegistry'
import type { DesignerNode } from './models/DesignerNode'
import type { DesignerSelection } from './models/DesignerSelection'
import type { DesignerTree } from './models/DesignerTree'

export type DesignerContainerName = string

export interface DesignerContainerDefinition {
  name: DesignerContainerName
  title?: string
  accepts?: string[]
  maxItems?: number
}

export interface DesignerNodeDesignerMetadata {
  container?: boolean
  defaultContainer?: DesignerContainerName
  containers?: DesignerContainerDefinition[]
}

export interface DesignerNodeMetadata extends Record<string, any> {
  designer?: DesignerNodeDesignerMetadata
}

export interface DesignerSchemaNode {
  id?: string
  componentName: string
  title?: string
  props?: Record<string, any>
  children?: DesignerSchemaNode[]
  slots?: Record<string, DesignerSchemaNode[]>
  metadata?: DesignerNodeMetadata
}

export interface DesignerSnapshot {
  schema: DesignerSchemaNode
  selectedId?: string
  hoveredId?: string
}

export interface DesignerInsertOptions {
  parentId?: string
  index?: number
  container?: DesignerContainerName
}

export interface DesignerMoveOptions extends DesignerInsertOptions {}

export interface DesignerMaterialDefinition {
  name: string
  title: string
  group?: string
  defaultNode?: Partial<DesignerSchemaNode> | (() => Partial<DesignerSchemaNode>)
  designer?: DesignerNodeDesignerMetadata
  propsSchema?: Record<string, any>
  previewComponent?: string
  runtimeComponent?: string
  setters?: unknown
  metadata?: DesignerNodeMetadata
}

export interface DesignerCommandContext {
  designer: DesignerCore
  tree: DesignerTree
  selection: DesignerSelection
  materials: DesignerMaterialRegistry
  history: DesignerHistory
}

export interface DesignerCommandDescriptor<Payload = any, Result = any> {
  name: string
  mutate?: boolean
  handler: (payload: Payload, context: DesignerCommandContext) => Result
}

export interface DesignerHistoryEntry {
  label?: string
  snapshot: DesignerSnapshot
}

export interface DesignerHistoryState {
  canUndo: boolean
  canRedo: boolean
  past: number
  future: number
}

export interface DesignerCoreOptions {
  historyLimit?: number
  rootComponentName?: string
  schema?: DesignerSchemaNode
  materials?: DesignerMaterialDefinition[]
}

export interface DesignerSelectionState {
  selectedId?: string
  hoveredId?: string
}

export interface DesignerTreeMutation {
  node: DesignerNode
  parent?: DesignerNode
  index: number
  container: DesignerContainerName
}

export type DesignerEvent = {
  type: 'tree:changed'
  reason: string
  snapshot: DesignerSnapshot
}
| {
  type: 'selection:changed'
  selection: DesignerSelectionState
}
| {
  type: 'materials:changed'
  materialNames: string[]
}
| {
  type: 'history:changed'
  state: DesignerHistoryState
}
| {
  type: 'command:executed'
  name: string
}

export interface DesignerNodePatch extends Partial<DesignerSchemaNode> {}

export interface DesignerNodeLocation {
  parentId?: string
  index: number
  container: DesignerContainerName
}

export interface DesignerMaterialGroup {
  name: string
  materials: DesignerMaterialDefinition[]
}

export type DesignerSubscriber = (event: DesignerEvent) => void

export interface DesignerOperationOptions {
  recordHistory?: boolean
  reason?: string
}

export interface DesignerRestoreOptions {
  reason?: string
  notifySelection?: boolean
}

export interface DesignerDuplicateOptions extends DesignerInsertOptions {}

export interface DesignerSelectionOptions {
  silent?: boolean
}

export interface DesignerTreeOptions {
  rootComponentName?: string
  schema?: DesignerSchemaNode
}

export interface DesignerCreateNodeOptions {
  id?: string
  componentName?: string
  title?: string
  props?: Record<string, any>
  metadata?: DesignerNodeMetadata
  children?: DesignerSchemaNode[]
  slots?: Record<string, DesignerSchemaNode[]>
}

export interface DesignerCommandExecutionOptions {
  recordHistory?: boolean
}

export type DesignerCommandMap = Map<string, DesignerCommandDescriptor>

export interface DesignerCommandResult<T = any> {
  name: string
  result: T
}

export interface DesignerNodeQuery {
  id?: string
  componentName?: string
}

export interface DesignerTreeTraversal {
  enter?: (node: DesignerNode) => void | boolean
  leave?: (node: DesignerNode) => void
}
