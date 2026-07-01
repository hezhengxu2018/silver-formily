import type { TreeNode } from '@silver-formily/designer-core'
import { createDesigner, GlobalRegistry } from '@silver-formily/designer-core'
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
