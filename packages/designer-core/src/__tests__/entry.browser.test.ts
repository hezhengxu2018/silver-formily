import { afterEach, describe, expect, it, vi } from 'vitest'

describe('designer-core entry', () => {
  const originalDesignable = (globalThis as any).Designable

  afterEach(() => {
    vi.resetModules()
    if (originalDesignable === undefined) {
      delete (globalThis as any).Designable
    }
    else {
      ;(globalThis as any).Designable = originalDesignable
    }
  })

  it('does not register a global namespace when imported', async () => {
    delete (globalThis as any).Designable
    vi.resetModules()

    await import('../index')

    expect((globalThis as any).Designable).toBeUndefined()
  })

  it('registers the core namespace explicitly', async () => {
    delete (globalThis as any).Designable
    vi.resetModules()

    const core = await import('../index')
    const registered = core.registerGlobal()

    expect((globalThis as any).Designable.Core).toBe(registered)
    expect(registered.Engine).toBe(core.Engine)
  })
})
