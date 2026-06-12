import type { DesignerCore, DesignerMaterialGroup, DesignerNode, DesignerSnapshot } from '@silver-formily/designer-core'
import type { Component, ComputedRef, InjectionKey, Ref, ShallowRef } from 'vue'

export interface DesignerContextValue {
  designer: ShallowRef<DesignerCore>
  previewComponents: Record<string, Component>
  version: Ref<number>
  snapshot: ComputedRef<DesignerSnapshot>
  selectedNode: ComputedRef<DesignerNode | undefined>
  selectedParent: ComputedRef<DesignerNode | undefined>
  materialGroups: ComputedRef<DesignerMaterialGroup[]>
  schemaText: ComputedRef<string>
  canUndo: ComputedRef<boolean>
  canRedo: ComputedRef<boolean>
}

export interface DesignerWorkbenchProps {
  designer: DesignerCore
  previewComponents?: Record<string, Component>
  title?: string
}

export interface DesignerProviderProps {
  designer: DesignerCore
  previewComponents?: Record<string, Component>
}

export const DesignerContextSymbol: InjectionKey<DesignerContextValue> = Symbol('SilverFormilyDesignerContext')
