import type { ElementPlusDesignerPreset } from './types'
import { materials } from './materials'
import { previewComponents } from './previews'

export * from './materials'
export * from './palette'
export * from './previews'
export * from './types'

export function createElementPlusDesignerPreset(): ElementPlusDesignerPreset {
  return {
    materials,
    previewComponents,
  }
}
