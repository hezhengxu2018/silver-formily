import type { Engine } from '../models'
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import { CursorDragType } from '../models'
import { DOMNodeResolver } from '../resolvers/DOMNodeResolver'

export function useResizeEffect(engine: Engine) {
  const resolver = new DOMNodeResolver(engine)

  const findStartNodeHandler = (
    target: HTMLElement,
    currentWorkspace: Engine['workbench']['currentWorkspace'],
  ) => {
    const handler = target?.closest(
      `*[${engine.props.nodeResizeHandlerAttrName}]`,
    )
    if (handler) {
      const direction = handler.getAttribute(
        engine.props.nodeResizeHandlerAttrName,
      )
      if (direction) {
        const node = resolver.resolveSelectionHelper(target, currentWorkspace)
        if (node) {
          return { direction, node }
        }
      }
    }
  }

  engine.subscribeTo(DragStartEvent, (event) => {
    const target = event.data.target as HTMLElement
    const currentWorkspace
      = event.context?.workspace ?? engine.workbench.activeWorkspace
    if (!currentWorkspace)
      return
    const handler = findStartNodeHandler(target, currentWorkspace)
    const helper = currentWorkspace.operation.transformHelper
    if (handler) {
      helper.dragStart({
        dragNodes: [handler.node],
        type: 'resize',
        direction: handler.direction,
      })
    }
  })

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Resize)
      return
    const currentWorkspace
      = event.context?.workspace ?? engine.workbench.activeWorkspace
    const helper = currentWorkspace?.operation.transformHelper
    const dragNodes = helper.dragNodes
    if (!dragNodes.length)
      return
    helper.dragMove()
    dragNodes.forEach((node) => {
      const element = node.getElement()
      helper.resize(node, (rect) => {
        element.style.width = `${rect.width}px`
        element.style.height = `${rect.height}px`
        element.style.position = 'absolute'
        element.style.left = '0px'
        element.style.top = '0px'
        element.style.transform = `translate3d(${rect.x}px,${rect.y}px,0)`
      })
    })
  })

  engine.subscribeTo(DragStopEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Resize)
      return
    const currentWorkspace
      = event.context?.workspace ?? engine.workbench.activeWorkspace
    const helper = currentWorkspace?.operation.transformHelper
    if (helper) {
      helper.dragEnd()
    }
  })
}
