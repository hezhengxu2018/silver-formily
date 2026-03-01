import { afterEach, describe, expect, it } from 'vitest'
import { createGrid, Grid } from '../src'

function createContainer(spans: number[] = [1], width = 960) {
  const container = document.createElement('div')
  const children = spans.map((span) => {
    const child = document.createElement('div')
    child.style.gridColumnStart = `span ${span}`
    child.setAttribute('data-grid-span', String(span))
    container.appendChild(child)
    return child
  })

  document.body.appendChild(container)

  Object.defineProperty(container, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      width,
      height: 240,
      top: 0,
      left: 0,
      right: width,
      bottom: 240,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }),
  })

  return { container, children }
}

describe('grid core behavior', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('uses pre-connect default columns and template', () => {
    const grid = new Grid({
      breakpoints: [720, 1280, 1920],
      minColumns: [2, 3, 4, 5],
      maxColumns: [4, 5, 6, 7],
    })

    expect(grid.ready).toBe(false)
    expect(grid.breakpoint).toBe(2)
    expect(grid.columns).toBe(6)
    expect(grid.templateColumns).toBe('repeat(6,minmax(0,1fr))')
  })

  it('marks instance as raw for Vue proxy skip', () => {
    const grid = new Grid()
    expect((grid as { __v_skip?: boolean }).__v_skip).toBe(true)
  })

  it('creates grid instance via createGrid helper', () => {
    const grid = createGrid({
      minColumns: 2,
    })
    expect(grid).toBeInstanceOf(Grid)
    expect((grid as { __v_skip?: boolean }).__v_skip).toBe(true)
    expect(grid.minColumns).toBe(2)
  })

  it('computes columns and template columns after connect', async () => {
    const { container } = createContainer([1, 1, 1, 1])
    const grid = new Grid({
      minColumns: 2,
      maxColumns: 2,
      minWidth: 120,
      maxWidth: 200,
      columnGap: 16,
    })

    const dispose = grid.connect(container)
    await Promise.resolve()

    expect(grid.ready).toBe(true)
    expect(grid.columns).toBe(2)
    expect(grid.templateColumns).toContain('repeat(2')

    dispose()
  })

  it('applies shouldVisible rule during digest', async () => {
    const { container, children } = createContainer([1, 1, 1])
    const grid = new Grid({
      shouldVisible: node => (node.index ?? 0) < 2,
    })

    const dispose = grid.connect(container)
    await Promise.resolve()
    grid.options.columnGap = 9
    await Promise.resolve()

    expect(grid.children.filter(node => node.visible).length).toBe(2)
    expect(children[2].style.display).toBe('none')

    dispose()
  })
})
