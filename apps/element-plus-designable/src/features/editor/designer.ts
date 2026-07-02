import type { IFormilySchemaDocument, TreeNode } from '@silver-formily/designer-core'
import { createDesigner, GlobalRegistry, transformToSchema, transformToTreeNode } from '@silver-formily/designer-core'
import { computed } from 'vue'
import { AllBehaviors, AllResources, paletteResourceGroups } from '../renderer'

export type { PaletteResourceGroup, PaletteResourceItem } from '../renderer'

GlobalRegistry.setDesignerBehaviors([AllBehaviors])

export { paletteResourceGroups }

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

AllResources.forEach((resource) => {
  if (resource.node)
    engine.sourceNodes.registerTree(resource.node)
})

export const selectedNodes = computed(() => engine.getAllSelectedNodes().filter(Boolean) as TreeNode[])

export function getSchemaDocument(): IFormilySchemaDocument {
  const tree = engine.getCurrentTree()
  if (!tree) {
    return {
      form: {},
      schema: {
        type: 'object',
        properties: {},
      },
    }
  }
  return transformToSchema(tree)
}

export function setSchemaDocument(document: IFormilySchemaDocument) {
  engine.setCurrentTree(transformToTreeNode(document))
}
