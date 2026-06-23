import { afterEach, describe, expect, it, vi } from 'vitest'
import { DragDropDriver } from '../drivers/DragDropDriver'
import { MouseMoveDriver } from '../drivers/MouseMoveDriver'
import { useContentEditableEffect } from '../effects/useContentEditableEffect'
import { MouseClickEvent, MouseDoubleClickEvent } from '../events'

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

  it('dragDropDriver clears captured mousedown listener with capture=true on mouseup', () => {
    const driver = new DragDropDriver({} as any)
    const removeSpy = vi.spyOn(driver, 'batchRemoveEventListener')

    driver.onMouseUp(new MouseEvent('mouseup', { view: window }))

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

    expect(removeSpy).toHaveBeenCalledWith('paste', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
