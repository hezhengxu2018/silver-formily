import type { DesignerCreateNodeOptions, DesignerMaterialDefinition, DesignerMaterialGroup, DesignerSchemaNode } from '../types'

import { clone } from '@silver-formily/shared'
import { ensureNodeSchema } from '../shared'

export class DesignerMaterialRegistry {
  protected materials = new Map<string, DesignerMaterialDefinition>()

  register(material: DesignerMaterialDefinition) {
    this.materials.set(material.name, clone(material))
    return this
  }

  registerMany(materials: DesignerMaterialDefinition[]) {
    materials.forEach(material => this.register(material))
    return this
  }

  unregister(name: string) {
    this.materials.delete(name)
    return this
  }

  clear() {
    this.materials.clear()
    return this
  }

  get(name: string) {
    const material = this.materials.get(name)
    return material ? clone(material) : undefined
  }

  has(name: string) {
    return this.materials.has(name)
  }

  list() {
    return Array.from(this.materials.values()).map(material => clone(material))
  }

  groupByCategory(): DesignerMaterialGroup[] {
    const groups = new Map<string, DesignerMaterialDefinition[]>()
    this.materials.forEach((material) => {
      const groupName = material.group || 'default'
      const group = groups.get(groupName) || []
      group.push(clone(material))
      groups.set(groupName, group)
    })

    return Array.from(groups.entries()).map(([name, materials]) => ({
      name,
      materials,
    }))
  }

  createNode(name: string, overrides: DesignerCreateNodeOptions = {}): DesignerSchemaNode {
    const material = this.materials.get(name)
    if (!material)
      throw new Error(`Material "${name}" was not registered`)

    const defaultNode = typeof material.defaultNode === 'function'
      ? material.defaultNode()
      : (material.defaultNode || {})

    const materialMetadata = clone(material.metadata) || {}
    const defaultMetadata = clone(defaultNode.metadata) || {}
    const overrideMetadata = clone(overrides.metadata) || {}
    const designerMetadata = {
      ...(clone(material.designer) || {}),
      ...(clone(materialMetadata.designer) || {}),
      ...(clone(defaultMetadata.designer) || {}),
      ...(clone(overrideMetadata.designer) || {}),
    }

    const metadata = {
      ...materialMetadata,
      ...defaultMetadata,
      ...overrideMetadata,
    }

    if (Object.keys(designerMetadata).length)
      metadata.designer = designerMetadata

    return ensureNodeSchema({
      ...clone(defaultNode),
      ...clone(overrides),
      componentName: overrides.componentName || defaultNode.componentName || material.runtimeComponent || material.name,
      title: overrides.title || defaultNode.title || material.title,
      props: {
        ...(clone(defaultNode.props) || {}),
        ...(clone(overrides.props) || {}),
      },
      metadata: {
        ...metadata,
      },
      children: clone(overrides.children || defaultNode.children || []),
      slots: clone(overrides.slots || defaultNode.slots || {}),
      id: overrides.id || defaultNode.id,
    })
  }
}
