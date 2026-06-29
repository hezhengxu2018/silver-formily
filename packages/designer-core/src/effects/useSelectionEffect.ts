import type { Engine } from '../models'
import { KeyCode, Point } from '@silver-formily/designer-shared'
import { MouseClickEvent } from '../events'
import { CursorStatus } from '../models'
import { DOMNodeResolver } from '../resolvers/DOMNodeResolver'

export function useSelectionEffect(engine: Engine) {
  const resolver = new DOMNodeResolver(engine)

  engine.subscribeTo(MouseClickEvent, (event) => {
    if (engine.cursor.status !== CursorStatus.Normal)
      return
    const target: HTMLElement = event.data.target as any
    const targetInfo = resolver.parseTarget(target)
    const isHelpers = target?.closest?.(
      `*[${engine.props.nodeSelectionIdAttrName}]`,
    )
    const currentWorkspace
      = event.context?.workspace ?? engine.workbench.activeWorkspace
    if (!currentWorkspace)
      return
    if (!targetInfo.nodeId && !targetInfo.outlineId) {
      const point = new Point(event.data.topClientX, event.data.topClientY)
      const operation = currentWorkspace.operation
      const viewport = currentWorkspace.viewport
      const outline = currentWorkspace.outline
      const isInViewport = viewport.isPointInViewport(point, false)
      const isInOutline = outline.isPointInViewport(point, false)
      if (isHelpers)
        return
      if (isInViewport || isInOutline) {
        const selection = operation.selection
        const tree = operation.tree
        selection.select(tree)
      }
      return
    }
    const operation = currentWorkspace.operation
    const selection = operation.selection
    const tree = operation.tree
    const node = resolver.resolveDesignNode(target, currentWorkspace)
    if (node) {
      engine.keyboard.requestClean()
      if (
        engine.keyboard.isKeyDown(KeyCode.Meta)
        || engine.keyboard.isKeyDown(KeyCode.Control)
      ) {
        if (selection.has(node)) {
          if (selection.selected.length > 1) {
            selection.remove(node)
          }
        }
        else {
          selection.add(node)
        }
      }
      else if (engine.keyboard.isKeyDown(KeyCode.Shift)) {
        if (selection.has(node)) {
          if (selection.selected.length > 1) {
            selection.remove(node)
          }
        }
        else {
          selection.crossAddTo(node)
        }
      }
      else {
        selection.select(node)
      }
    }
    else {
      selection.select(tree)
    }
  })
}
