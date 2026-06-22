import type { DesignerMaterialDefinition } from '@silver-formily/designer-core'
import type { Component } from 'vue'

export interface DesignerPreviewComponents {
  [key: string]: Component
}

export interface ElementPlusDesignerPreset {
  materials: DesignerMaterialDefinition[]
  previewComponents: DesignerPreviewComponents
}

export interface PaletteMaterialItem extends DesignerMaterialDefinition {
  description: string
  displayTitle: string
  iconName: string
  iconSvg: string
}

export interface PaletteMaterialGroup {
  name: string
  items: PaletteMaterialItem[]
}
