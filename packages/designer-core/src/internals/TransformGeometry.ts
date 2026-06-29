import type {
  ILineSegment,
  IPoint,
  IRect,
  ISize,
} from '@silver-formily/designer-shared'
import type { ISpaceBlockType } from '../models/SpaceBlock'
import {
  calcClosestEdges,
  calcCombineSnapLineSegment,
  calcDistanceOfSnapLineToEdges,
  calcEdgeLinesOfRect,
  calcSpaceBlockOfRect,
  isEqualRect,
  Rect,
} from '@silver-formily/designer-shared'

export type TransformHelperType
  = | 'translate'
    | 'resize'
    | 'rotate'
    | 'scale'
    | 'round'

export type ResizeDirection
  = | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'center-top'
    | 'center-bottom'
    | 'right-top'
    | 'right-bottom'
    | 'right-center'
    | (string & {})

export interface IRectReference<T> {
  refer: T
  rect: IRect
}

export interface ICursorDragNodesRectProps {
  type: TransformHelperType
  direction?: ResizeDirection
  cursorPosition: IPoint
  dragStartCursorOffset: IPoint
  dragNodesRect: IRect
  dragStartNodesRect: IRect
  deltaX: number
  deltaY: number
}

export interface IBaseResizeProps {
  direction?: ResizeDirection
  dragStartTranslate: IPoint
  dragStartSize: ISize
  deltaX: number
  deltaY: number
}

export interface IAroundSnapLine<T> extends ILineSegment {
  refer?: T
  distance?: number
}

export interface IAroundSpaceBlock<T> {
  refer: T
  rect: Rect
  distance: number
  type: ISpaceBlockType
}

export type AroundSpaceBlockRecord<T> = Record<
  ISpaceBlockType,
  IAroundSpaceBlock<T>
>

export function calcCursorDragNodesRect({
  type,
  direction,
  cursorPosition,
  dragStartCursorOffset,
  dragNodesRect,
  dragStartNodesRect,
  deltaX,
  deltaY,
}: ICursorDragNodesRectProps) {
  if (type === 'translate') {
    return new Rect(
      cursorPosition.x - dragStartCursorOffset.x,
      cursorPosition.y - dragStartCursorOffset.y,
      dragNodesRect.width,
      dragNodesRect.height,
    )
  }
  if (type !== 'resize')
    return

  switch (direction) {
    case 'left-top':
      return new Rect(
        cursorPosition.x - dragStartCursorOffset.x,
        cursorPosition.y - dragStartCursorOffset.y,
        dragStartNodesRect.width - deltaX,
        dragStartNodesRect.height - deltaY,
      )
    case 'left-center':
      return new Rect(
        cursorPosition.x - dragStartCursorOffset.x,
        dragStartNodesRect.y,
        dragStartNodesRect.width - deltaX,
        dragStartNodesRect.height,
      )
    case 'left-bottom':
      return new Rect(
        cursorPosition.x - dragStartCursorOffset.x,
        dragStartNodesRect.y,
        dragStartNodesRect.width - deltaX,
        dragStartNodesRect.height - deltaY,
      )
    case 'center-top':
      return new Rect(
        dragStartNodesRect.x,
        cursorPosition.y - dragStartCursorOffset.y,
        dragStartNodesRect.width,
        dragStartNodesRect.height - deltaY,
      )
    case 'center-bottom':
      return new Rect(
        dragStartNodesRect.x,
        dragStartNodesRect.y,
        dragStartNodesRect.width,
        dragStartNodesRect.height + deltaY,
      )
    case 'right-top':
      return new Rect(
        dragStartNodesRect.x,
        cursorPosition.y - dragStartCursorOffset.y,
        dragStartNodesRect.width + deltaX,
        dragStartNodesRect.height - deltaY,
      )
    case 'right-center':
      return new Rect(
        dragStartNodesRect.x,
        dragStartNodesRect.y,
        dragStartNodesRect.width + deltaX,
        dragStartNodesRect.height,
      )
    case 'right-bottom':
      return new Rect(
        dragStartNodesRect.x,
        dragStartNodesRect.y,
        dragStartNodesRect.width + deltaX,
        dragStartNodesRect.height - deltaY,
      )
  }
}

export function calcBaseTranslate(
  dragStartTranslate: IPoint,
  deltaX: number,
  deltaY: number,
) {
  return {
    x: dragStartTranslate.x + deltaX,
    y: dragStartTranslate.y + deltaY,
  }
}

export function calcBaseResize({
  direction,
  dragStartTranslate,
  dragStartSize,
  deltaX,
  deltaY,
}: IBaseResizeProps) {
  switch (direction) {
    case 'left-top':
      return new Rect(
        dragStartTranslate.x + deltaX,
        dragStartTranslate.y + deltaY,
        dragStartSize.width - deltaX,
        dragStartSize.height - deltaY,
      )
    case 'left-center':
      return new Rect(
        dragStartTranslate.x + deltaX,
        dragStartTranslate.y,
        dragStartSize.width - deltaX,
        dragStartSize.height,
      )
    case 'left-bottom':
      return new Rect(
        dragStartTranslate.x + deltaX,
        dragStartTranslate.y,
        dragStartSize.width - deltaX,
        dragStartSize.height + deltaY,
      )
    case 'center-bottom':
      return new Rect(
        dragStartTranslate.x,
        dragStartTranslate.y,
        dragStartSize.width,
        dragStartSize.height + deltaY,
      )
    case 'center-top':
      return new Rect(
        dragStartTranslate.x,
        dragStartTranslate.y + deltaY,
        dragStartSize.width,
        dragStartSize.height - deltaY,
      )
    case 'right-top':
      return new Rect(
        dragStartTranslate.x,
        dragStartTranslate.y + deltaY,
        dragStartSize.width + deltaX,
        dragStartSize.height - deltaY,
      )
    case 'right-bottom':
      return new Rect(
        dragStartTranslate.x,
        dragStartTranslate.y,
        dragStartSize.width + deltaX,
        dragStartSize.height + deltaY,
      )
    case 'right-center':
      return new Rect(
        dragStartTranslate.x,
        dragStartTranslate.y,
        dragStartSize.width + deltaX,
        dragStartSize.height,
      )
  }
}

export function calcSnapEdge(
  line: ILineSegment,
  rect: IRect,
  threshold: number,
) {
  const targetRect = new Rect(rect.x, rect.y, rect.width, rect.height)
  if (line.start?.x === line.end?.x) {
    if (Math.abs(line.start.x - targetRect.left) < threshold)
      return 'vl'
    if (
      Math.abs(line.start.x - (targetRect.left + targetRect.width / 2))
      < threshold
    ) {
      return 'vc'
    }
    if (Math.abs(line.start.x - targetRect.right) < threshold)
      return 'vr'
  }
  else {
    if (Math.abs(line.start.y - targetRect.top) < threshold)
      return 'ht'
    if (
      Math.abs(line.start.y - (targetRect.top + targetRect.height / 2))
      < threshold
    ) {
      return 'hc'
    }
    if (Math.abs(line.start.y - targetRect.bottom) < threshold)
      return 'hb'
  }
}

export function calcRulerSnapLines(
  rulerSnapLines: ILineSegment[],
  dragNodesRect: IRect,
) {
  const edgeLines = calcEdgeLinesOfRect(dragNodesRect)
  return rulerSnapLines.map((line) => {
    return {
      ...line,
      distance: calcDistanceOfSnapLineToEdges(line, edgeLines),
    }
  })
}

export function calcAroundSnapLines<T>(
  dragNodesRect: IRect,
  references: Array<IRectReference<T>>,
  options: {
    threshold: number
    snapping: boolean
    type: TransformHelperType
  },
) {
  const results: Array<IAroundSnapLine<T>> = []
  const edgeLines = calcEdgeLinesOfRect(dragNodesRect)
  references.forEach(({ refer, rect }) => {
    const referLines = calcEdgeLinesOfRect(rect)
    const add = (line: ILineSegment) => {
      const [distance, edge] = calcClosestEdges(line, edgeLines)
      if (distance >= options.threshold)
        return
      if (options.snapping && distance !== 0)
        return
      const combined = calcCombineSnapLineSegment(line, edge)
      const snapEdge = calcSnapEdge(combined, dragNodesRect, options.threshold)
      if (options.type !== 'translate' && (snapEdge === 'hc' || snapEdge === 'vc'))
        return
      results.push({
        ...combined,
        refer,
        distance,
      })
    }
    referLines.h.forEach(add)
    referLines.v.forEach(add)
  })
  return results
}

export function calcAroundSpaceBlocks<T>(
  dragNodesRect: IRect,
  references: Array<IRectReference<T>>,
) {
  const closestSpaces: Partial<AroundSpaceBlockRecord<T>> = {}
  references.forEach(({ refer, rect }) => {
    if (isEqualRect(dragNodesRect, rect))
      return

    const origin = calcSpaceBlockOfRect(dragNodesRect, rect)
    if (!origin)
      return

    const spaceBlock: IAroundSpaceBlock<T> = {
      refer,
      ...origin,
    }
    const closestSpace = closestSpaces[origin.type]
    if (!closestSpace || spaceBlock.distance < closestSpace.distance) {
      closestSpaces[origin.type] = spaceBlock
    }
  })
  return closestSpaces as AroundSpaceBlockRecord<T>
}
