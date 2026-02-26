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

  it('uses ssr columns and template before ready', () => {
    const grid = new Grid({
      ssrColumns: 3,
      ssrTemplateColumns: 'repeat(3,minmax(0,1fr))',
    })

    expect(grid.ready).toBe(false)
    expect(grid.columns).toBe(3)
    expect(grid.templateColumns).toBe('repeat(3,minmax(0,1fr))')
  })

  it('defers visibility side effects until hydration by default', async () => {
    const { container, child } = createContainer()
    const grid = new Grid({
      shouldVisible: () => false,
    })

    const dispose = grid.connect(container)

    expect(grid.ready).toBe(true)
    expect(grid.hydrated).toBe(false)
    expect(child.style.display).toBe('')

    await Promise.resolve()

    expect(grid.hydrated).toBe(true)
    expect(child.style.display).toBe('none')

    dispose()
  })

  it('applies visibility side effects immediately when defer is disabled', () => {
    const { container, child } = createContainer()
    const grid = new Grid({
      deferVisibilityUntilHydration: false,
      shouldVisible: () => false,
    })

    const dispose = grid.connect(container)

    expect(grid.ready).toBe(true)
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
})
