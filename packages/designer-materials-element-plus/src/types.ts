import type { DesignerMaterialDefinition } from '@silver-formily/designer-core'
import type { Component } from 'vue'

export interface DesignerPreviewComponents {
  [key: string]: Component
}

export interface ElementPlusDesignerPreset {
  materials: DesignerMaterialDefinition[]
  previewComponents: DesignerPreviewComponents
}
