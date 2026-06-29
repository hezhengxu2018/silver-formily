import type { ICustomEvent } from '@silver-formily/designer-shared'
import type { Engine } from './Engine'
import type { ITreeNode } from './TreeNode'
import type { Workspace } from './Workspace'
import { cancelIdle, isFn, requestIdle } from '@silver-formily/designer-shared'
import { Hover } from './Hover'
import { MoveHelper } from './MoveHelper'
import { Selection } from './Selection'
import { TransformHelper } from './TransformHelper'
import { TreeNode } from './TreeNode'
import { TreeNodeRegistry } from './TreeNodeRegistry'

export interface IOperation {
  tree?: ITreeNode
  selected?: string[]
}

export class Operation {
  workspace: Workspace

  engine: Engine

  tree: TreeNode

  treeNodes = new TreeNodeRegistry()

  selection: Selection

  hover: Hover

  transformHelper: TransformHelper

  moveHelper: MoveHelper

  requests = {
    snapshot: null,
  }

  constructor(workspace: Workspace) {
    this.engine = workspace.engine
    this.workspace = workspace
    this.tree = new TreeNode({
      componentName: this.engine.props.rootComponentName,
      ...this.engine.props.defaultComponentTree,
      operation: this,
    })
    this.hover = new Hover({
      operation: this,
    })
    this.selection = new Selection({
      operation: this,
    })
    this.moveHelper = new MoveHelper({
      operation: this,
    })
    this.transformHelper = new TransformHelper({
      operation: this,
    })
    this.selection.select(this.tree)
  }

  dispatch(event: ICustomEvent, callback?: () => void) {
    if (this.workspace.dispatch(event) === false)
      return
    if (isFn(callback))
      return callback()
  }

  snapshot(type?: string) {
    cancelIdle(this.requests.snapshot)
    if (
      !this.workspace
      || !this.workspace.history
      || this.workspace.history.locking
    ) {
      return
    }
    this.requests.snapshot = requestIdle(() => {
      this.workspace.history.push(type)
    })
  }

  dispose() {
    cancelIdle(this.requests.snapshot)
    this.requests.snapshot = null
    this.hover.clear()
    this.moveHelper.dragEnd()
    this.transformHelper.dragEnd()
    this.selection.setSelected([])
  }

  from(operation?: IOperation) {
    if (!operation)
      return
    if (operation.tree) {
      this.tree.from(operation.tree)
    }
    if (operation.selected) {
      this.selection.setSelected(operation.selected)
    }
  }

  serialize(): IOperation {
    return {
      tree: this.tree.serialize(),
      selected: [this.tree.id],
    }
  }
}
