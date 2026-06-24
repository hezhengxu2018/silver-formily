import type { Engine } from '../models/Engine'
import { EventDriver } from '@silver-formily/designer-shared'

const GlobalState: {
  dragging: boolean
  onMouseDownAt: number | null
  startEvent: MouseEvent | DragEvent | null
  moveEvent: MouseEvent | DragEvent | null
} = {
  dragging: false,
  onMouseDownAt: null,
  startEvent: null,
  moveEvent: null,
}

export class DragDropDriver extends EventDriver<Engine> {
  onMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (e.button !== 0 || e.ctrlKey || e.metaKey) {
      return
    }
    if (
      target?.isContentEditable
      || target?.contentEditable === 'true'
    ) {
      return
    }
    if (target?.closest?.('.monaco-editor'))
      return
    GlobalState.startEvent = e
    GlobalState.dragging = false
    GlobalState.onMouseDownAt = Date.now()
    this.batchAddEventListener('mouseup', this.onMouseUp)
    this.batchAddEventListener('dragend', this.onMouseUp)
    this.batchAddEventListener('dragstart', this.onStartDrag)
    this.batchAddEventListener('mousemove', this.onDistanceChange)
  }

  onMouseUp = (e: MouseEvent) => {
    if (GlobalState.dragging) {
      this.engine.drag.stop(
        {
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          target: e.target,
          view: e.view,
        },
        this.context,
      )
    }
    this.batchRemoveEventListener(
      'contextmenu',
      this.onContextMenuWhileDragging,
      true,
    )
    this.batchRemoveEventListener('mouseup', this.onMouseUp)
    this.batchRemoveEventListener('mousedown', this.onMouseDown, true)
    this.batchRemoveEventListener('dragover', this.onMouseMove)
    this.batchRemoveEventListener('mousemove', this.onMouseMove)
    this.batchRemoveEventListener('mousemove', this.onDistanceChange)
    GlobalState.dragging = false
    GlobalState.moveEvent = null
    GlobalState.startEvent = null
    GlobalState.onMouseDownAt = null
  }

  onMouseMove = (e: MouseEvent | DragEvent) => {
    if (
      e.clientX === GlobalState.moveEvent?.clientX
      && e.clientY === GlobalState.moveEvent?.clientY
    ) {
      return
    }
    this.engine.drag.move(
      {
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
      },
      this.context,
    )
    GlobalState.moveEvent = e
  }

  onContextMenuWhileDragging = (e: MouseEvent) => {
    e.preventDefault()
  }

  onStartDrag = (e: MouseEvent | DragEvent) => {
    if (GlobalState.dragging)
      return
    GlobalState.startEvent = GlobalState.startEvent || e
    this.batchAddEventListener('dragover', this.onMouseMove)
    this.batchAddEventListener('mousemove', this.onMouseMove)
    this.batchAddEventListener(
      'contextmenu',
      this.onContextMenuWhileDragging,
      true,
    )
    this.engine.drag.start(
      {
        clientX: GlobalState.startEvent.clientX,
        clientY: GlobalState.startEvent.clientY,
        pageX: GlobalState.startEvent.pageX,
        pageY: GlobalState.startEvent.pageY,
        target: GlobalState.startEvent.target,
        view: GlobalState.startEvent.view,
      },
      this.context,
    )
    GlobalState.dragging = true
  }

  onDistanceChange = (e: MouseEvent) => {
    if (!GlobalState.startEvent || GlobalState.onMouseDownAt === null)
      return
    const distance = Math.sqrt(
      (e.pageX - GlobalState.startEvent.pageX) ** 2
      + (e.pageY - GlobalState.startEvent.pageY) ** 2,
    )
    const timeDelta = Date.now() - GlobalState.onMouseDownAt
    if (timeDelta > 10 && e !== GlobalState.startEvent && distance > 4) {
      this.batchRemoveEventListener('mousemove', this.onDistanceChange)
      this.onStartDrag(e)
    }
  }

  attach() {
    this.batchAddEventListener('mousedown', this.onMouseDown, true)
  }

  detach() {
    GlobalState.dragging = false
    GlobalState.moveEvent = null
    GlobalState.onMouseDownAt = null
    GlobalState.startEvent = null
    this.batchRemoveEventListener('mousedown', this.onMouseDown, true)
    this.batchRemoveEventListener('dragstart', this.onStartDrag)
    this.batchRemoveEventListener('dragend', this.onMouseUp)
    this.batchRemoveEventListener('dragover', this.onMouseMove)
    this.batchRemoveEventListener('mouseup', this.onMouseUp)
    this.batchRemoveEventListener('mousemove', this.onMouseMove)
    this.batchRemoveEventListener('mousemove', this.onDistanceChange)
    this.batchRemoveEventListener(
      'contextmenu',
      this.onContextMenuWhileDragging,
      true,
    )
  }
}
