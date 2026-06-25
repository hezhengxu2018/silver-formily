import { describe, expect, it, vi } from 'vitest'
import { useDragDropEffect } from '../effects/useDragDropEffect'
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import { createBehavior } from '../externals'
import { Engine } from '../models'
import { GlobalRegistry } from '../registry'

describe('designer drag controller', () => {
  it('dispatches semantic drag events', () => {
    const engine = new Engine({ mountTarget: false })
    const received: string[] = []
    engine.subscribeTo(DragStartEvent, (event) => {
      received.push(event.type)
      expect(event.data.nodeId).toBe('field-1')
      expect(event.data.clientX).toBe(10)
    })
    engine.subscribeTo(DragMoveEvent, (event) => {
      received.push(event.type)
      expect(event.data.touchNodeId).toBe('field-2')
      expect(event.data.clientY).toBe(20)
    })
    engine.subscribeTo(DragStopEvent, (event) => {
      received.push(event.type)
      expect(event.data.clientX).toBe(30)
    })

    engine.drag.start({ clientX: 10, clientY: 0, nodeId: 'field-1' })
    engine.drag.move({ clientX: 0, clientY: 20, touchNodeId: 'field-2' })
    engine.drag.stop({ clientX: 30, clientY: 0 })

    expect(received).toEqual(['drag:start', 'drag:move', 'drag:stop'])
  })

  it('lets drag drop effect consume explicit node ids without DOM targets', () => {
    const engine = new Engine({
      autoAttachEvents: false,
      defaultComponentTree: {
        children: [
          {
            id: 'field-1',
            componentName: 'Field',
          },
        ],
      },
      mountTarget: false,
    })
    useDragDropEffect(engine)
    const workspace = engine.workbench.ensureWorkspace()
    const node = workspace.operation.tree.findById('field-1')
    const dragWithSpy = vi.spyOn(workspace.operation, 'dragWith')

    engine.drag.start({ clientX: 0, clientY: 0, nodeId: 'field-1' })
    engine.drag.move({ clientX: 5, clientY: 6, touchNodeId: 'field-1' })

    expect(workspace.operation.getDragNodes()).toEqual([node])
    expect(dragWithSpy).toHaveBeenCalledWith(
      expect.objectContaining({ x: 5, y: 6 }),
      node,
    )
  })

  it('requires root containers to declare droppable behavior before appending nodes', () => {
    const engine = new Engine({
      autoAttachEvents: false,
      defaultComponentTree: {
        id: 'form-root',
        componentName: 'Form',
        children: [],
      },
      mountTarget: false,
    })
    const workspace = engine.workbench.ensureWorkspace()
    const root = workspace.operation.tree
    const source = engine.createNode({
      id: 'source-1',
      componentName: 'Field',
      isSourceNode: true,
    })

    workspace.operation.setDragNodes([source])

    expect(root.allowAppend(workspace.operation.getDragNodes())).toBe(false)

    try {
      GlobalRegistry.setDesignerBehaviors([
        createBehavior({
          selector: 'Form',
          designerProps: {
            droppable: true,
          },
        }),
      ])

      expect(root.allowAppend(workspace.operation.getDragNodes())).toBe(true)
    }
    finally {
      GlobalRegistry.setDesignerBehaviors([])
    }
  })
})
