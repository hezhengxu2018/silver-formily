import { describe, expect, it, vi } from 'vitest'
import { DragMoveEvent, DragNodeEvent, DragStartEvent, DragStopEvent } from '../events'
import { createBehavior } from '../externals'
import { Engine } from '../models'
import { GlobalRegistry } from '../registry'

describe('designer drag behavior', () => {
  const createDragEventData = (clientX: number, clientY: number) => ({
    clientX,
    clientY,
    pageX: clientX,
    pageY: clientY,
    target: null,
    view: globalThis as any,
  })

  it('dispatches semantic drag events from the official drag drop driver', () => {
    const engine = new Engine({})
    const received: string[] = []

    engine.subscribeTo(DragStartEvent, (event) => {
      received.push(event.type)
      expect(event.data.clientX).toBe(10)
    })
    engine.subscribeTo(DragMoveEvent, (event) => {
      received.push(event.type)
      expect(event.data.clientY).toBe(20)
    })
    engine.subscribeTo(DragStopEvent, (event) => {
      received.push(event.type)
      expect(event.data.clientX).toBe(30)
    })

    engine.dispatch(new DragStartEvent(createDragEventData(10, 0)))
    engine.dispatch(new DragMoveEvent(createDragEventData(0, 20)))
    engine.dispatch(new DragStopEvent(createDragEventData(30, 0)))

    expect(received).toEqual(['drag:start', 'drag:move', 'drag:stop'])
  })

  it('tracks moving nodes through moveHelper', () => {
    const engine = new Engine({
      defaultComponentTree: {
        children: [
          {
            id: 'field-1',
            componentName: 'Field',
          },
        ],
      },
    })
    const workspace = engine.workbench.ensureWorkspace()
    const node = workspace.operation.tree.findById('field-1')
    const dragNodeSpy = vi.fn()

    workspace.operation.workspace.viewport.cacheElements = vi.fn()
    engine.subscribeTo(DragNodeEvent, dragNodeSpy)

    workspace.operation.moveHelper.dragStart({ dragNodes: [node] })

    expect(workspace.operation.moveHelper.dragNodes).toEqual([node])
    expect(engine.findMovingNodes()).toEqual([node])
    expect(dragNodeSpy).toHaveBeenCalledTimes(1)
    expect(dragNodeSpy.mock.calls[0][0].data.source).toEqual([node])
  })

  it('unregisters removed node descendants from global lookup', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'registry-root-remove',
        componentName: 'Root',
        children: [
          {
            id: 'registry-parent-remove',
            componentName: 'Container',
            children: [
              {
                id: 'registry-child-remove',
                componentName: 'Field',
              },
            ],
          },
        ],
      },
    })
    const root = engine.workbench.ensureWorkspace().operation.tree
    const parent = root.findById('registry-parent-remove')

    expect(engine.findNodeById('registry-parent-remove')).toBe(parent)
    expect(engine.findNodeById('registry-child-remove')?.id).toBe(
      'registry-child-remove',
    )

    parent.remove()

    expect(engine.findNodeById('registry-parent-remove')).toBeUndefined()
    expect(engine.findNodeById('registry-child-remove')).toBeUndefined()
  })

  it('unregisters stale children when replacing a tree from schema', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'registry-root-from',
        componentName: 'Root',
        children: [
          {
            id: 'registry-old-child-from',
            componentName: 'Field',
          },
        ],
      },
    })
    const root = engine.workbench.ensureWorkspace().operation.tree

    expect(engine.findNodeById('registry-old-child-from')?.id).toBe(
      'registry-old-child-from',
    )

    root.from({
      id: 'registry-root-from',
      componentName: 'Root',
      children: [
        {
          id: 'registry-new-child-from',
          componentName: 'Field',
        },
      ],
    })

    expect(engine.findNodeById('registry-old-child-from')).toBeUndefined()
    expect(engine.findNodeById('registry-new-child-from')?.id).toBe(
      'registry-new-child-from',
    )
  })

  it('requires root containers to declare droppable behavior before appending nodes', () => {
    const blockedEngine = new Engine({
      defaultComponentTree: {
        id: 'form-root',
        componentName: 'Form',
        children: [],
      },
    })
    const blockedRoot = blockedEngine.workbench.ensureWorkspace().operation.tree
    const blockedSource = blockedEngine.createNode({
      id: 'source-1',
      componentName: 'Field',
      isSourceNode: true,
    })

    expect(blockedRoot.allowAppend([blockedSource])).toBe(false)

    try {
      GlobalRegistry.setDesignerBehaviors(
        [
          createBehavior({
            name: 'Form',
            selector: 'Form',
            designerProps: {
              droppable: true,
            },
          }),
        ] as any,
      )
      const engine = new Engine({
        defaultComponentTree: {
          id: 'form-root',
          componentName: 'Form',
          children: [],
        },
      })
      const workspace = engine.workbench.ensureWorkspace()
      const root = workspace.operation.tree
      const source = engine.createNode({
        id: 'source-2',
        componentName: 'Field',
        isSourceNode: true,
      })

      expect(root.allowAppend([source])).toBe(true)
    }
    finally {
      GlobalRegistry.setDesignerBehaviors([])
    }
  })
})
