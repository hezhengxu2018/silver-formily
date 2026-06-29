import type {
  IPoint,
  IRect,
} from '@silver-formily/designer-shared'
import {
  calcDistanceOfPointToRect,
  calcDistancePointToEdge,
  isNearAfter,
  isPointInRect,
} from '@silver-formily/designer-shared'

export enum ClosestPosition {
  Before = 'BEFORE',
  ForbidBefore = 'FORBID_BEFORE',
  After = 'After',
  ForbidAfter = 'FORBID_AFTER',
  Upper = 'UPPER',
  ForbidUpper = 'FORBID_UPPER',
  Under = 'UNDER',
  ForbidUnder = 'FORBID_UNDER',
  Inner = 'INNER',
  ForbidInner = 'FORBID_INNER',
  InnerAfter = 'INNER_AFTER',
  ForbidInnerAfter = 'FORBID_INNER_AFTER',
  InnerBefore = 'INNER_BEFORE',
  ForbidInnerBefore = 'FORBID_INNER_BEFORE',
  Forbid = 'FORBID',
}

export interface IClosestPositionProps {
  point: IPoint
  rect: IRect
  moveSensitive?: boolean
  moveInsertionType?: 'all' | 'inline' | 'block'
  layout?: 'horizontal' | 'vertical' | (string & {})
  canAppend: boolean
  canSibling: boolean
  canUseParentSibling: boolean
  containsDragNodes: boolean
  isRoot: boolean
}

export interface IClosestPositionResult {
  position: ClosestPosition
  useParentClosestNode: boolean
}

export interface IClosestNodeCandidate<T> {
  node: T
  rect: IRect
}

function getSiblingPosition(isInline: boolean, isAfter: boolean) {
  if (isInline)
    return isAfter ? ClosestPosition.After : ClosestPosition.Before
  return isAfter ? ClosestPosition.Under : ClosestPosition.Upper
}

function getForbiddenSiblingPosition(isInline: boolean, isAfter: boolean) {
  if (isInline)
    return isAfter ? ClosestPosition.ForbidAfter : ClosestPosition.ForbidBefore
  return isAfter ? ClosestPosition.ForbidUnder : ClosestPosition.ForbidUpper
}

export function calcClosestPosition({
  point,
  rect,
  moveSensitive,
  moveInsertionType = 'all',
  layout,
  canAppend,
  canSibling,
  canUseParentSibling,
  containsDragNodes,
  isRoot,
}: IClosestPositionProps): IClosestPositionResult {
  const isInline = moveInsertionType === 'block'
    ? false
    : layout === 'horizontal'
  const isAfter = isNearAfter(point, rect, isInline)
  const isInside = isPointInRect(point, rect, moveSensitive)

  if (isInside) {
    if (!canAppend) {
      if (!canSibling) {
        return {
          position: canUseParentSibling
            ? getSiblingPosition(isInline, isAfter)
            : getForbiddenSiblingPosition(isInline, isAfter),
          useParentClosestNode: canUseParentSibling,
        }
      }
      return {
        position: getSiblingPosition(isInline, isAfter),
        useParentClosestNode: false,
      }
    }
    if (containsDragNodes) {
      return {
        position: isAfter
          ? ClosestPosition.InnerAfter
          : ClosestPosition.InnerBefore,
        useParentClosestNode: false,
      }
    }
    return {
      position: ClosestPosition.Inner,
      useParentClosestNode: false,
    }
  }

  if (isRoot) {
    return {
      position: isAfter
        ? ClosestPosition.InnerAfter
        : ClosestPosition.InnerBefore,
      useParentClosestNode: false,
    }
  }

  if (!canSibling) {
    return {
      position: canUseParentSibling
        ? getSiblingPosition(isInline, isAfter)
        : getForbiddenSiblingPosition(isInline, isAfter),
      useParentClosestNode: canUseParentSibling,
    }
  }

  return {
    position: getSiblingPosition(isInline, isAfter),
    useParentClosestNode: false,
  }
}

export function findClosestNodeByRectDistance<T>(
  point: IPoint,
  base: IClosestNodeCandidate<T>,
  candidates: Array<IClosestNodeCandidate<T>>,
  sensitive?: boolean,
) {
  let minDistance = calcDistancePointToEdge(point, base.rect)
  let minDistanceNode = base.node
  candidates.forEach(({ node, rect }) => {
    const distance = isPointInRect(point, rect, sensitive)
      ? 0
      : calcDistanceOfPointToRect(point, rect)
    if (distance <= minDistance) {
      minDistance = distance
      minDistanceNode = node
    }
  })
  return minDistanceNode
}

export function shouldUseChildrenRect(position: ClosestPosition) {
  return (
    position === ClosestPosition.InnerAfter
    || position === ClosestPosition.InnerBefore
  )
}

export function calcClosestRectByPosition<T>(
  position: ClosestPosition,
  closestRect: T,
  childrenRect: T,
) {
  return shouldUseChildrenRect(position) ? childrenRect : closestRect
}
