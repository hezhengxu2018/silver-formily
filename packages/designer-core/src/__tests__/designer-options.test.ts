import { describe, expect, it } from 'vitest'
import { createDesigner } from '../externals'
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from '../presets'

describe('createDesigner preset options', () => {
  it('keeps default drivers, effects, and shortcuts enabled by default', () => {
    const engine = createDesigner()

    expect((engine as any).drivers).toHaveLength(DEFAULT_DRIVERS.length)
    expect(engine.props.effects).toHaveLength(DEFAULT_EFFECTS.length)
    expect(engine.props.shortcuts).toHaveLength(DEFAULT_SHORTCUTS.length)
  })

  it('does not append default drivers when useDefaultDrivers is false', () => {
    const engine = createDesigner({
      drivers: [],
      useDefaultDrivers: false,
    })

    expect((engine as any).drivers).toHaveLength(0)
  })

  it('does not append default effects when useDefaultEffects is false', () => {
    const effect = () => {}
    const engine = createDesigner({
      effects: [effect],
      useDefaultEffects: false,
    })

    expect(engine.props.effects).toEqual([effect])
  })

  it('does not append default shortcuts when useDefaultShortcuts is false', () => {
    const engine = createDesigner({
      shortcuts: [],
      useDefaultShortcuts: false,
    })

    expect(engine.props.shortcuts).toHaveLength(0)
    expect(engine.keyboard.shortcuts).toHaveLength(0)
  })
})
