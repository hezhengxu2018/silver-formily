import { describe, expect, it, vi } from 'vitest'
import { DragMoveEvent, DragNodeEvent, DragStartEvent, DragStopEvent } from '../events'
import { createBehavior } from '../externals'
import { Engine, TreeNode } from '../models'
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

  it('unregisters stale children when replacing children directly', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'registry-root-set-children',
        componentName: 'Root',
        children: [
          {
            id: 'registry-old-child-set-children',
            componentName: 'Field',
          },
        ],
      },
    })
    const root = engine.workbench.ensureWorkspace().operation.tree
    const nextChild = new TreeNode({
      id: 'registry-new-child-set-children',
      componentName: 'Field',
    })

    root.setChildren(nextChild)

    expect(
      engine.findNodeById('registry-old-child-set-children'),
    ).toBeUndefined()
    expect(engine.findNodeById('registry-new-child-set-children')).toBe(
      nextChild,
    )
  })

  it('rebinds moved subtrees to the target workspace registry', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'registry-root-rebind',
        componentName: 'Root',
        children: [
          {
            id: 'registry-parent-rebind',
            componentName: 'Container',
            children: [
              {
                id: 'registry-child-rebind',
                componentName: 'Field',
              },
            ],
          },
        ],
      },
    })
    const sourceWorkspace = engine.workbench.ensureWorkspace({ id: 'source' })
    const targetWorkspace = engine.workbench.ensureWorkspace({ id: 'target' })
    const parent = sourceWorkspace.operation.tree.findById(
      'registry-parent-rebind',
    )
    if (!parent)
      throw new Error('Expected source workspace parent node to exist')

    targetWorkspace.operation.tree.append(parent)

    expect(
      sourceWorkspace.operation.tree.findById('registry-parent-rebind'),
    ).toBeUndefined()
    expect(
      sourceWorkspace.operation.tree.findById('registry-child-rebind'),
    ).toBeUndefined()
    expect(
      targetWorkspace.operation.tree.findById('registry-parent-rebind'),
    ).toBe(parent)
    expect(
      targetWorkspace.operation.tree.findById('registry-child-rebind')?.root,
    ).toBe(targetWorkspace.operation.tree)
  })

  it('keeps node lookup scoped to each engine instance', () => {
    const firstEngine = new Engine({
      defaultComponentTree: {
        id: 'scoped-root',
        componentName: 'FirstRoot',
        children: [
          {
            id: 'scoped-shared-id',
            componentName: 'FirstField',
          },
        ],
      },
    })
    const secondEngine = new Engine({
      defaultComponentTree: {
        id: 'scoped-root',
        componentName: 'SecondRoot',
        children: [
          {
            id: 'scoped-shared-id',
            componentName: 'SecondField',
          },
        ],
      },
    })

    firstEngine.workbench.ensureWorkspace()
    secondEngine.workbench.ensureWorkspace()

    expect(firstEngine.findNodeById('scoped-shared-id')?.componentName).toBe(
      'FirstField',
    )
    expect(secondEngine.findNodeById('scoped-shared-id')?.componentName).toBe(
      'SecondField',
    )
  })

  it('can scope node lookup to a specific workspace', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'workspace-scoped-root',
        componentName: 'Root',
        children: [
          {
            id: 'workspace-scoped-shared-id',
            componentName: 'OriginalField',
          },
        ],
      },
    })
    const firstWorkspace = engine.workbench.ensureWorkspace({ id: 'first' })
    const secondWorkspace = engine.workbench.ensureWorkspace({ id: 'second' })

    firstWorkspace.operation.tree
      .findById('workspace-scoped-shared-id')
      ?.setComponentName('FirstField')
    secondWorkspace.operation.tree
      .findById('workspace-scoped-shared-id')
      ?.setComponentName('SecondField')

    expect(
      engine.findNodeById(
        'workspace-scoped-shared-id',
        firstWorkspace,
      )?.componentName,
    ).toBe('FirstField')
    expect(
      engine.findNodeById(
        'workspace-scoped-shared-id',
        secondWorkspace,
      )?.componentName,
    ).toBe('SecondField')
  })

  it('keeps source node lookup scoped to its owning engine', () => {
    const firstEngine = new Engine({})
    const secondEngine = new Engine({})

    const source = firstEngine.createNode({
      id: 'scoped-source-id',
      componentName: 'Field',
      isSourceNode: true,
    })

    expect(firstEngine.findNodeById('scoped-source-id')).toBe(source)
    expect(secondEngine.findNodeById('scoped-source-id')).toBeUndefined()
  })

  it('refreshes source node lookup after replacing source children', () => {
    const engine = new Engine({})
    const source = engine.createNode({
      id: 'source-registry-root',
      componentName: 'SourceRoot',
      isSourceNode: true,
      children: [
        {
          id: 'source-registry-old-child',
          componentName: 'Field',
        },
      ],
    })

    expect(engine.findNodeById('source-registry-old-child')?.id).toBe(
      'source-registry-old-child',
    )

    source.from({
      id: 'source-registry-root',
      componentName: 'SourceRoot',
      children: [
        {
          id: 'source-registry-new-child',
          componentName: 'Field',
        },
      ],
    })

    expect(engine.findNodeById('source-registry-old-child')).toBeUndefined()
    expect(engine.findNodeById('source-registry-new-child')?.id).toBe(
      'source-registry-new-child',
    )
  })

  it('refreshes source node lookup after source root id changes', () => {
    const engine = new Engine({})
    const source = engine.createNode({
      id: 'source-registry-before-rename',
      componentName: 'SourceRoot',
      isSourceNode: true,
    })

    source.from({
      id: 'source-registry-after-rename',
      componentName: 'SourceRoot',
    })

    expect(engine.findNodeById('source-registry-before-rename')).toBeUndefined()
    expect(engine.findNodeById('source-registry-after-rename')).toBe(source)
  })

  it('ignores stale selected ids when resolving selected nodes', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'selection-root-stale',
        componentName: 'Root',
        children: [
          {
            id: 'selection-a-stale',
            componentName: 'Field',
          },
          {
            id: 'selection-b-stale',
            componentName: 'Field',
          },
        ],
      },
    })
    const selection = engine.workbench.ensureWorkspace().operation.selection
    const node = engine.findNodeById('selection-b-stale')

    selection.batchSelect(['selection-missing-stale', 'selection-a-stale'])

    expect(selection.selectedNodes.map(node => node.id)).toEqual([
      'selection-a-stale',
    ])
    expect(() => selection.crossAddTo(node)).not.toThrow()
  })

  it('keeps selection indexes in sync when restoring operation state', () => {
    const engine = new Engine({
      defaultComponentTree: {
        id: 'selection-root-from',
        componentName: 'Root',
        children: [
          {
            id: 'selection-a-from',
            componentName: 'Field',
          },
          {
            id: 'selection-b-from',
            componentName: 'Field',
          },
        ],
      },
    })
    const operation = engine.workbench.ensureWorkspace().operation

    operation.selection.select('selection-a-from')
    expect(operation.selection.has('selection-a-from')).toBe(true)

    operation.from({
      selected: ['selection-b-from'],
    })

    expect(operation.selection.selected).toEqual(['selection-b-from'])
    expect(operation.selection.has('selection-a-from')).toBe(false)
    expect(operation.selection.has('selection-b-from')).toBe(true)
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
