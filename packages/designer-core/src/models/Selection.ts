import type { Operation } from './Operation'
import type { TreeNode } from './TreeNode'
import { isArr, isStr } from '@silver-formily/designer-shared'
import { action, define, observable } from '@silver-formily/reactive'
import { SelectNodeEvent, UnSelectNodeEvent } from '../events'

export interface ISelection {
  selected?: string[]
  operation?: Operation
}

type SelectableNode = string | TreeNode | null | undefined

export class Selection {
  operation?: Operation
  selected: string[] = []

  constructor(props?: ISelection) {
    if (props.selected) {
      this.selected = props.selected
    }
    if (props.operation) {
      this.operation = props.operation
    }
    this.makeObservable()
  }

  makeObservable() {
    define(this, {
      selected: observable,
      select: action,
      batchSelect: action,
      add: action,
      remove: action,
      clear: action,
      crossAddTo: action,
    })
  }

  trigger(EventType = SelectNodeEvent) {
    return this.operation.dispatch(
      new EventType({
        target: this.operation.tree,
        source: this.operation.getSelectedNodes(),
      }),
    )
  }

  select(id: string | TreeNode) {
    if (isStr(id)) {
      if (this.selected.length === 1 && this.selected.includes(id)) {
        this.trigger(SelectNodeEvent)
        return
      }
      this.selected = [id]
      this.trigger(SelectNodeEvent)
    }
    else {
      this.select(id?.id)
    }
  }

  safeSelect(id: string | TreeNode) {
    if (!id)
      return
    this.select(id)
  }

  mapIds(ids: SelectableNode[]): string[] {
    if (!isArr(ids))
      return []
    return ids.filter((node): node is string | TreeNode => !!node).map((node) => {
      return isStr(node) ? node : node.id
    })
  }

  batchSelect(ids: string[] | TreeNode[]) {
    this.selected = this.mapIds(ids)
    this.trigger(SelectNodeEvent)
  }

  batchSafeSelect(ids: string[] | TreeNode[]) {
    if (!ids?.length)
      return
    this.batchSelect(ids)
  }

  get first() {
    if (this.selected && this.selected.length)
      return this.selected[0]
  }

  get last() {
    if (this.selected && this.selected.length)
      return this.selected[this.selected.length - 1]
  }

  get length() {
    return this.selected.length
  }

  add(...ids: SelectableNode[]) {
    this.mapIds(ids).forEach((id) => {
      if (!this.selected.includes(id)) {
        this.selected.push(id)
      }
    })
    this.trigger()
  }

  crossAddTo(node: TreeNode) {
    if (node.parent) {
      const selectedNodes = this.operation.getSelectedNodes()
      if (this.has(node)) {
        this.remove(node)
      }
      else {
        const minDistanceNode = selectedNodes.reduce(
          (minDistanceNode, item) => {
            return item.distanceTo(node) < minDistanceNode.distanceTo(node)
              ? item
              : minDistanceNode
          },
          selectedNodes[0],
        )
        if (minDistanceNode) {
          const crossNodes = node.crossSiblings(minDistanceNode)
          crossNodes.forEach((node) => {
            if (!this.selected.includes(node.id)) {
              this.selected.push(node.id)
            }
          })
        }
        if (!this.selected.includes(node.id)) {
          this.selected.push(node.id)
        }
      }
    }
  }

  remove(...ids: SelectableNode[]) {
    this.mapIds(ids).forEach((id) => {
      this.selected = this.selected.filter(item => item !== id)
    })
    this.trigger(UnSelectNodeEvent)
  }

  has(...ids: SelectableNode[]) {
    return this.mapIds(ids).some((id) => {
      return this.selected.includes(id)
    })
  }

  clear() {
    this.selected = []
    this.trigger(UnSelectNodeEvent)
  }
}
