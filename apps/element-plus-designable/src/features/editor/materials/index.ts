import type { ElementPlusDesignerPreset } from './types'
import { elementPlusDesignerMaterials } from './materials'
import { elementPlusPreviewComponents } from './previews'

export * from './materials'
export * from './palette'
export * from './previews'
export * from './types'

export function createElementPlusDesignerPreset(): ElementPlusDesignerPreset {
  return {
    materials: elementPlusDesignerMaterials,
    previewComponents: elementPlusPreviewComponents,
  }
}
