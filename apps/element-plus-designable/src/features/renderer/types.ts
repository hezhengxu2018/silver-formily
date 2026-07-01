import type { IBehavior, IResource } from '@silver-formily/designer-core'
import type { Component } from 'vue'

export type DesignableComponent = Component & {
  Behavior?: IBehavior[]
  Resource?: IResource[]
}

export interface PaletteResourceItem {
  description?: string
  icon?: unknown
  iconSvg?: string
  sourceId: string
  title: string
}

export interface PaletteResourceGroup {
  name: string
  title: string
  items: PaletteResourceItem[]
}
