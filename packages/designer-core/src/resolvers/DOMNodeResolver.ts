import type { Engine, TreeNode, Workspace } from '../models'

export interface IDOMNodeTargetInfo {
  nodeId?: string
  outlineId?: string
  sourceId?: string
  helperId?: string
}

function getElement(target: EventTarget | null | undefined) {
  return typeof Element !== 'undefined' && target instanceof Element
    ? target
    : undefined
}

function getAttribute(element: Element | null | undefined, name: string) {
  return element?.getAttribute?.(name) || undefined
}

export class DOMNodeResolver {
  constructor(private engine: Engine) {}

  parseTarget(target: EventTarget | null | undefined): IDOMNodeTargetInfo {
    const element = getElement(target)
    const props = this.engine.props
    const nodeElement = element?.closest?.(`
      *[${props.nodeIdAttrName}],
      *[${props.sourceIdAttrName}],
      *[${props.outlineNodeIdAttrName}]
    `)
    const dragHandler = element?.closest?.(
      `*[${props.nodeDragHandlerAttrName}]`,
    )
    const helperElement
      = element?.closest?.(`*[${props.nodeSelectionIdAttrName}]`)
        || dragHandler?.closest?.(`*[${props.nodeSelectionIdAttrName}]`)

    return {
      nodeId: getAttribute(nodeElement, props.nodeIdAttrName),
      outlineId: getAttribute(nodeElement, props.outlineNodeIdAttrName),
      sourceId: getAttribute(nodeElement, props.sourceIdAttrName),
      helperId: getAttribute(helperElement, props.nodeSelectionIdAttrName),
    }
  }

  resolveDesignNode(
    target: EventTarget | null | undefined,
    workspace?: Workspace,
  ): TreeNode | undefined {
    const { outlineId, nodeId, helperId } = this.parseTarget(target)
    const id = outlineId || nodeId || helperId
    if (!id)
      return
    if (workspace)
      return workspace.operation.tree.findById(id)
    return this.engine.findNodeById(id)
  }

  resolveSourceNode(
    target: EventTarget | null | undefined,
    workspace?: Workspace,
  ): TreeNode | undefined {
    const { sourceId } = this.parseTarget(target)
    if (!sourceId)
      return
    return this.engine.findNodeById(sourceId, workspace)
  }

  resolveSelectionHelper(
    target: EventTarget | null | undefined,
    workspace?: Workspace,
  ): TreeNode | undefined {
    const { helperId } = this.parseTarget(target)
    if (!helperId)
      return
    if (workspace)
      return workspace.operation.tree.findById(helperId)
    return this.engine.findNodeById(helperId)
  }
}
