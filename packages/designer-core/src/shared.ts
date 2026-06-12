import type { DesignerContainerName, DesignerCreateNodeOptions, DesignerSchemaNode, DesignerSelectionState } from './types'

import { clone, isArr, isPlainObj, uid } from '@silver-formily/shared'

export function createNodeId() {
  return `dn_${uid(8)}`
}

export function ensureRecord<T extends Record<string, any>>(value?: T): T {
  return (isPlainObj(value) ? clone(value) : {}) as T
}

export function ensureNodeSchema(input: DesignerSchemaNode | DesignerCreateNodeOptions): DesignerSchemaNode {
  const children = isArr(input.children) ? input.children.map(ensureNodeSchema) : []
  const rawSlots = isPlainObj(input.slots) ? input.slots : {}
  const slots = Object.keys(rawSlots).reduce<Record<string, DesignerSchemaNode[]>>((buffer, key) => {
    buffer[key] = isArr(rawSlots[key]) ? rawSlots[key].map(ensureNodeSchema) : []
    return buffer
  }, {})

  return {
    id: input.id || createNodeId(),
    componentName: input.componentName,
    title: input.title,
    props: ensureRecord(input.props),
    children,
    slots,
    metadata: ensureRecord(input.metadata),
  }
}

export function stripNodeIds(schema: DesignerSchemaNode): DesignerSchemaNode {
  const next = ensureNodeSchema(schema)
  delete next.id
  next.children = next.children?.map(stripNodeIds)
  next.slots = Object.keys(next.slots || {}).reduce<Record<string, DesignerSchemaNode[]>>((buffer, key) => {
    buffer[key] = (next.slots?.[key] || []).map(stripNodeIds)
    return buffer
  }, {})
  return next
}

export function clampIndex(index: number | undefined, length: number) {
  if (typeof index !== 'number' || Number.isNaN(index))
    return length
  if (index < 0)
    return 0
  if (index > length)
    return length
  return index
}

export function normalizeContainer(container?: DesignerContainerName) {
  return container || 'children'
}

export function isSameSelection(left: DesignerSelectionState, right: DesignerSelectionState) {
  return left.selectedId === right.selectedId && left.hoveredId === right.hoveredId
}

export function snapshotEquals(left: DesignerSchemaNode, right: DesignerSchemaNode) {
  return JSON.stringify(left) === JSON.stringify(right)
}
