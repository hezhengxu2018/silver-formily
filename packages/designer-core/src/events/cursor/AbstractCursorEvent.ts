import type { IEngineContext } from '../../types'

export interface ICursorEventOriginData {
  clientX?: number
  clientY?: number
  pageX?: number
  pageY?: number
  target?: EventTarget | null
  view?: Window
  nodeId?: string
  sourceId?: string
  outlineId?: string
  handlerId?: string
  touchNodeId?: string
}

export interface ICursorEventData extends ICursorEventOriginData {
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  topClientX?: number
  topClientY?: number
  topPageX?: number
  topPageY?: number
}

export class AbstractCursorEvent {
  data: ICursorEventData

  context: IEngineContext

  constructor(data: ICursorEventOriginData) {
    const clientX = data?.clientX ?? 0
    const clientY = data?.clientY ?? 0
    this.data = {
      ...data,
      clientX,
      clientY,
      pageX: data?.pageX ?? clientX,
      pageY: data?.pageY ?? clientY,
      target: data?.target ?? null,
      view: data?.view ?? globalThis.window,
    }
    this.transformCoordinates()
  }

  transformCoordinates() {
    const currentWindow = globalThis.window
    const currentDocument = globalThis.document
    if (!this.data?.view || !currentWindow || !currentDocument) {
      this.data.topClientX = this.data.clientX
      this.data.topClientY = this.data.clientY
      this.data.topPageX = this.data.pageX
      this.data.topPageY = this.data.pageY
      return
    }
    const { frameElement } = this.data?.view || {}
    if (frameElement && this.data.view !== currentWindow) {
      const frameRect = frameElement.getBoundingClientRect()
      const frameWidth = (frameElement as HTMLElement).offsetWidth || frameRect.width
      const scale = frameRect.width / frameWidth
      this.data.topClientX = this.data.clientX * scale + frameRect.x
      this.data.topClientY = this.data.clientY * scale + frameRect.y
      this.data.topPageX
        = this.data.pageX + frameRect.x - this.data.view.scrollX
      this.data.topPageY
        = this.data.pageY + frameRect.y - this.data.view.scrollY
      const topElement = currentDocument.elementFromPoint(
        this.data.topPageX,
        this.data.topClientY,
      )
      if (topElement !== frameElement) {
        this.data.target = topElement
      }
    }
    else {
      this.data.topClientX = this.data.clientX
      this.data.topClientY = this.data.clientY
      this.data.topPageX = this.data.pageX
      this.data.topPageY = this.data.pageY
    }
  }
}
