import type {
  IPoint,
  IRect,

  Rect,
} from '@silver-formily/designer-shared'
import type { IViewportData } from '../internals/ViewportDOMAdapter'
import type { Engine } from './Engine'
import type { TreeNode } from './TreeNode'
import type { Workspace } from './Workspace'
import {
  calcBoundingRect,
  calcElementLayout,
  cancelIdle,
  isPointInRect,
  isRectInRect,
  requestIdle,
} from '@silver-formily/designer-shared'
import { action, define, observable } from '@silver-formily/reactive'
import { ViewportDOMAdapter } from '../internals/ViewportDOMAdapter'

export type { IViewportData } from '../internals/ViewportDOMAdapter'

export interface IViewportProps {
  engine: Engine
  workspace: Workspace
  viewportElement: HTMLElement
  contentWindow: Window
  nodeIdAttrName: string
  moveSensitive?: boolean
  moveInsertionType?: IViewportMoveInsertionType
}

export type IViewportMoveInsertionType = 'all' | 'inline' | 'block'

/**
 * 视口模型
 */
export class Viewport {
  workspace: Workspace

  engine: Engine

  contentWindow: Window

  viewportElement: HTMLElement

  dragStartSnapshot: IViewportData

  scrollX = 0

  scrollY = 0

  width = 0

  height = 0

  mounted = false

  attachRequest: number

  nodeIdAttrName: string

  moveSensitive: boolean

  moveInsertionType: IViewportMoveInsertionType

  nodeElementsStore: Record<string, HTMLElement[]> = {}

  dom: ViewportDOMAdapter

  constructor(props: IViewportProps) {
    this.workspace = props.workspace
    this.engine = props.engine
    this.moveSensitive = props.moveSensitive ?? false
    this.moveInsertionType = props.moveInsertionType ?? 'all'
    this.viewportElement = props.viewportElement
    this.contentWindow = props.contentWindow
    this.nodeIdAttrName = props.nodeIdAttrName
    this.dom = new ViewportDOMAdapter({
      getContentWindow: () => this.contentWindow,
      getViewportElement: () => this.viewportElement,
    })
    this.digestViewport()
    this.makeObservable()
    this.attachEvents()
  }

  get isScrollLeft() {
    return this.scrollX === 0
  }

  get isScrollTop() {
    return this.scrollY === 0
  }

  get isScrollRight() {
    return this.dom.isScrollRight(this)
  }

  get isScrollBottom() {
    return this.dom.isScrollBottom(this)
  }

  get viewportRoot() {
    return this.dom.viewportRoot
  }

  get isMaster() {
    return this.dom.isMaster
  }

  get isIframe() {
    return this.dom.isIframe
  }

  get scrollContainer() {
    return this.dom.scrollContainer
  }

  get rect() {
    return this.dom.rect
  }

  get innerRect() {
    return this.dom.innerRect
  }

  get offsetX() {
    return this.dom.offsetX
  }

  get offsetY() {
    return this.dom.offsetY
  }

  get scale() {
    return this.dom.scale
  }

  get dragScrollXDelta() {
    return this.scrollX - this.dragStartSnapshot.scrollX
  }

  get dragScrollYDelta() {
    return this.scrollY - this.dragStartSnapshot.scrollY
  }

  cacheElements() {
    this.nodeElementsStore = this.dom.collectNodeElements(this.nodeIdAttrName)
  }

  clearCache() {
    this.nodeElementsStore = {}
  }

  getCurrentData() {
    return this.dom.getCurrentData()
  }

  takeDragStartSnapshot() {
    this.dragStartSnapshot = this.getCurrentData()
  }

  digestViewport() {
    Object.assign(this, this.getCurrentData())
  }

  elementFromPoint(point: IPoint) {
    return this.dom.elementFromPoint(point)
  }

  matchViewport(
    target: HTMLElement | Element | Window | Document | EventTarget,
  ) {
    return this.dom.matchViewport(target)
  }

  attachEvents() {
    const engine = this.engine
    cancelIdle(this.attachRequest)
    this.attachRequest = requestIdle(() => {
      if (!engine)
        return
      this.dom.getAttachTargets().forEach(({ container, contentWindow }) => {
        this.workspace.attachEvents(container, contentWindow)
      })
    })
  }

  detachEvents() {
    cancelIdle(this.attachRequest)
    this.dom.getDetachContainers().forEach((container) => {
      this.workspace.detachEvents(container)
    })
  }

  onMount(element: HTMLElement, contentWindow: Window) {
    this.mounted = true
    this.viewportElement = element
    this.contentWindow = contentWindow
    this.attachEvents()
    this.digestViewport()
  }

  onUnmount() {
    this.mounted = false
    this.detachEvents()
  }

  dispose() {
    this.detachEvents()
    this.clearCache()
    this.dragStartSnapshot = null
    this.mounted = false
  }

  isPointInViewport(point: IPoint, sensitive?: boolean) {
    if (!this.rect)
      return false
    if (!this.containsElement(this.elementFromPoint(point))) {
      return false
    }
    return isPointInRect(point, this.rect, sensitive)
  }

  isRectInViewport(rect: IRect) {
    if (!this.rect)
      return false
    if (!this.containsElement(this.elementFromPoint(rect))) {
      return false
    }
    return isRectInRect(rect, this.rect)
  }

  isPointInViewportArea(point: IPoint, sensitive?: boolean) {
    if (!this.rect)
      return false
    return isPointInRect(point, this.rect, sensitive)
  }

  isOffsetPointInViewport(point: IPoint, sensitive?: boolean) {
    if (!this.innerRect)
      return false
    if (!this.containsElement(this.elementFromPoint(point)))
      return false
    return isPointInRect(point, this.innerRect, sensitive)
  }

  isOffsetRectInViewport(rect: IRect) {
    if (!this.innerRect)
      return false
    if (!this.containsElement(this.elementFromPoint(rect))) {
      return false
    }
    return isRectInRect(rect, this.innerRect)
  }

  makeObservable() {
    define(this, {
      scrollX: observable.ref,
      scrollY: observable.ref,
      width: observable.ref,
      height: observable.ref,
      digestViewport: action,
      viewportElement: observable.ref,
      contentWindow: observable.ref,
    })
  }

  findElementById(id: string): HTMLElement {
    return this.dom.findElementById(
      this.nodeIdAttrName,
      id,
      this.nodeElementsStore,
    )
  }

  findElementsById(id: string): HTMLElement[] {
    return this.dom.findElementsById(
      this.nodeIdAttrName,
      id,
      this.nodeElementsStore,
    )
  }

  containsElement(element: HTMLElement | Element | EventTarget) {
    return this.dom.containsElement(element)
  }

  getOffsetPoint(topPoint: IPoint) {
    return this.dom.getOffsetPoint(topPoint)
  }

  // 相对于页面
  getElementRect(element: HTMLElement | Element) {
    return this.dom.getElementRect(element)
  }

  // 相对于页面
  getElementRectById(id: string) {
    return this.dom.getElementRectById(
      this.nodeIdAttrName,
      id,
      this.nodeElementsStore,
    )
  }

  // 相对于视口
  getElementOffsetRect(element: HTMLElement | Element) {
    return this.dom.getElementOffsetRect(element)
  }

  // 相对于视口
  getElementOffsetRectById(id: string) {
    return this.dom.getElementOffsetRectById(
      this.nodeIdAttrName,
      id,
      this.nodeElementsStore,
    )
  }

  getValidNodeElement(node: TreeNode): Element {
    const getNodeElement = (node: TreeNode) => {
      if (!node)
        return
      const ele = this.findElementById(node.id)
      if (ele) {
        return ele
      }
      else {
        return getNodeElement(node.parent)
      }
    }
    return getNodeElement(node)
  }

  getChildrenRect(node: TreeNode): Rect {
    if (!node?.children?.length)
      return
    return calcBoundingRect(
      node.children.reduce((buf, child) => {
        const rect = this.getValidNodeRect(child)
        if (rect) {
          return buf.concat(rect)
        }
        return buf
      }, []),
    )
  }

  getChildrenOffsetRect(node: TreeNode): Rect {
    if (!node?.children?.length)
      return

    return calcBoundingRect(
      node.children.reduce((buf, child) => {
        const rect = this.getValidNodeOffsetRect(child)
        if (rect) {
          return buf.concat(rect)
        }
        return buf
      }, []),
    )
  }

  getValidNodeRect(node: TreeNode): Rect {
    if (!node)
      return
    const rect = this.getElementRectById(node.id)
    if (node && node === node.root && node.isInOperation) {
      if (!rect)
        return this.rect
      return calcBoundingRect([this.rect, rect])
    }

    if (rect) {
      return rect
    }
    else {
      return this.getChildrenRect(node)
    }
  }

  getValidNodeOffsetRect(node: TreeNode): Rect {
    if (!node)
      return
    const rect = this.getElementOffsetRectById(node.id)
    if (node && node === node.root && node.isInOperation) {
      if (!rect)
        return this.innerRect
      return calcBoundingRect([this.innerRect, rect])
    }
    if (rect) {
      return rect
    }
    else {
      return this.getChildrenOffsetRect(node)
    }
  }

  getValidNodeLayout(node: TreeNode) {
    if (!node)
      return 'vertical'
    if (node.parent?.designerProps?.inlineChildrenLayout)
      return 'horizontal'
    return calcElementLayout(this.findElementById(node.id))
  }
}
