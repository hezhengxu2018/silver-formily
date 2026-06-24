import type { Component } from 'vue'

export interface DesignerNodeDesignerMetadata {
  container?: boolean
  defaultContainer?: string
  containers?: Array<{
    name: string
    title?: string
    accepts?: string[]
    maxItems?: number
  }>
}

export interface DesignerNodeMetadata extends Record<string, any> {
  designer?: DesignerNodeDesignerMetadata
}

export interface DesignerSchemaNode {
  id?: string
  componentName: string
  title?: string
  props?: Record<string, any>
  children?: DesignerSchemaNode[]
  slots?: Record<string, DesignerSchemaNode[]>
  metadata?: DesignerNodeMetadata
}

export interface DesignerMaterialDefinition {
  name: string
  title: string
  group?: string
  defaultNode?: Partial<DesignerSchemaNode> | (() => Partial<DesignerSchemaNode>)
  designer?: DesignerNodeDesignerMetadata
  propsSchema?: Record<string, any>
  previewComponent?: string
  runtimeComponent?: string
  setters?: unknown
  metadata?: DesignerNodeMetadata
}

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
