import type { Grid } from '../src'
import { describe, expect, it, vi } from 'vitest'
import {
  calcBreakpointIndex,
  calcChildOriginTotalColumns,
  calcChildTotalColumns,
  calcFactor,
  calcSatisfyColumns,
  factor,
  nextTick,
  parseGridNode,
  parseSpan,
  resolveChildren,
} from '../src/utils'

describe('grid utils', () => {
  it('handles breakpoint and factor helpers', () => {
    expect(calcBreakpointIndex([300, 700], 280)).toBe(0)
    expect(calcBreakpointIndex([300, 700], 650)).toBe(1)
    expect(calcBreakpointIndex([300, 700], 1000)).toBe(-1)

    expect(calcFactor([1, 2, 3], -1)).toBe(1)
    expect(calcFactor([1, 2], 6)).toBe(2)
    expect(calcFactor(5, 1)).toBe(5)

    expect(factor(undefined, { breakpoint: 0 } as unknown as Grid<HTMLElement>)).toBeUndefined()
    expect(factor([2, 4], { breakpoint: 1 } as unknown as Grid<HTMLElement>)).toBe(4)
  })

  it('parses span and grid nodes with fallback behavior', () => {
    expect(parseSpan('span 3 / auto')).toBe(3)
    expect(parseSpan('auto')).toBe(1)

    const first = document.createElement('div')
    first.style.gridColumnStart = 'span 2'
    const second = document.createElement('div')
    second.style.gridColumnStart = 'span 1'
    second.style.display = 'none'
    second.setAttribute('data-grid-span', '4')
    document.body.append(first, second)

    const fakeCollection = {
      0: first,
      1: second,
      2: { nodeType: 3 },
      length: 3,
      item(index: number) {
        return (this as unknown as Record<number, Element | null>)[index] ?? null
      },
    } as unknown as HTMLCollection

    const nodes = parseGridNode(fakeCollection)

    expect(nodes).toHaveLength(2)
    expect(first.getAttribute('data-grid-span')).toBe(String(nodes[0].span))
    expect(nodes[1].originSpan).toBe(4)
    expect(nodes[1].visible).toBe(false)
  })

  it('handles column calculations under different bounds', () => {
    const nodes = [
      { span: 2, originSpan: 2, visible: true },
      { span: 1, originSpan: -1, visible: true },
      { span: 3, originSpan: 3, visible: false },
    ]

    expect(calcChildTotalColumns(nodes)).toBe(3)
    expect(calcChildTotalColumns(nodes, true)).toBe(6)
    expect(calcChildOriginTotalColumns(nodes)).toBe(3)
    expect(calcChildOriginTotalColumns(nodes, true)).toBe(6)

    expect(calcSatisfyColumns(300, 4, 2, 200, 120, 0)).toBe(2)
    expect(calcSatisfyColumns(1000, 4, 2, 200, 100, 0)).toBe(4)
    expect(calcSatisfyColumns(100, 4, 5, 200, 120, 0)).toBe(5)
  })

  it('resolves children visibility/span rules and nextTick callback', async () => {
    const notReadyGrid = {
      ready: false,
      options: {},
      children: [{ visible: true }],
      columns: 2,
    } as unknown as Grid<HTMLElement>
    resolveChildren(notReadyGrid)
    expect(notReadyGrid.children[0].visible).toBe(true)

    const fillElement = document.createElement('div')
    const fillGrid = {
      ready: true,
      columns: 3,
      options: {
        strictAutoFit: false,
      },
      children: [
        {
          index: 0,
          visible: true,
          span: 1,
          originSpan: -1,
          element: fillElement,
        },
      ],
    } as unknown as Grid<HTMLElement>
    resolveChildren(fillGrid)
    expect(fillElement.style.gridColumn).toBe('span 3 / -1')

    const hiddenElement = document.createElement('div')
    const strictElement = document.createElement('div')
    const grid = {
      ready: true,
      columns: 2,
      options: {
        strictAutoFit: true,
        shouldVisible: (node: { index?: number }) => node.index !== 0,
      },
      children: [
        {
          index: 0,
          visible: true,
          span: 1,
          originSpan: 1,
          element: hiddenElement,
        },
        {
          index: 1,
          visible: false,
          span: 1,
          originSpan: 3,
          element: strictElement,
        },
      ],
    } as unknown as Grid<HTMLElement>

    hiddenElement.style.display = ''
    strictElement.style.display = 'none'

    resolveChildren(grid)

    expect(grid.children[0].visible).toBe(false)
    expect(hiddenElement.style.display).toBe('none')
    expect(grid.children[1].visible).toBe(true)
    expect(strictElement.style.display).toBe('')
    expect(strictElement.style.gridColumn).toContain('span 2')
    expect(grid.children[1].shadowColumn).toBe(2)
    expect(grid.children[1].shadowRow).toBe(1)

    const callback = vi.fn()
    await nextTick(callback)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
