import type {
  DesignerContainerName,
  DesignerDuplicateOptions,
  DesignerInsertOptions,
  DesignerMoveOptions,
  DesignerNodeLocation,
  DesignerNodePatch,
  DesignerSchemaNode,
  DesignerTreeMutation,
  DesignerTreeOptions,
  DesignerTreeTraversal,
} from '../types'

import { clone } from '@silver-formily/shared'
import { clampIndex, ensureNodeSchema, normalizeContainer, stripNodeIds } from '../shared'
import { DesignerNode } from './DesignerNode'

function createDefaultRoot(rootComponentName = 'Root'): DesignerSchemaNode {
  return {
    componentName: rootComponentName,
    title: rootComponentName,
    props: {},
    children: [],
    slots: {},
    metadata: {},
  }
}

export class DesignerTree {
  root: DesignerNode
  protected nodeMap = new Map<string, DesignerNode>()

  constructor(options: DesignerTreeOptions = {}) {
    this.importSchema(options.schema || createDefaultRoot(options.rootComponentName))
  }

  importSchema(schema: DesignerSchemaNode) {
    this.root = new DesignerNode(schema)
    this.rebuildIndex()
    return this.root
  }

  exportSchema() {
    return this.root.toSchema()
  }

  rebuildIndex() {
    this.nodeMap.clear()
    this.root.traverse({
      enter: (node) => {
        this.nodeMap.set(node.id, node)
      },
    })
  }

  traverse(traversal: DesignerTreeTraversal) {
    this.root.traverse(traversal)
  }

  getNode(id?: string) {
    if (!id)
      return undefined
    return this.nodeMap.get(id)
  }

  findNode(predicate: (node: DesignerNode) => boolean) {
    let target: DesignerNode | undefined
    this.traverse({
      enter: (node) => {
        if (predicate(node)) {
          target = node
          return false
        }
      },
    })
    return target
  }

  query(query: { id?: string, componentName?: string }) {
    return this.findNode(node => node.matches(query))
  }

  getLocation(nodeId: string): DesignerNodeLocation {
    const node = this.expectNode(nodeId)
    if (!node.parent) {
      return {
        index: 0,
        container: 'children',
      }
    }

    const container = node.parent.getContainer(node.container)
    return {
      parentId: node.parent.id,
      index: container.findIndex(item => item.id === node.id),
      container: node.container,
    }
  }

  insertNode(schema: DesignerSchemaNode, options: DesignerInsertOptions = {}): DesignerTreeMutation {
    const parent = options.parentId ? this.expectNode(options.parentId) : this.root
    const container = normalizeContainer(options.container)
    const nodes = parent.getContainer(container)
    const index = clampIndex(options.index, nodes.length)
    const node = new DesignerNode(ensureNodeSchema(schema), parent, container)

    nodes.splice(index, 0, node)
    this.indexNode(node)

    return {
      node,
      parent,
      index,
      container,
    }
  }

  appendNode(schema: DesignerSchemaNode, parentId?: string, container?: DesignerContainerName) {
    return this.insertNode(schema, {
      parentId,
      container,
    })
  }

  removeNode(nodeId: string) {
    const node = this.expectNode(nodeId)
    if (node.isRoot)
      throw new Error('Cannot remove the root node')

    const parent = node.parent!
    const container = parent.getContainer(node.container)
    const index = container.findIndex(item => item.id === node.id)
    container.splice(index, 1)
    this.deleteIndex(node)
    return {
      node,
      parent,
      index,
      container: node.container,
    }
  }

  moveNode(nodeId: string, options: DesignerMoveOptions): DesignerTreeMutation {
    const node = this.expectNode(nodeId)
    if (node.isRoot)
      throw new Error('Cannot move the root node')

    const targetParent = options.parentId ? this.expectNode(options.parentId) : this.root
    if (node.id === targetParent.id || node.contains(targetParent.id))
      throw new Error('Cannot move a node into itself or its descendants')

    const sourceParent = node.parent!
    const sourceContainer = sourceParent.getContainer(node.container)
    const sourceIndex = sourceContainer.findIndex(item => item.id === node.id)
    sourceContainer.splice(sourceIndex, 1)

    const targetContainerName = normalizeContainer(options.container)
    const targetContainer = targetParent.getContainer(targetContainerName)
    let targetIndex = clampIndex(options.index, targetContainer.length)

    if (sourceParent.id === targetParent.id && node.container === targetContainerName && sourceIndex < targetIndex)
      targetIndex--

    node.parent = targetParent
    node.container = targetContainerName
    targetContainer.splice(targetIndex, 0, node)

    return {
      node,
      parent: targetParent,
      index: targetIndex,
      container: targetContainerName,
    }
  }

  duplicateNode(nodeId: string, options: DesignerDuplicateOptions = {}) {
    const source = this.expectNode(nodeId)
    const sourceLocation = this.getLocation(nodeId)
    const schema = stripNodeIds(source.toSchema())
    return this.insertNode(schema, {
      parentId: options.parentId || sourceLocation.parentId,
      container: options.container || sourceLocation.container,
      index: typeof options.index === 'number' ? options.index : sourceLocation.index + 1,
    })
  }

  replaceNode(nodeId: string, schema: DesignerSchemaNode) {
    const current = this.expectNode(nodeId)
    if (current.isRoot) {
      const nextSchema = ensureNodeSchema({
        ...clone(schema),
        id: current.id,
      })
      this.importSchema(nextSchema)
      return this.root
    }

    const location = this.getLocation(nodeId)
    this.removeNode(nodeId)
    return this.insertNode({
      ...clone(schema),
      id: schema.id || nodeId,
    }, location).node
  }

  updateNode(nodeId: string, patch: DesignerNodePatch) {
    const current = this.expectNode(nodeId)
    const nextSchema = current.toSchema()

    if ('componentName' in patch && patch.componentName)
      nextSchema.componentName = patch.componentName
    if ('title' in patch)
      nextSchema.title = patch.title
    if ('props' in patch)
      nextSchema.props = clone(patch.props || {})
    if ('metadata' in patch)
      nextSchema.metadata = clone(patch.metadata || {})
    if ('children' in patch)
      nextSchema.children = clone(patch.children || [])
    if ('slots' in patch)
      nextSchema.slots = clone(patch.slots || {})

    return this.replaceNode(nodeId, nextSchema)
  }

  protected expectNode(nodeId: string) {
    const node = this.getNode(nodeId)
    if (!node)
      throw new Error(`Node "${nodeId}" was not found`)
    return node
  }

  protected indexNode(node: DesignerNode) {
    node.traverse({
      enter: (current) => {
        this.nodeMap.set(current.id, current)
      },
    })
  }

  protected deleteIndex(node: DesignerNode) {
    node.traverse({
      enter: (current) => {
        this.nodeMap.delete(current.id)
      },
    })
  }
}
