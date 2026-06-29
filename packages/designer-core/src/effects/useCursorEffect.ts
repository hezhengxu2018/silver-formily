import type { Engine } from '../models'
import { requestIdle } from '@silver-formily/designer-shared'
import {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
  MouseMoveEvent,
} from '../events'
import { CursorStatus } from '../models'
import { DOMNodeResolver } from '../resolvers/DOMNodeResolver'

export function useCursorEffect(engine: Engine) {
  const resolver = new DOMNodeResolver(engine)

  engine.subscribeTo(MouseMoveEvent, (event) => {
    engine.cursor.setStatus(
      engine.cursor.status === CursorStatus.Dragging
      || engine.cursor.status === CursorStatus.DragStart
        ? engine.cursor.status
        : CursorStatus.Normal,
    )
    if (engine.cursor.status === CursorStatus.Dragging)
      return
    engine.cursor.setPosition(event.data)
  })
  engine.subscribeTo(DragStartEvent, (event) => {
    engine.cursor.setStatus(CursorStatus.DragStart)
    engine.cursor.setDragStartPosition(event.data)
  })
  engine.subscribeTo(DragMoveEvent, (event) => {
    engine.cursor.setStatus(CursorStatus.Dragging)
    engine.cursor.setPosition(event.data)
  })
  engine.subscribeTo(DragStopEvent, (event) => {
    engine.cursor.setStatus(CursorStatus.DragStop)
    engine.cursor.setDragEndPosition(event.data)
    engine.cursor.setDragStartPosition(null)
    requestIdle(() => {
      engine.cursor.setStatus(CursorStatus.Normal)
    })
  })
  engine.subscribeTo(MouseMoveEvent, (event) => {
    const currentWorkspace = event?.context?.workspace
    if (!currentWorkspace)
      return
    const operation = currentWorkspace.operation
    if (engine.cursor.status !== CursorStatus.Normal) {
      operation.hover.clear()
      return
    }
    const target = event.data.target as HTMLElement
    const targetInfo = resolver.parseTarget(target)
    if (!targetInfo.nodeId && !targetInfo.outlineId) {
      return
    }
    const node = resolver.resolveDesignNode(target, currentWorkspace)
    if (node) {
      operation.hover.setHover(node)
    }
    else {
      operation.hover.clear()
    }
  })
}
