import type { Engine } from '../models'
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import { CursorDragType } from '../models'
import { DOMNodeResolver } from '../resolvers/DOMNodeResolver'

export function useTranslateEffect(engine: Engine) {
  const resolver = new DOMNodeResolver(engine)

  engine.subscribeTo(DragStartEvent, (event) => {
    const target = event.data.target as HTMLElement
    const currentWorkspace
      = event.context?.workspace ?? engine.workbench.activeWorkspace
    const handler = target?.closest(`*[${engine.props.nodeTranslateAttrName}]`)
    if (!currentWorkspace)
      return
    const helper = currentWorkspace.operation.transformHelper
    if (handler) {
      const type = handler.getAttribute(engine.props.nodeTranslateAttrName)
      if (type) {
        const node = resolver.resolveSelectionHelper(target, currentWorkspace)
        if (node) {
          helper.dragStart({ dragNodes: [node], type: 'translate' })
        }
      }
    }
  })
  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Translate)
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
      helper.translate(node, (translate) => {
        element.style.position = 'absolute'
        element.style.left = '0px'
        element.style.top = '0px'
        element.style.transform = `translate3d(${translate.x}px,${translate.y}px,0)`
      })
    })
  })
  engine.subscribeTo(DragStopEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Translate)
      return
    const currentWorkspace
      = event.context?.workspace ?? engine.workbench.activeWorkspace
    const helper = currentWorkspace?.operation.transformHelper
    if (helper) {
      helper.dragEnd()
    }
  })
}
