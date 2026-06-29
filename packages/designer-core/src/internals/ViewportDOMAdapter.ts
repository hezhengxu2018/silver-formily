import type {
  IPoint,
  IRect,
} from '@silver-formily/designer-shared'
import {
  calcBoundingRect,
  isHTMLElement,
  Rect,
} from '@silver-formily/designer-shared'

const globalWindow = globalThis as unknown as Window

export interface IViewportDOMAdapterProps {
  getContentWindow: () => Window
  getViewportElement: () => HTMLElement
}

export interface IViewportData {
  scrollX?: number
  scrollY?: number
  width?: number
  height?: number
}

export class ViewportDOMAdapter {
  private getContentWindow: () => Window

  private getViewportElement: () => HTMLElement

  constructor(props: IViewportDOMAdapterProps) {
    this.getContentWindow = props.getContentWindow
    this.getViewportElement = props.getViewportElement
  }

  get contentWindow() {
    return this.getContentWindow()
  }

  get viewportElement() {
    return this.getViewportElement()
  }

  get viewportRoot() {
    return this.isIframe
      ? this.contentWindow?.document?.body
      : this.viewportElement
  }

  get isMaster() {
    return this.contentWindow === globalWindow
  }

  get isIframe() {
    return !!this.contentWindow?.frameElement && !this.isMaster
  }

  get scrollContainer() {
    return this.isIframe ? this.contentWindow : this.viewportElement
  }

  get rect() {
    return this.viewportElement?.getBoundingClientRect()
  }

  get innerRect() {
    const rect = this.rect
    return new Rect(0, 0, rect?.width, rect?.height)
  }

  get offsetX() {
    return this.rect?.x || 0
  }

  get offsetY() {
    return this.rect?.y || 0
  }

  get scale() {
    if (!this.viewportElement)
      return 1
    const clientRect = this.viewportElement.getBoundingClientRect()
    const offsetWidth = this.viewportElement.offsetWidth
    if (!clientRect.width || !offsetWidth)
      return 1
    return Math.round(clientRect.width / offsetWidth)
  }

  isScrollRight(data: IViewportData) {
    if (this.isIframe) {
      return (
        data.width + this.contentWindow.scrollX
        >= this.contentWindow?.document?.body?.scrollWidth
      )
    }
    if (this.viewportElement) {
      return (
        this.viewportElement.offsetWidth + data.scrollX
        >= this.viewportElement.scrollWidth
      )
    }
  }

  isScrollBottom(data: IViewportData) {
    if (this.isIframe) {
      if (!this.contentWindow?.document?.body)
        return false
      return (
        data.height + this.contentWindow.scrollY
        >= this.contentWindow.document.body.scrollHeight
      )
    }
    if (this.viewportElement) {
      return (
        this.viewportElement.offsetHeight + this.viewportElement.scrollTop
        >= this.viewportElement.scrollHeight
      )
    }
  }

  getCurrentData() {
    const data: IViewportData = {}
    if (this.isIframe) {
      data.scrollX = this.contentWindow?.scrollX || 0
      data.scrollY = this.contentWindow?.scrollY || 0
      data.width = this.contentWindow?.innerWidth || 0
      data.height = this.contentWindow?.innerHeight || 0
    }
    else if (this.viewportElement) {
      data.scrollX = this.viewportElement?.scrollLeft || 0
      data.scrollY = this.viewportElement?.scrollTop || 0
      data.width = this.viewportElement?.clientWidth || 0
      data.height = this.viewportElement?.clientHeight || 0
    }
    return data
  }

  elementFromPoint(point: IPoint) {
    return this.contentWindow?.document?.elementFromPoint(point.x, point.y)
  }

  matchViewport(
    target: HTMLElement | Element | Window | Document | EventTarget,
  ) {
    if (this.isIframe) {
      return (
        target === this.viewportElement
        || target === this.contentWindow
        || target === this.contentWindow?.document
      )
    }
    return target === this.viewportElement
  }

  getAttachTargets() {
    if (this.isIframe) {
      return [
        {
          container: this.contentWindow,
          contentWindow: this.contentWindow,
        },
      ]
    }
    if (isHTMLElement(this.viewportElement)) {
      return [
        {
          container: this.viewportElement,
          contentWindow: this.contentWindow,
        },
      ]
    }
    return []
  }

  getDetachContainers() {
    if (this.isIframe) {
      return [this.contentWindow, this.viewportElement]
    }
    if (this.viewportElement)
      return [this.viewportElement]
    return []
  }

  findElementById(
    nodeIdAttrName: string,
    id: string,
    store: Record<string, HTMLElement[]>,
  ): HTMLElement {
    if (!id)
      return
    if (store[id])
      return store[id][0]
    return this.viewportRoot?.querySelector(
      `*[${nodeIdAttrName}='${id}']`,
    ) as HTMLElement
  }

  findElementsById(
    nodeIdAttrName: string,
    id: string,
    store: Record<string, HTMLElement[]>,
  ): HTMLElement[] {
    if (!id)
      return []
    if (store[id])
      return store[id]
    return Array.from(
      this.viewportRoot?.querySelectorAll(`*[${nodeIdAttrName}='${id}']`) ?? [],
    )
  }

  collectNodeElements(nodeIdAttrName: string) {
    const store: Record<string, HTMLElement[]> = {}
    this.viewportRoot
      ?.querySelectorAll(`*[${nodeIdAttrName}]`)
      .forEach((element: HTMLElement) => {
        const id = element.getAttribute(nodeIdAttrName)
        store[id] = store[id] || []
        store[id].push(element)
      })
    return store
  }

  containsElement(element: HTMLElement | Element | EventTarget) {
    const root: Element | HTMLDocument = this.viewportElement
    if (root === element)
      return true
    return root?.contains(element as any)
  }

  getOffsetPoint(topPoint: IPoint) {
    const data = this.getCurrentData()
    return {
      x: topPoint.x - this.offsetX + data.scrollX,
      y: topPoint.y - this.offsetY + data.scrollY,
    }
  }

  getElementRect(element: HTMLElement | Element) {
    const rect = element.getBoundingClientRect()
    const htmlElement = element as HTMLElement
    const offsetWidth = htmlElement.offsetWidth
      ? htmlElement.offsetWidth
      : rect.width
    const offsetHeight = htmlElement.offsetHeight
      ? htmlElement.offsetHeight
      : rect.height
    return new Rect(
      rect.x,
      rect.y,
      this.scale !== 1 ? offsetWidth : rect.width,
      this.scale !== 1 ? offsetHeight : rect.height,
    )
  }

  getElementRectById(
    nodeIdAttrName: string,
    id: string,
    store: Record<string, HTMLElement[]>,
  ) {
    const elements = this.findElementsById(nodeIdAttrName, id, store)
    const rect = calcBoundingRect(
      elements.map(element => this.getElementRect(element)),
    )
    if (!rect)
      return
    if (this.isIframe) {
      return new Rect(
        rect.x + this.offsetX,
        rect.y + this.offsetY,
        rect.width,
        rect.height,
      )
    }
    return new Rect(rect.x, rect.y, rect.width, rect.height)
  }

  getElementOffsetRect(element: HTMLElement | Element) {
    const elementRect = element.getBoundingClientRect()
    return this.getOffsetRectFromPageRect(elementRect)
  }

  getElementOffsetRectById(
    nodeIdAttrName: string,
    id: string,
    store: Record<string, HTMLElement[]>,
  ) {
    const elements = this.findElementsById(nodeIdAttrName, id, store)
    if (!elements.length)
      return
    const elementRect = calcBoundingRect(
      elements.map(element => this.getElementRect(element)),
    )
    if (elementRect)
      return this.getOffsetRectFromPageRect(elementRect)
  }

  private getOffsetRectFromPageRect(elementRect: IRect) {
    if (!elementRect)
      return
    if (this.isIframe) {
      return new Rect(
        elementRect.x + this.contentWindow.scrollX,
        elementRect.y + this.contentWindow.scrollY,
        elementRect.width,
        elementRect.height,
      )
    }
    return new Rect(
      (elementRect.x - this.offsetX + this.viewportElement.scrollLeft)
      / this.scale,
      (elementRect.y - this.offsetY + this.viewportElement.scrollTop)
      / this.scale,
      elementRect.width,
      elementRect.height,
    )
  }
}
