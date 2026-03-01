import type { GridNode } from '../src'
import { describe, expect, it, vi } from 'vitest'
import { Grid } from '../src'

function createContainer(
  spans: number[] = [1],
  size: { width: number, height: number } = { width: 960, height: 240 },
) {
  const container = document.createElement('div')
  spans.forEach((span) => {
    const child = document.createElement('div')
    child.style.gridColumnStart = `span ${span}`
    child.setAttribute('data-grid-span', String(span))
    container.appendChild(child)
  })

  document.body.appendChild(container)

  Object.defineProperty(container, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      width: size.width,
      height: size.height,
      top: 0,
      left: 0,
      right: size.width,
      bottom: size.height,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }),
  })

  return container
}

function fillChildren(size: number): GridNode[] {
  return Array.from({ length: size }, () => ({
    span: 1,
    originSpan: 1,
    visible: true,
  }))
}

describe('grid extra coverage', () => {
  it('supports setters/getters and breakpoint edge cases', () => {
    const grid = new Grid()

    expect(grid.breakpoint).toBe(2)
    grid.breakpoints = []
    expect(grid.breakpoint).toBe(-1)

    grid.maxWidth = 320
    grid.minWidth = 120
    grid.maxColumns = 6
    grid.maxRows = 3
    grid.minColumns = 2
    grid.rowGap = 12
    grid.columnGap = 16
    grid.colWrap = false

    expect(grid.maxWidth).toBe(320)
    expect(grid.minWidth).toBe(120)
    expect(grid.maxColumns).toBe(6)
    expect(grid.maxRows).toBe(3)
    expect(grid.minColumns).toBe(2)
    expect(grid.rowGap).toBe(12)
    expect(grid.columnGap).toBe(16)
    expect(grid.colWrap).toBe(false)

    grid.ready = true
    grid.width = 500
    grid.breakpoints = [300, 700]
    expect(grid.breakpoint).toBe(1)
  })

  it('covers columns/template/rows helpers branches', () => {
    const grid = new Grid({
      minColumns: 2,
      maxColumns: 2,
      minWidth: 100,
      maxWidth: 120,
      rowGap: 6,
      columnGap: 10,
    })

    grid.children = [{ span: 1 }, { span: 2 }]
    grid.childTotalColumns = 5
    grid.shadowChildTotalColumns = 7
    grid.childOriginTotalColumns = 2

    expect(grid.templateColumns).toBe('repeat(2,minmax(0,1fr))')

    grid.ready = true
    grid.width = 0
    expect(grid.templateColumns).toBe('')

    grid.width = 1000
    expect(grid.columns).toBe(2)
    expect(grid.templateColumns).toBe('repeat(2,minmax(0,1fr))')

    grid.width = 230
    expect(grid.templateColumns).toBe('repeat(2,minmax(100px,120px))')

    grid.options.strictAutoFit = true
    grid.width = 1000
    expect(grid.templateColumns).toBe('repeat(2,minmax(100px,120px))')

    grid.options.maxWidth = Infinity
    expect(grid.templateColumns).toBe('repeat(2,minmax(0,1fr))')

    expect(grid.rows).toBe(3)
    expect(grid.shadowRows).toBe(4)
    expect(grid.gap).toBe('6px 10px')
    expect(grid.childSize).toBe(2)
    expect(grid.fullnessLastColumn).toBe(true)
  })

  it('covers columns clamp branches and colWrap=false path', () => {
    const clampMax = new Grid({
      minColumns: 1,
      maxColumns: 2,
      minWidth: 80,
      maxWidth: 120,
      columnGap: 0,
    })
    clampMax.ready = true
    clampMax.width = 1200
    clampMax.children = fillChildren(10)
    clampMax.childOriginTotalColumns = 10
    expect(clampMax.columns).toBe(2)

    const clampMin = new Grid({
      minColumns: 4,
      maxColumns: 7,
      minWidth: 200,
      maxWidth: 250,
      columnGap: 0,
    })
    clampMin.ready = true
    clampMin.width = 450
    clampMin.children = fillChildren(10)
    clampMin.childOriginTotalColumns = 10
    expect(clampMin.columns).toBe(4)

    clampMin.colWrap = false
    expect(clampMin.columns).toBe(10)
  })

  it('covers connect edge branches and static id default', async () => {
    const grid = new Grid()
    const noopDispose = grid.connect(null as unknown as HTMLElement)
    expect(typeof noopDispose).toBe('function')
    expect(() => noopDispose()).not.toThrow()

    const onDigest = vi.fn()
    const onInitialized = vi.fn()
    const container = createContainer([1, 1], { width: 0, height: 0 })
    const connected = new Grid({
      onDigest,
      onInitialized,
    })

    const dispose = connected.connect(container)
    await Promise.resolve()
    await Promise.resolve()

    expect(connected.width).toBe(0)
    expect(connected.height).toBe(0)
    expect(onDigest).toHaveBeenCalled()
    expect(onInitialized).toHaveBeenCalledTimes(1)

    dispose()
    expect(connected.children).toHaveLength(0)

    const defaultId = JSON.parse(Grid.id())
    expect(defaultId).toHaveLength(10)
    expect(Grid.id({ maxRows: 1 })).not.toBe(Grid.id())
  })
})
