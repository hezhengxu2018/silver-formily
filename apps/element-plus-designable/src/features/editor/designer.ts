import type { TreeNode } from '@silver-formily/designer-core'
import type { DesignerMaterialDefinition, PaletteMaterialGroup, PaletteMaterialItem } from './materials'
import { createBehavior, createDesigner, createResource, GlobalRegistry } from '@silver-formily/designer-core'
import { computed } from 'vue'
import { materialGroups, materials } from './materials'

export interface PaletteResourceItem extends PaletteMaterialItem {
  sourceId: string
}

export interface PaletteResourceGroup extends Omit<PaletteMaterialGroup, 'items'> {
  items: PaletteResourceItem[]
}

function cloneDefaultNode(material: DesignerMaterialDefinition) {
  const node = typeof material.defaultNode === 'function'
    ? material.defaultNode()
    : material.defaultNode

  return JSON.parse(JSON.stringify({
    componentName: material.runtimeComponent ?? material.name,
    props: {},
    children: [],
    ...node,
  }))
}

function getMaterialDesignerMetadata(material: DesignerMaterialDefinition) {
  const defaultNode = typeof material.defaultNode === 'function'
    ? material.defaultNode()
    : material.defaultNode
  return material.designer ?? defaultNode?.metadata?.designer
}

function createMaterialBehaviors() {
  return createBehavior(
    {
      name: 'Form',
      selector: 'Form',
      designerProps: {
        droppable: true,
        draggable: false,
        cloneable: false,
        deletable: false,
      },
    },
    ...materials.map(material => ({
      name: material.runtimeComponent ?? material.name,
      selector: material.runtimeComponent ?? material.name,
      designerProps: {
        droppable: !!getMaterialDesignerMetadata(material)?.container,
        draggable: (material.runtimeComponent ?? material.name) !== 'Form',
        deletable: true,
        cloneable: true,
        inlineChildrenLayout: false,
      },
    })),
  )
}

GlobalRegistry.setDesignerBehaviors([createMaterialBehaviors()])

const resources = createResource(
  ...materials.map(material => ({
    title: material.title,
    elements: [cloneDefaultNode(material)],
  })),
)

const resourceByMaterialName = new Map(
  materials.map((material, index) => [material.name, resources[index]]),
)

export const paletteResourceGroups: PaletteResourceGroup[] = materialGroups.map(group => ({
  ...group,
  items: group.items.flatMap((item) => {
    const resource = resourceByMaterialName.get(item.name)
    if (!resource?.node)
      return []
    if (!resource.node.children.some(node => node.allowDrag()))
      return []
    return [{
      ...item,
      sourceId: resource.node.id,
    }]
  }),
}))

export const engine = createDesigner({
  defaultComponentTree: {
    id: 'form-root',
    componentName: 'Form',
    props: {
      title: 'Untitled Form',
    },
    children: [],
  },
  rootComponentName: 'Form',
})

resources.forEach((resource) => {
  if (resource.node)
    engine.sourceNodes.registerTree(resource.node)
})

export const selectedNodes = computed(() => engine.getAllSelectedNodes().filter(Boolean) as TreeNode[])
