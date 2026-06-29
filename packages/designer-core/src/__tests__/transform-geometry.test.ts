import { LineSegment, Rect } from '@silver-formily/designer-shared'
import { describe, expect, it } from 'vitest'
import {
  calcAroundSnapLines,
  calcAroundSpaceBlocks,
  calcBaseResize,
  calcCursorDragNodesRect,
  calcSnapEdge,
} from '../internals/TransformGeometry'

describe('transform geometry', () => {
  it('calculates cursor drag rects for resize directions', () => {
    const rect = calcCursorDragNodesRect({
      type: 'resize',
      direction: 'left-top',
      cursorPosition: { x: 18, y: 24 },
      dragStartCursorOffset: { x: 8, y: 4 },
      dragNodesRect: new Rect(10, 20, 100, 80),
      dragStartNodesRect: new Rect(10, 20, 100, 80),
      deltaX: 12,
      deltaY: 8,
    })

    expect(rect).toMatchObject({
      x: 10,
      y: 20,
      width: 88,
      height: 72,
    })
  })

  it('calculates base resize values from stored translate and size', () => {
    const rect = calcBaseResize({
      direction: 'right-bottom',
      dragStartTranslate: { x: 5, y: 7 },
      dragStartSize: { width: 30, height: 40 },
      deltaX: 12,
      deltaY: 8,
    })

    expect(rect).toMatchObject({
      x: 5,
      y: 7,
      width: 42,
      height: 48,
    })
  })

  it('filters center snap lines for resize calculations', () => {
    const dragRect = new Rect(10, 10, 20, 20)
    const references = [
      {
        refer: 'center',
        rect: new Rect(20, 0, 10, 50),
      },
      {
        refer: 'edge',
        rect: new Rect(30, 0, 10, 50),
      },
    ]

    const resizeLines = calcAroundSnapLines(dragRect, references, {
      threshold: 6,
      snapping: false,
      type: 'resize',
    })
    const translateLines = calcAroundSnapLines(dragRect, references, {
      threshold: 6,
      snapping: false,
      type: 'translate',
    })

    expect(
      resizeLines.every(line => calcSnapEdge(line, dragRect, 6) !== 'vc'),
    ).toBe(true)
    expect(
      translateLines.some(line => calcSnapEdge(line, dragRect, 6) === 'vc'),
    ).toBe(true)
  })

  it('keeps the closest space block for each direction', () => {
    const dragRect = new Rect(0, 0, 10, 10)
    const spaces = calcAroundSpaceBlocks(dragRect, [
      {
        refer: 'far',
        rect: new Rect(40, 0, 10, 10),
      },
      {
        refer: 'near',
        rect: new Rect(20, 0, 10, 10),
      },
    ])

    expect(spaces.right.refer).toBe('near')
    expect(spaces.right.distance).toBe(10)
  })

  it('detects snap edges without requiring Rect instances', () => {
    const edge = calcSnapEdge(
      new LineSegment({ x: 30, y: 0 }, { x: 30, y: 40 }),
      { x: 10, y: 10, width: 20, height: 20 },
      6,
    )

    expect(edge).toBe('vr')
  })
})
