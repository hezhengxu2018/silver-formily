import { KeyCode } from '@silver-formily/designer-shared'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DragDropDriver } from '../drivers/DragDropDriver'
import { MouseMoveDriver } from '../drivers/MouseMoveDriver'
import { useContentEditableEffect } from '../effects/useContentEditableEffect'
import { useSelectionEffect } from '../effects/useSelectionEffect'
import { MouseClickEvent, MouseDoubleClickEvent } from '../events'
import { CursorStatus, Engine, Viewport } from '../models'

function createCursorEvent<T extends MouseClickEvent | MouseDoubleClickEvent>(
  EventType: new (data: ConstructorParameters<typeof MouseClickEvent>[0]) => T,
  target: EventTarget,
) {
  return new EventType({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    target,
    view: window,
  })
}

describe('designer-core regression coverage', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('mouseMoveDriver detach removes the same mousemove listener it attaches', () => {
    const driver = new MouseMoveDriver({} as any)
    const attachSpy = vi.spyOn(driver, 'addEventListener')
    const detachSpy = vi.spyOn(driver, 'removeEventListener')

    driver.attach()
    driver.detach()

    expect(attachSpy).toHaveBeenCalledWith('mousemove', driver.onMouseMove, {
      mode: 'onlyOne',
    })
    expect(detachSpy).toHaveBeenCalledWith('mousemove', driver.onMouseMove, {
      mode: 'onlyOne',
    })
  })

  it('dragDropDriver keeps the mousedown listener after mouseup for subsequent drags', () => {
    const driver = new DragDropDriver({} as any)
    const removeSpy = vi.spyOn(driver, 'batchRemoveEventListener')

    driver.onMouseUp(new MouseEvent('mouseup', { view: window }))

    expect(removeSpy).not.toHaveBeenCalledWith('mousedown', driver.onMouseDown, true)
  })

  it('dragDropDriver removes the captured mousedown listener on detach', () => {
    const driver = new DragDropDriver({} as any)
    const removeSpy = vi.spyOn(driver, 'batchRemoveEventListener')

    driver.detach()

    expect(removeSpy).toHaveBeenCalledWith('mousedown', driver.onMouseDown, true)
  })

  it('useContentEditableEffect removes paste and keydown listeners when editing ends', () => {
    const subscribeMap = new Map<
      new (...args: any[]) => unknown,
      (event: MouseClickEvent | MouseDoubleClickEvent) => void
    >()
    const targetNode = {
      props: {},
      takeSnapshot: vi.fn(),
    }
    const engine = {
      props: {
        contentEditableAttrName: 'data-content-editable',
        contentEditableNodeIdAttrName: 'data-content-editable-node-id',
        nodeIdAttrName: 'data-node-id',
      },
      workbench: {
        activeWorkspace: {
          operation: {
            tree: {
              findById: vi.fn(() => targetNode),
            },
          },
        },
      },
      subscribeTo: vi.fn((EventType, handler) => {
        subscribeMap.set(EventType, handler)
      }),
    } as any

    useContentEditableEffect(engine)

    const editableElement = document.createElement('div')
    editableElement.setAttribute('data-content-editable', 'title')
    editableElement.setAttribute('data-content-editable-node-id', 'node-1')
    document.body.appendChild(editableElement)

    const addSpy = vi.spyOn(editableElement, 'addEventListener')
    const removeSpy = vi.spyOn(editableElement, 'removeEventListener')

    subscribeMap
      .get(MouseDoubleClickEvent)
      ?.(
        createCursorEvent(MouseDoubleClickEvent, editableElement),
      )

    expect(addSpy).toHaveBeenCalledWith('paste', expect.any(Function))
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    subscribeMap
      .get(MouseClickEvent)
      ?.(
        createCursorEvent(MouseClickEvent, document.body),
      )

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('paste', expect.any(Function))
  })

  it('useSelectionEffect selects the clicked node by default', () => {
    const subscribeMap = new Map<any, (event: MouseClickEvent) => void>()
    const selection = {
      add: vi.fn(),
      crossAddTo: vi.fn(),
      has: vi.fn(() => false),
      remove: vi.fn(),
      select: vi.fn(),
      selected: [],
    }
    const node = { id: 'node-1' }
    const engine = {
      cursor: { status: CursorStatus.Normal },
      keyboard: {
        isKeyDown: vi.fn(() => false),
        requestClean: vi.fn(),
      },
      props: {
        nodeIdAttrName: 'data-node-id',
        nodeSelectionIdAttrName: 'data-helper-id',
        outlineNodeIdAttrName: 'data-outline-id',
      },
      subscribeTo: vi.fn((EventType, handler) => {
        subscribeMap.set(EventType, handler)
      }),
      workbench: {
        activeWorkspace: {
          operation: {
            selection,
            tree: {
              findById: vi.fn(() => node),
            },
          },
        },
      },
    } as any

    useSelectionEffect(engine)

    const element = document.createElement('div')
    element.setAttribute('data-node-id', 'node-1')
    document.body.appendChild(element)

    subscribeMap
      .get(MouseClickEvent)
      ?.(
        createCursorEvent(MouseClickEvent, element),
      )

    expect(selection.select).toHaveBeenCalledWith(node)
    expect(selection.add).not.toHaveBeenCalled()
    expect(selection.crossAddTo).not.toHaveBeenCalled()
  })

  it('useSelectionEffect delegates shift-click to crossAddTo', () => {
    const subscribeMap = new Map<any, (event: MouseClickEvent) => void>()
    const selection = {
      add: vi.fn(),
      crossAddTo: vi.fn(),
      has: vi.fn(() => false),
      remove: vi.fn(),
      select: vi.fn(),
      selected: ['node-0'],
    }
    const node = { id: 'node-2' }
    const engine = {
      cursor: { status: CursorStatus.Normal },
      keyboard: {
        isKeyDown: vi.fn((code: string) => code === KeyCode.Shift),
        requestClean: vi.fn(),
      },
      props: {
        nodeIdAttrName: 'data-node-id',
        nodeSelectionIdAttrName: 'data-helper-id',
        outlineNodeIdAttrName: 'data-outline-id',
      },
      subscribeTo: vi.fn((EventType, handler) => {
        subscribeMap.set(EventType, handler)
      }),
      workbench: {
        activeWorkspace: {
          operation: {
            selection,
            tree: {
              findById: vi.fn(() => node),
            },
          },
        },
      },
    } as any

    useSelectionEffect(engine)

    const element = document.createElement('div')
    element.setAttribute('data-node-id', 'node-2')
    document.body.appendChild(element)

    subscribeMap
      .get(MouseClickEvent)
      ?.(
        createCursorEvent(MouseClickEvent, element),
      )

    expect(selection.crossAddTo).toHaveBeenCalledWith(node)
    expect(selection.select).not.toHaveBeenCalled()
    expect(selection.add).not.toHaveBeenCalled()
  })

  it('engine mount attaches to window by default', () => {
    const engine = new Engine({})
    const attachSpy = vi.spyOn(engine, 'attachEvents')

    engine.mount()

    expect(attachSpy).toHaveBeenCalledWith(window)
  })

  it('viewport attaches events automatically by default', () => {
    const attachSpy = vi
      .spyOn(Viewport.prototype, 'attachEvents')
      .mockImplementation(() => {})

    const viewport = new Viewport({
      engine: {} as any,
      workspace: {} as any,
      viewportElement: document.createElement('div'),
      contentWindow: window,
      nodeIdAttrName: 'data-node-id',
    })

    expect(viewport).toBeInstanceOf(Viewport)
    expect(attachSpy).toHaveBeenCalledTimes(1)
  })

  it('viewport hit testing uses the viewport document instead of the global document', () => {
    vi
      .spyOn(Viewport.prototype, 'attachEvents')
      .mockImplementation(() => {})

    const viewportElement = document.createElement('div')
    document.body.appendChild(viewportElement)
    vi.spyOn(viewportElement, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      toJSON: () => ({}),
    })

    const viewport = new Viewport({
      engine: {} as any,
      workspace: {} as any,
      viewportElement,
      contentWindow: window,
      nodeIdAttrName: 'data-node-id',
    })
    const globalElementFromPointSpy = vi
      .spyOn(document, 'elementFromPoint')
      .mockReturnValue(null)
    const viewportElementFromPointSpy = vi
      .spyOn(viewport, 'elementFromPoint')
      .mockReturnValue(viewportElement)

    expect(viewport.isPointInViewport({ x: 10, y: 10 })).toBe(true)
    expect(viewportElementFromPointSpy).toHaveBeenCalledWith({ x: 10, y: 10 })
    expect(globalElementFromPointSpy).not.toHaveBeenCalled()
  })

  it('workbench removeWorkspace detaches viewport and outline events', () => {
    const engine = new Engine({})
    const workspace = engine.workbench.ensureWorkspace({ id: 'workspace-cleanup' })
    const viewportDetachSpy = vi
      .spyOn(workspace.viewport, 'detachEvents')
      .mockImplementation(() => {})
    const outlineDetachSpy = vi
      .spyOn(workspace.outline, 'detachEvents')
      .mockImplementation(() => {})

    engine.workbench.removeWorkspace('workspace-cleanup')

    expect(viewportDetachSpy).toHaveBeenCalledTimes(1)
    expect(outlineDetachSpy).toHaveBeenCalledTimes(1)
  })
})
