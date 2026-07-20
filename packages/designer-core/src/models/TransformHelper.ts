import type {
  IPoint,
  IRect,
  ISize,
  Rect,
} from '@silver-formily/designer-shared'
import type {
  ResizeDirection,
  TransformHelperType,
} from '../internals/TransformGeometry'
import type { Operation } from './Operation'
import type { ISnapLine } from './SnapLine'
import type { AroundSpaceBlock } from './SpaceBlock'
import {
  calcBoundingRect,
  calcDistanceOfSnapLineToEdges,
  calcEdgeLinesOfRect,
  calcElementTranslate,
  isLineSegment,
  Point,
} from '@silver-formily/designer-shared'
import { action, define, observable } from '@silver-formily/reactive'
import {
  calcAroundSnapLines,
  calcAroundSpaceBlocks,
  calcBaseResize,
  calcBaseTranslate,
  calcCursorDragNodesRect,
  calcRulerSnapLines,
  TRANSFORM_HELPER_THRESHOLD,
} from '../internals/TransformGeometry'
import { CursorDragType } from './Cursor'
import { SnapLine } from './SnapLine'
import { SpaceBlock } from './SpaceBlock'
import { TreeNode } from './TreeNode'

export interface ITransformHelperProps {
  operation: Operation
}

export type {
  ResizeDirection,
  TransformHelperType,
} from '../internals/TransformGeometry'

export interface ITransformHelperDragStartProps {
  type: TransformHelperType
  direction?: ResizeDirection
  dragNodes: TreeNode[]
}

export class TransformHelper {
  operation: Operation

  type: TransformHelperType

  direction: ResizeDirection

  dragNodes: TreeNode[] = []

  rulerSnapLines: SnapLine[] = []

  aroundSnapLines: SnapLine[] = []

  aroundSpaceBlocks: AroundSpaceBlock = null

  viewportRectsStore: Record<string, Rect> = {}

  dragStartTranslateStore: Record<string, IPoint> = {}

  dragStartSizeStore: Record<string, ISize> = {}

  draggingNodesRect: Rect

  cacheDragNodesReact: Rect

  dragStartNodesRect: IRect = null

  snapping = false

  dragging = false

  snapped = false

  constructor(props: ITransformHelperProps) {
    this.operation = props.operation
    this.makeObservable()
  }

  get tree() {
    return this.operation.tree
  }

  get cursor() {
    return this.operation.engine.cursor
  }

  get viewport() {
    return this.operation.workspace.viewport
  }

  get deltaX() {
    return this.cursor.dragStartToCurrentDelta.clientX
  }

  get deltaY() {
    return this.cursor.dragStartToCurrentDelta.clientY
  }

  get cursorPosition() {
    const position = this.cursor.position
    return this.operation.workspace.viewport.getOffsetPoint(
      new Point(position.clientX, position.clientY),
    )
  }

  get cursorDragNodesRect() {
    return calcCursorDragNodesRect({
      type: this.type,
      direction: this.direction,
      cursorPosition: this.cursorPosition,
      dragStartCursorOffset: this.dragStartCursorOffset,
      dragNodesRect: this.dragNodesRect,
      dragStartNodesRect: this.dragStartNodesRect,
      deltaX: this.deltaX,
      deltaY: this.deltaY,
    })
  }

  get cursorDragNodesEdgeLines() {
    return calcEdgeLinesOfRect(this.cursorDragNodesRect)
  }

  get dragNodesRect() {
    if (this.draggingNodesRect)
      return this.draggingNodesRect
    return calcBoundingRect(
      this.dragNodes.map(node => node.getValidElementOffsetRect()),
    )
  }

  get dragNodesEdgeLines() {
    return calcEdgeLinesOfRect(this.dragNodesRect)
  }

  get cursorOffset() {
    return new Point(
      this.cursorPosition.x - this.dragNodesRect.x,
      this.cursorPosition.y - this.dragNodesRect.y,
    )
  }

  get dragStartCursor() {
    const position = this.operation.engine.cursor.dragStartPosition
    return this.operation.workspace.viewport.getOffsetPoint(
      new Point(position.clientX, position.clientY),
    )
  }

  get dragStartCursorOffset() {
    return new Point(
      this.dragStartCursor.x - this.dragStartNodesRect.x,
      this.dragStartCursor.y - this.dragStartNodesRect.y,
    )
  }

  get closestSnapLines() {
    if (!this.dragging)
      return []
    const results: SnapLine[] = []
    const cursorDragNodesEdgeLines = this.cursorDragNodesEdgeLines
    this.thresholdSnapLines.forEach((line) => {
      const distance = calcDistanceOfSnapLineToEdges(
        line,
        cursorDragNodesEdgeLines,
      )
      if (distance < TransformHelper.threshold) {
        const existed = results.findIndex(
          l =>
            l.distance > distance
            && l.distance > 0
            && l.direction === line.direction,
        )
        if (existed > -1) {
          results.splice(existed, 1)
        }
        results.push(line)
      }
    })
    return results
  }

  get closestSpaceBlocks(): SpaceBlock[] {
    if (!this.dragging)
      return []
    const cursorDragNodesEdgeLines = this.cursorDragNodesEdgeLines
    return this.thresholdSpaceBlocks.filter((block) => {
      const line = block.snapLine
      if (!line)
        return false
      return (
        calcDistanceOfSnapLineToEdges(line, cursorDragNodesEdgeLines)
        < TransformHelper.threshold
      )
    })
  }

  get thresholdSnapLines(): SnapLine[] {
    if (!this.dragging)
      return []
    const lines: SnapLine[] = []
    this.aroundSnapLines.forEach((line) => {
      lines.push(line)
    })
    this.rulerSnapLines.forEach((line) => {
      if (line.closest) {
        lines.push(line)
      }
    })
    for (const type in this.aroundSpaceBlocks) {
      const block = this.aroundSpaceBlocks[type]
      const line = block.snapLine
      if (line) {
        lines.push(line)
      }
    }
    return lines
  }

  get thresholdSpaceBlocks(): SpaceBlock[] {
    const results = []
    if (!this.dragging)
      return []
    for (const type in this.aroundSpaceBlocks) {
      const block = this.aroundSpaceBlocks[type]
      if (!block.snapLine)
        return []
      if (block.snapLine.distance !== 0)
        return []
      if (block.isometrics.length) {
        results.push(block)
        results.push(...block.isometrics)
      }
    }
    return results
  }

  get measurerSpaceBlocks(): SpaceBlock[] {
    const results: SpaceBlock[] = []
    if (!this.dragging || !this.snapped)
      return []
    for (const type in this.aroundSpaceBlocks) {
      if (this.aroundSpaceBlocks[type])
        results.push(this.aroundSpaceBlocks[type])
    }
    return results
  }

  calcBaseTranslate(node: TreeNode) {
    const dragStartTranslate = this.dragStartTranslateStore[node.id] ?? {
      x: 0,
      y: 0,
    }
    return calcBaseTranslate(dragStartTranslate, this.deltaX, this.deltaY)
  }

  calcBaseResize(node: TreeNode) {
    const dragStartTranslate = this.dragStartTranslateStore[node.id] ?? {
      x: 0,
      y: 0,
    }
    const dragStartSize = this.dragStartSizeStore[node.id] ?? {
      width: 0,
      height: 0,
    }
    return calcBaseResize({
      direction: this.direction,
      dragStartTranslate,
      dragStartSize,
      deltaX: this.deltaX,
      deltaY: this.deltaY,
    })
  }

  calcDragStartStore(nodes: TreeNode[] = []) {
    this.dragStartNodesRect = this.dragNodesRect
    nodes.forEach((node) => {
      const element = node.getElement()
      const rect = node.getElementOffsetRect()
      this.dragStartTranslateStore[node.id] = calcElementTranslate(element)
      this.dragStartSizeStore[node.id] = {
        width: rect.width,
        height: rect.height,
      }
    })
  }

  calcRulerSnapLines(dragNodesRect: IRect): SnapLine[] {
    const results = calcRulerSnapLines(this.rulerSnapLines, dragNodesRect)
    return this.rulerSnapLines.map((line, index) => {
      line.distance = results[index].distance
      return line
    })
  }

  calcAroundSnapLines(dragNodesRect: Rect): SnapLine[] {
    return calcAroundSnapLines(dragNodesRect, this.getViewportNodeRects(), {
      threshold: TransformHelper.threshold,
      snapping: this.snapping,
      type: this.type,
    }).map(line => new SnapLine(this, line))
  }

  calcAroundSpaceBlocks(dragNodesRect: IRect): AroundSpaceBlock {
    const spaces = calcAroundSpaceBlocks(
      dragNodesRect,
      this.getViewportNodeRects(),
    )
    const results = {}
    for (const type in spaces) {
      results[type] = new SpaceBlock(this, spaces[type])
    }
    return results as AroundSpaceBlock
  }

  getViewportNodeRects() {
    const results: Array<{ refer: TreeNode, rect: Rect }> = []
    this.eachViewportNodes((refer, rect) => {
      if (refer && !this.dragNodes.includes(refer))
        results.push({ refer, rect })
    })
    return results
  }

  calcViewportNodes() {
    this.tree.eachTree((node) => {
      const topRect = node.getValidElementRect()
      const offsetRect = node.getValidElementOffsetRect()
      if (this.dragNodes.includes(node))
        return
      if (this.viewport.isRectInViewport(topRect)) {
        this.viewportRectsStore[node.id] = offsetRect
      }
    })
  }

  getNodeRect(node: TreeNode) {
    return this.viewportRectsStore[node.id]
  }

  eachViewportNodes(visitor: (node: TreeNode, rect: Rect) => void) {
    for (const id in this.viewportRectsStore) {
      visitor(this.tree.findById(id), this.viewportRectsStore[id])
    }
  }

  translate(node: TreeNode, handler: (translate: IPoint) => void) {
    if (!this.dragging)
      return
    const translate = this.calcBaseTranslate(node)
    this.snapped = false
    this.snapping = false
    for (const line of this.closestSnapLines) {
      line.translate(node, translate)
      this.snapping = true
      this.snapped = true
    }
    handler(translate)
    if (this.snapping) {
      this.dragMove()
      this.snapping = false
    }
  }

  resize(node: TreeNode, handler: (resize: IRect) => void) {
    if (!this.dragging)
      return
    const rect = this.calcBaseResize(node)
    this.snapping = false
    this.snapping = false
    for (const line of this.closestSnapLines) {
      line.resize(node, rect)
      this.snapping = true
      this.snapped = true
    }
    handler(rect)
    if (this.snapping) {
      this.dragMove()
      this.snapping = false
    }
  }

  // rotate(node: TreeNode, handler: (rotate: number) => void) {}

  // scale(node: TreeNode, handler: (scale: number) => void) {}

  // round(node: TreeNode, handler: (round: number) => void) {}

  findRulerSnapLine(id: string) {
    return this.rulerSnapLines.find(item => item.id === id)
  }

  addRulerSnapLine(line: ISnapLine) {
    if (!isLineSegment(line))
      return
    if (!this.findRulerSnapLine(line.id)) {
      this.rulerSnapLines.push(new SnapLine(this, { ...line, type: 'ruler' }))
    }
  }

  removeRulerSnapLine(id: string) {
    const matchedLineIndex = this.rulerSnapLines.findIndex(
      item => item.id === id,
    )
    if (matchedLineIndex > -1) {
      this.rulerSnapLines.splice(matchedLineIndex, 1)
    }
  }

  dragStart(props: ITransformHelperDragStartProps) {
    const dragNodes = props?.dragNodes
    const type = props?.type
    const direction = props?.direction
    if (type === 'resize') {
      const nodes = TreeNode.filterResizable(dragNodes)
      if (nodes.length) {
        this.dragging = true
        this.type = type
        this.direction = direction
        this.dragNodes = nodes
        this.calcDragStartStore(nodes)
        this.cursor.setDragType(CursorDragType.Resize)
      }
    }
    else if (type === 'translate') {
      const nodes = TreeNode.filterTranslatable(dragNodes)
      if (nodes.length) {
        this.dragging = true
        this.type = type
        this.direction = direction
        this.dragNodes = nodes
        this.calcDragStartStore(nodes)
        this.cursor.setDragType(CursorDragType.Translate)
      }
    }
    else if (type === 'rotate') {
      const nodes = TreeNode.filterRotatable(dragNodes)
      if (nodes.length) {
        this.dragging = true
        this.type = type
        this.dragNodes = nodes
        this.calcDragStartStore(nodes)
        this.cursor.setDragType(CursorDragType.Rotate)
      }
    }
    else if (type === 'scale') {
      const nodes = TreeNode.filterScalable(dragNodes)
      if (nodes.length) {
        this.dragging = true
        this.type = type
        this.dragNodes = nodes
        this.calcDragStartStore(nodes)
        this.cursor.setDragType(CursorDragType.Scale)
      }
    }
    else if (type === 'round') {
      const nodes = TreeNode.filterRoundable(dragNodes)
      if (nodes.length) {
        this.dragging = true
        this.type = type
        this.dragNodes = nodes
        this.calcDragStartStore(nodes)
        this.cursor.setDragType(CursorDragType.Round)
      }
    }
    if (this.dragging) {
      this.calcViewportNodes()
    }
  }

  dragMove() {
    if (!this.dragging)
      return
    this.draggingNodesRect = null
    this.draggingNodesRect = this.dragNodesRect
    this.rulerSnapLines = this.calcRulerSnapLines(this.dragNodesRect)
    this.aroundSnapLines = this.calcAroundSnapLines(this.dragNodesRect)
    this.aroundSpaceBlocks = this.calcAroundSpaceBlocks(this.dragNodesRect)
  }

  dragEnd() {
    this.dragging = false
    this.viewportRectsStore = {}
    this.dragStartTranslateStore = {}
    this.aroundSnapLines = []
    this.draggingNodesRect = null
    this.aroundSpaceBlocks = null
    this.dragStartNodesRect = null
    this.dragNodes = []
    this.cursor.setDragType(CursorDragType.Move)
  }

  makeObservable() {
    define(this, {
      snapped: observable.ref,
      dragging: observable.ref,
      snapping: observable.ref,
      dragNodes: observable.ref,
      aroundSnapLines: observable.ref,
      aroundSpaceBlocks: observable.ref,
      rulerSnapLines: observable.shallow,
      closestSnapLines: observable.computed,
      thresholdSnapLines: observable.computed,
      thresholdSpaceBlocks: observable.computed,
      measurerSpaceBlocks: observable.computed,
      cursor: observable.computed,
      cursorPosition: observable.computed,
      cursorOffset: observable.computed,
      dragStartCursor: observable.computed,
      translate: action,
      dragStart: action,
      dragMove: action,
      dragEnd: action,
    })
  }

  static threshold = TRANSFORM_HELPER_THRESHOLD
}
