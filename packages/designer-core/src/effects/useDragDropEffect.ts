import type { Engine } from '../models'
import { Point } from '@silver-formily/designer-shared'
import {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
  ViewportScrollEvent,
} from '../events'
import { ClosestPosition, CursorType } from '../models'

export function useDragDropEffect(engine: Engine) {
  engine.subscribeTo(DragStartEvent, (event) => {
    if (engine.cursor.type !== CursorType.Move)
      return
    const target = event.data.target as HTMLElement | null
    const el = target?.closest?.(`
       *[${engine.props.nodeIdAttrName}],
       *[${engine.props.sourceIdAttrName}],
       *[${engine.props.outlineNodeIdAttrName}]
      `)
    const handler = target?.closest?.(
      `*[${engine.props.nodeDragHandlerAttrName}]`,
    )
    const helper = handler?.closest(
      `*[${engine.props.nodeSelectionIdAttrName}]`,
    )
    const sourceId = event.data.sourceId
      || el?.getAttribute?.(engine.props.sourceIdAttrName)
    const outlineId = event.data.outlineId
      || el?.getAttribute?.(engine.props.outlineNodeIdAttrName)
    const handlerId = event.data.handlerId
      || helper?.getAttribute?.(engine.props.nodeSelectionIdAttrName)
    const nodeId = event.data.nodeId
      || el?.getAttribute?.(engine.props.nodeIdAttrName)
    if (!nodeId && !outlineId && !handlerId && !sourceId)
      return
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation

      if (nodeId || outlineId || handlerId) {
        const node = engine.findNodeById(outlineId || nodeId || handlerId)
        if (node) {
          if (!node.allowDrag())
            return
          if (node === node.root)
            return
          const validSelected = engine
            .getAllSelectedNodes()
            .filter(node => node.allowDrag())
          if (validSelected.includes(node)) {
            operation.setDragNodes(operation.sortNodes(validSelected))
          }
          else {
            operation.setDragNodes([node])
          }
        }
      }
      else if (sourceId) {
        const sourceNode = engine.findNodeById(sourceId)
        if (sourceNode) {
          if (!sourceNode.allowDrag())
            return
          operation.setDragNodes([sourceNode])
        }
      }
    })
    engine.cursor.setStyle('move')
  })

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.type !== CursorType.Move)
      return
    const target = event.data.target as HTMLElement | null
    const el = target?.closest?.(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `)
    const nodeId = event.data.touchNodeId
      || event.data.nodeId
      || el?.getAttribute?.(engine.props.nodeIdAttrName)
    const outlineId = event.data.outlineId
      || el?.getAttribute?.(engine.props.outlineNodeIdAttrName)
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const tree = operation.tree
      const point = new Point(event.data.topClientX, event.data.topClientY)
      const dragNodes = operation.getDragNodes()
      if (!dragNodes.length)
        return
      const touchNode = tree.findById(outlineId || nodeId)
      operation.dragWith(point, touchNode)
    })
  })

  engine.subscribeTo(ViewportScrollEvent, (event) => {
    if (engine.cursor.type !== CursorType.Move)
      return
    const point = new Point(
      engine.cursor.position.topClientX,
      engine.cursor.position.topClientY,
    )
    const currentWorkspace = event?.context?.workspace
    if (!currentWorkspace)
      return
    const operation = currentWorkspace.operation
    if (!operation.getDragNodes()?.length)
      return
    const tree = operation.tree
    const viewport = currentWorkspace.viewport
    const outline = currentWorkspace.outline
    const viewportTarget = viewport.elementFromPoint(point)
    const outlineTarget = outline.elementFromPoint(point)
    const viewportNodeElement = viewportTarget?.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `)
    const outlineNodeElement = outlineTarget?.closest(`
    *[${engine.props.nodeIdAttrName}],
    *[${engine.props.outlineNodeIdAttrName}]
  `)
    const nodeId = viewportNodeElement?.getAttribute(
      engine.props.nodeIdAttrName,
    )
    const outlineNodeId = outlineNodeElement?.getAttribute(
      engine.props.outlineNodeIdAttrName,
    )
    const touchNode = tree.findById(outlineNodeId || nodeId)
    operation.dragWith(point, touchNode)
  })

  engine.subscribeTo(DragStopEvent, () => {
    if (engine.cursor.type !== CursorType.Move)
      return

    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const dragNodes = operation.getDragNodes()
      const closestNode = operation.getClosestNode()
      const closestDirection = operation.getClosestPosition()
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
                ...operation.getDropNodes(closestNode.parent),
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
                ...operation.getDropNodes(closestNode.parent),
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
              closestNode.append(...operation.getDropNodes(closestNode)),
            )
            operation.setDropNode(closestNode)
          }
        }
        else if (closestDirection === ClosestPosition.InnerBefore) {
          if (closestNode.allowAppend(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.prepend(...operation.getDropNodes(closestNode)),
            )
            operation.setDropNode(closestNode)
          }
        }
      }
      operation.dragClean()
    })
    engine.cursor.setStyle('')
  })
}
