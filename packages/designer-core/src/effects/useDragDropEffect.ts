import type {
  Engine,
} from '../models'
import { Point } from '@silver-formily/designer-shared'
import {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
  ViewportScrollEvent,
} from '../events'
import {
  ClosestPosition,
  CursorDragType,
  CursorType,
  TreeNode,
} from '../models'
import { DOMNodeResolver } from '../resolvers/DOMNodeResolver'

export function useDragDropEffect(engine: Engine) {
  const resolver = new DOMNodeResolver(engine)
  const getEventWorkspaces = (event: DragStartEvent | DragMoveEvent) => {
    return event.context?.workspace
      ? [event.context.workspace]
      : engine.workbench.workspaces
  }

  engine.subscribeTo(DragStartEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    const target = event.data.target as HTMLElement
    const handler = target?.closest(
      `*[${engine.props.nodeDragHandlerAttrName}]`,
    )
    const targetInfo = resolver.parseTarget(target)
    if (
      !targetInfo.nodeId
      && !targetInfo.outlineId
      && !targetInfo.sourceId
      && !targetInfo.helperId
      && !handler
    ) {
      return
    }
    getEventWorkspaces(event).forEach((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      if (
        targetInfo.nodeId
        || targetInfo.outlineId
        || targetInfo.helperId
      ) {
        const node = resolver.resolveDesignNode(target, currentWorkspace)
        if (node) {
          if (!node.allowDrag())
            return
          if (node === node.root)
            return
          const validSelected = engine
            .getAllSelectedNodes()
            .filter(node => node.allowDrag())
          if (validSelected.includes(node)) {
            moveHelper.dragStart({ dragNodes: TreeNode.sort(validSelected) })
          }
          else {
            moveHelper.dragStart({ dragNodes: [node] })
          }
        }
      }
      else if (targetInfo.sourceId) {
        const sourceNode = resolver.resolveSourceNode(target, currentWorkspace)
        if (sourceNode) {
          moveHelper.dragStart({ dragNodes: [sourceNode] })
        }
      }
    })
    engine.cursor.setStyle('move')
  })

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    if (engine.cursor.dragType !== CursorDragType.Move)
      return
    const target = event.data.target as HTMLElement
    const point = new Point(event.data.topClientX, event.data.topClientY)
    getEventWorkspaces(event).forEach((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      const dragNodes = moveHelper.dragNodes
      if (!dragNodes.length)
        return
      const touchNode = resolver.resolveDesignNode(target, currentWorkspace)
      moveHelper.dragMove({
        point,
        touchNode,
      })
    })
  })

  engine.subscribeTo(ViewportScrollEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    if (engine.cursor.dragType !== CursorDragType.Move)
      return
    const point = new Point(
      engine.cursor.position.topClientX,
      engine.cursor.position.topClientY,
    )
    const currentWorkspace
      = event?.context?.workspace ?? engine.workbench.activeWorkspace
    if (!currentWorkspace)
      return
    const operation = currentWorkspace.operation
    const moveHelper = operation.moveHelper
    if (!moveHelper.dragNodes.length)
      return
    const viewport = currentWorkspace.viewport
    const outline = currentWorkspace.outline
    const viewportTarget = viewport.elementFromPoint(point)
    const outlineTarget = outline.elementFromPoint(point)
    const touchNode = resolver.resolveDesignNode(
      outlineTarget || viewportTarget,
      currentWorkspace,
    )
    moveHelper.dragMove({ point, touchNode })
  })

  engine.subscribeTo(DragStopEvent, () => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    if (engine.cursor.dragType !== CursorDragType.Move)
      return
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      const dragNodes = moveHelper.dragNodes
      const closestNode = moveHelper.closestNode
      const closestDirection = moveHelper.closestDirection
      const selection = operation.selection
      if (!dragNodes.length)
        return
      if (dragNodes.length && closestNode && closestDirection) {
        if (
          closestDirection === ClosestPosition.After
          || closestDirection === ClosestPosition.Under
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.insertAfter(
                ...TreeNode.filterDroppable(dragNodes, closestNode.parent),
              ),
            )
          }
        }
        else if (
          closestDirection === ClosestPosition.Before
          || closestDirection === ClosestPosition.Upper
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.insertBefore(
                ...TreeNode.filterDroppable(dragNodes, closestNode.parent),
              ),
            )
          }
        }
        else if (
          closestDirection === ClosestPosition.Inner
          || closestDirection === ClosestPosition.InnerAfter
        ) {
          if (closestNode.allowAppend(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.append(
                ...TreeNode.filterDroppable(dragNodes, closestNode),
              ),
            )
            moveHelper.dragDrop({ dropNode: closestNode })
          }
        }
        else if (closestDirection === ClosestPosition.InnerBefore) {
          if (closestNode.allowAppend(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.prepend(
                ...TreeNode.filterDroppable(dragNodes, closestNode),
              ),
            )
            moveHelper.dragDrop({ dropNode: closestNode })
          }
        }
      }
      moveHelper.dragEnd()
    })
    engine.cursor.setStyle('')
  })
}
