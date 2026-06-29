import type {
  ILineSegment,
  IPoint,
  Rect,
} from '@silver-formily/designer-shared'
import type { TransformHelper } from './TransformHelper'
import type { TreeNode } from './TreeNode'
import {
  calcRectOfAxisLineSegment,
} from '@silver-formily/designer-shared'
import {
  calcSnapEdge,
  calcSnapLineResize,
  calcSnapLineTranslate,
  TRANSFORM_HELPER_THRESHOLD,
} from '../internals/TransformGeometry'

export type ISnapLineType = 'ruler' | 'space-block' | 'normal'

export type ISnapLine = ILineSegment & {
  type?: ISnapLineType
  distance?: number
  id?: string
  refer?: TreeNode
}

export class SnapLine {
  _id: string
  type: ISnapLineType
  distance: number
  refer: TreeNode
  start: IPoint
  end: IPoint
  helper: TransformHelper
  constructor(helper: TransformHelper, line: ISnapLine) {
    this.helper = helper
    this.type = line.type || 'normal'
    this._id = line.id
    this.refer = line.refer
    this.start = { ...line.start }
    this.end = { ...line.end }
    this.distance = line.distance
  }

  get id() {
    return (
      this._id ?? `${this.start.x}-${this.start.y}-${this.end.x}-${this.end.y}`
    )
  }

  get direction() {
    if (this.start?.x === this.end?.x)
      return 'v'
    return 'h'
  }

  get closest() {
    return this.distance < TRANSFORM_HELPER_THRESHOLD
  }

  get rect() {
    return calcRectOfAxisLineSegment(this)
  }

  translate(node: TreeNode, translate: IPoint) {
    if (!node || !node?.parent)
      return
    const parent = node.parent
    const dragNodeRect = node.getValidElementOffsetRect()
    const parentRect = parent.getValidElementOffsetRect()
    Object.assign(
      translate,
      calcSnapLineTranslate(this, translate, dragNodeRect, parentRect),
    )
  }

  resize(node: TreeNode, rect: Rect) {
    if (!node || !node?.parent)
      return
    const parent = node.parent
    const dragNodeRect = node.getValidElementOffsetRect()
    const parentRect = parent.getValidElementOffsetRect()
    const cursorRect = this.helper.cursorDragNodesRect
    const nextRect = calcSnapLineResize({
      line: this,
      direction: this.helper.direction,
      rect,
      cursorRect,
      dragNodeRect,
      parentRect,
      threshold: TRANSFORM_HELPER_THRESHOLD,
    })
    if (nextRect)
      Object.assign(rect, nextRect)
  }

  snapEdge(rect: Rect) {
    return calcSnapEdge(this, rect, TRANSFORM_HELPER_THRESHOLD)
  }
}
