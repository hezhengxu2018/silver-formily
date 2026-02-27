import { afterEach, describe, expect, it } from 'vitest'
import { Grid } from '../src'

function createContainer() {
  const container = document.createElement('div')
  const child = document.createElement('div')
  child.style.gridColumnStart = 'span 1'
  container.appendChild(child)
  document.body.appendChild(container)

  Object.defineProperty(container, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      width: 960,
      height: 240,
      top: 0,
      left: 0,
      right: 960,
      bottom: 240,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }),
  })

  return { container, child }
}

describe('grid SSR fallback', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('uses ssr width to resolve columns before ready', () => {
    const grid = new Grid({
      ssrWidth: 1000,
      breakpoints: [720, 1280, 1920],
      minColumns: [2, 3, 4, 5],
    })

    expect(grid.ready).toBe(false)
    expect(grid.columns).toBe(3)
    expect(grid.templateColumns).toBe('repeat(3,minmax(0,1fr))')
  })

  it('resolves ssr visibility without requiring DOM nodes', () => {
    const grid = new Grid({
      shouldVisible: node => node.index < 2 && node.originSpan === -1,
    })

    expect(grid.normalizeSsrNode({ index: 0 })).toEqual({
      index: 0,
      visible: true,
      column: 0,
      shadowColumn: 0,
      row: 0,
      shadowRow: 0,
      span: 1,
      originSpan: 1,
    })
    expect(grid.resolveSsrVisible({ index: 1, span: 2, originSpan: -1 })).toBe(true)
    expect(grid.resolveSsrVisible({ index: 3, span: 2, originSpan: -1 })).toBe(false)
  })

  it('applies shouldVisible before and after hydration', async () => {
    const { container, child } = createContainer()
    const grid = new Grid({
      shouldVisible: () => false,
    })

    const dispose = grid.connect(container)

    expect(grid.ready).toBe(true)
    expect(grid.hydrated).toBe(false)
    expect(child.style.display).toBe('none')

    await Promise.resolve()

    expect(grid.hydrated).toBe(true)
    expect(child.style.display).toBe('none')

    dispose()
  })

  it('generates template columns after connect in browser mode', async () => {
    const { container } = createContainer()
    const grid = new Grid({
      minColumns: 2,
      maxColumns: 2,
      minWidth: 120,
      maxWidth: 200,
      columnGap: 16,
    })

    const dispose = grid.connect(container)
    await Promise.resolve()

    expect(grid.columns).toBe(2)
    expect(grid.templateColumns).toContain('repeat(2')

    dispose()
  })

  it('returns noop dispose when container is null', () => {
    const grid = new Grid()
    const dispose = grid.connect(null)

    expect(typeof dispose).toBe('function')
    expect(() => dispose()).not.toThrow()
    expect(grid.ready).toBe(false)
  })

  it('accepts ref-like container target', async () => {
    const { container } = createContainer()
    const grid = new Grid()
    const dispose = grid.connect({ value: container })

    await Promise.resolve()
    expect(grid.ready).toBe(true)

    dispose()
  })
})
