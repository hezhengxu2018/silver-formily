import { describe, expect, it } from 'vitest'
import { createDesigner } from '../externals'
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from '../presets'

describe('createDesigner preset options', () => {
  it('appends default drivers, effects, and shortcuts', () => {
    const customEffect = () => {}
    const engine = createDesigner({
      drivers: [],
      effects: [customEffect],
      shortcuts: [],
    })

    expect((engine as any).drivers).toHaveLength(DEFAULT_DRIVERS.length)
    expect(engine.props.effects).toEqual([customEffect, ...DEFAULT_EFFECTS])
    expect(engine.props.shortcuts).toHaveLength(DEFAULT_SHORTCUTS.length)
    expect(engine.keyboard.shortcuts).toHaveLength(DEFAULT_SHORTCUTS.length)
  })
})
