import type { IOperation, ObservablePath, PropertyKey } from './types'
import { ObModelNodeSymbol, ObModelSymbol, RawNode } from './environment'
import { raw as getRaw } from './externals'

export class DataChange {
  node: DataNode
  key: PropertyKey | undefined
  object: object | undefined
  type: string | undefined
  value: unknown
  oldValue: unknown
  constructor(operation: IOperation, node: DataNode) {
    this.node = node
    this.key = operation.key
    this.type = operation.type
    this.object = operation.target
    this.value = operation.value
    this.oldValue = operation.oldValue
  }

  get path() {
    // 顶层节点的 key 可能未定义，运行时历史上会 concat(undefined)，保持原行为
    return this.node.path.concat(this.key as ObservablePath[number])
  }
}
export class DataNode {
  target: object | undefined

  key: PropertyKey | undefined

  value: unknown

  constructor(target: object | undefined, key: PropertyKey | undefined, value: unknown) {
    this.target = target
    this.key = key
    this.value = value
  }

  get path() {
    if (!this.parent)
      return this.key ? [this.key] : []
    return this.parent.path.concat(this.key as ObservablePath[number])
  }

  get targetRaw() {
    return getRaw(this.target)
  }

  get parent() {
    if (!this.target)
      return
    return getDataNode(this.targetRaw)
  }

  isEqual(node: DataNode) {
    if (this.key) {
      return node.targetRaw === this.targetRaw && node.key === this.key
    }
    return node.value === this.value
  }

  contains(node: DataNode) {
    if (node === this)
      return true
    let parent = node.parent
    while (parent) {
      if (this.isEqual(parent))
        return true
      parent = parent.parent
    }
    return false
  }
}

export function getDataNode(raw: object) {
  if ((raw as Record<PropertyKey, unknown>)?.[ObModelNodeSymbol]) {
    return (raw as Record<PropertyKey, unknown>)[ObModelNodeSymbol] as DataNode
  }
  return RawNode.get(raw)
}

export function setDataNode(raw: object, node: DataNode) {
  if ((raw as Record<PropertyKey, unknown>)?.[ObModelSymbol]) {
    ;(raw as Record<PropertyKey, unknown>)[ObModelNodeSymbol] = node
    return
  }
  RawNode.set(raw, node)
}

export function buildDataTree(target: object | undefined, key: PropertyKey | undefined, value: unknown) {
  const raw = getRaw(value)
  const currentNode = getDataNode(raw as object)
  if (currentNode)
    return currentNode
  setDataNode(getRaw(value) as object, new DataNode(target, key, value))
}
