import type { DesignerContainerDefinition, DesignerContainerName, DesignerNodeDesignerMetadata, DesignerNodeQuery, DesignerSchemaNode, DesignerTreeTraversal } from '../types'

import { clone } from '@silver-formily/shared'
import { ensureNodeSchema, normalizeContainer } from '../shared'

export class DesignerNode {
  id: string
  componentName: string
  title?: string
  props: Record<string, any>
  metadata: Record<string, any>
  children: DesignerNode[]
  slots: Record<string, DesignerNode[]>
  parent?: DesignerNode
  container: DesignerContainerName

  constructor(schema: DesignerSchemaNode, parent?: DesignerNode, container?: DesignerContainerName) {
    const normalized = ensureNodeSchema(schema)

    this.id = normalized.id
    this.componentName = normalized.componentName
    this.title = normalized.title
    this.props = normalized.props || {}
    this.metadata = normalized.metadata || {}
    this.children = []
    this.slots = {}
    this.parent = parent
    this.container = normalizeContainer(container)

    this.children = (normalized.children || []).map(child => new DesignerNode(child, this, 'children'))
    this.slots = Object.keys(normalized.slots || {}).reduce<Record<string, DesignerNode[]>>((buffer, key) => {
      buffer[key] = (normalized.slots?.[key] || []).map(child => new DesignerNode(child, this, key))
      return buffer
    }, {})
  }

  get isRoot() {
    return !this.parent
  }

  get designer(): DesignerNodeDesignerMetadata {
    return this.metadata?.designer || {}
  }

  get isContainer() {
    if (this.isRoot)
      return true

    if (this.designer.container === true)
      return true

    if (this.children.length > 0)
      return true

    if (Object.keys(this.slots).length > 0)
      return true

    return this.availableContainers.length > 0
  }

  get depth() {
    let depth = 0
    let current = this.parent
    while (current) {
      depth++
      current = current.parent
    }
    return depth
  }

  get containers() {
    return {
      children: this.children,
      ...this.slots,
    }
  }

  get availableContainers(): DesignerContainerDefinition[] {
    const configured = this.designer.containers || []
    if (configured.length)
      return configured

    const names = new Set<DesignerContainerName>()
    if (this.isRoot || this.children.length > 0)
      names.add('children')
    for (const key of Object.keys(this.slots))
      names.add(key)

    return Array.from(names).map(name => ({ name }))
  }

  get defaultContainer() {
    if (this.designer.defaultContainer)
      return normalizeContainer(this.designer.defaultContainer)

    const firstConfigured = this.availableContainers[0]?.name
    if (firstConfigured)
      return normalizeContainer(firstConfigured)

    return 'children'
  }

  getContainer(container?: DesignerContainerName) {
    const key = normalizeContainer(container || this.defaultContainer)
    if (key === 'children')
      return this.children

    if (!this.slots[key])
      this.slots[key] = []

    return this.slots[key]
  }

  matches(query: DesignerNodeQuery) {
    if (query.id && this.id !== query.id)
      return false
    if (query.componentName && this.componentName !== query.componentName)
      return false
    return true
  }

  canAcceptChild(componentName?: string, container?: DesignerContainerName) {
    const targetContainer = normalizeContainer(container || this.defaultContainer)
    const config = this.availableContainers.find(item => item.name === targetContainer)

    if (!config)
      return false

    const nodes = this.getContainer(targetContainer)
    if (typeof config.maxItems === 'number' && nodes.length >= config.maxItems)
      return false

    if (componentName && config.accepts?.length && !config.accepts.includes(componentName))
      return false

    return true
  }

  contains(nodeId: string) {
    if (this.id === nodeId)
      return true
    for (const child of this.children) {
      if (child.contains(nodeId))
        return true
    }
    for (const key of Object.keys(this.slots)) {
      for (const child of this.slots[key]) {
        if (child.contains(nodeId))
          return true
      }
    }
    return false
  }

  traverse(traversal: DesignerTreeTraversal) {
    if (traversal.enter?.(this) === false)
      return

    for (const child of this.children)
      child.traverse(traversal)

    for (const key of Object.keys(this.slots)) {
      for (const child of this.slots[key])
        child.traverse(traversal)
    }

    traversal.leave?.(this)
  }

  toSchema(): DesignerSchemaNode {
    const slots = Object.keys(this.slots).reduce<Record<string, DesignerSchemaNode[]>>((buffer, key) => {
      if (this.slots[key].length)
        buffer[key] = this.slots[key].map(child => child.toSchema())
      return buffer
    }, {})

    return {
      id: this.id,
      componentName: this.componentName,
      title: this.title,
      props: clone(this.props || {}),
      children: this.children.map(child => child.toSchema()),
      slots,
      metadata: clone(this.metadata || {}),
    }
  }
}
