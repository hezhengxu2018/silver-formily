import { Rect } from '@silver-formily/designer-shared'
import { describe, expect, it } from 'vitest'
import {
  calcClosestPosition,
  calcClosestRectByPosition,
  ClosestPosition,
  findClosestNodeByRectDistance,
  shouldUseChildrenRect,
} from '../internals/MoveGeometry'

describe('move geometry', () => {
  it('resolves inner drops when a node allows append', () => {
    const result = calcClosestPosition({
      point: { x: 10, y: 10 },
      rect: new Rect(0, 0, 100, 100),
      canAppend: true,
      canSibling: true,
      canUseParentSibling: false,
      containsDragNodes: false,
      isRoot: false,
    })

    expect(result).toEqual({
      position: ClosestPosition.Inner,
      useParentClosestNode: false,
    })
  })

  it('falls back to sibling insertion on a valid parent', () => {
    const result = calcClosestPosition({
      point: { x: 10, y: 90 },
      rect: new Rect(0, 0, 100, 100),
      layout: 'vertical',
      canAppend: false,
      canSibling: false,
      canUseParentSibling: true,
      containsDragNodes: false,
      isRoot: false,
    })

    expect(result).toEqual({
      position: ClosestPosition.Under,
      useParentClosestNode: true,
    })
  })

  it('returns forbidden sibling insertion without a valid parent', () => {
    const result = calcClosestPosition({
      point: { x: 95, y: 50 },
      rect: new Rect(0, 0, 100, 100),
      layout: 'horizontal',
      canAppend: false,
      canSibling: false,
      canUseParentSibling: false,
      containsDragNodes: false,
      isRoot: false,
    })

    expect(result.position).toBe(ClosestPosition.ForbidAfter)
    expect(result.useParentClosestNode).toBe(false)
  })

  it('uses inner-before and inner-after for root edge drops', () => {
    const before = calcClosestPosition({
      point: { x: 10, y: -10 },
      rect: new Rect(0, 0, 100, 100),
      canAppend: false,
      canSibling: true,
      canUseParentSibling: false,
      containsDragNodes: false,
      isRoot: true,
    })
    const after = calcClosestPosition({
      point: { x: 10, y: 110 },
      rect: new Rect(0, 0, 100, 100),
      canAppend: false,
      canSibling: true,
      canUseParentSibling: false,
      containsDragNodes: false,
      isRoot: true,
    })

    expect(before.position).toBe(ClosestPosition.InnerBefore)
    expect(after.position).toBe(ClosestPosition.InnerAfter)
  })

  it('selects the closest candidate by rect distance', () => {
    const closest = findClosestNodeByRectDistance(
      { x: 42, y: 10 },
      {
        node: 'base',
        rect: new Rect(0, 0, 10, 10),
      },
      [
        {
          node: 'near',
          rect: new Rect(40, 0, 10, 10),
        },
        {
          node: 'far',
          rect: new Rect(100, 0, 10, 10),
        },
      ],
    )

    expect(closest).toBe('near')
  })

  it('uses children rects only for inner edge positions', () => {
    const closestRect = new Rect(0, 0, 100, 100)
    const childrenRect = new Rect(10, 10, 80, 80)

    expect(shouldUseChildrenRect(ClosestPosition.InnerBefore)).toBe(true)
    expect(
      calcClosestRectByPosition(
        ClosestPosition.InnerBefore,
        closestRect,
        childrenRect,
      ),
    ).toBe(childrenRect)
    expect(
      calcClosestRectByPosition(ClosestPosition.Before, closestRect, childrenRect),
    ).toBe(closestRect)
  })
})
