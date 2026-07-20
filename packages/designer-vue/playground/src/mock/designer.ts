import type { ITreeNode } from '@silver-formily/designer-core'
import { createBehavior, createDesigner, createResource, GlobalRegistry } from '@silver-formily/designer-core'

interface PlaygroundMaterial {
  name: string
  title: string
  icon: string
  container?: boolean
  defaultNode: ITreeNode
}

export interface PlaygroundResourceItem {
  icon: string
  sourceId: string
  title: string
}

export interface PlaygroundResourceGroup {
  items: PlaygroundResourceItem[]
  name: string
}

const materials: PlaygroundMaterial[] = [
  {
    name: 'MockField',
    title: 'Text Field',
    icon: 'T',
    defaultNode: {
      componentName: 'MockField',
      props: {
        label: 'Text Field',
        placeholder: 'Enter text',
      },
    },
  },
  {
    name: 'MockButton',
    title: 'Button',
    icon: 'B',
    defaultNode: {
      componentName: 'MockButton',
      props: {
        label: 'Submit',
      },
    },
  },
  {
    name: 'MockSection',
    title: 'Section',
    icon: 'S',
    container: true,
    defaultNode: {
      componentName: 'MockSection',
      props: {
        title: 'New Section',
      },
      children: [],
    },
  },
]

function cloneDefaultNode(material: PlaygroundMaterial) {
  return JSON.parse(JSON.stringify({
    props: {},
    children: [],
    ...material.defaultNode,
  })) as ITreeNode
}

GlobalRegistry.setDesignerBehaviors([
  createBehavior(
    {
      name: 'Form',
      selector: 'Form',
      designerProps: {
        cloneable: false,
        deletable: false,
        draggable: false,
        droppable: true,
      },
    },
    ...materials.map(material => ({
      name: material.name,
      selector: material.name,
      designerProps: {
        cloneable: true,
        deletable: true,
        draggable: true,
        droppable: !!material.container,
        inlineChildrenLayout: false,
      },
    })),
  ),
])

const resources = createResource(
  ...materials.map(material => ({
    title: material.title,
    elements: [cloneDefaultNode(material)],
  })),
)

export const resourceGroups: PlaygroundResourceGroup[] = [
  {
    name: 'Playground Components',
    items: materials.flatMap((material, index) => {
      const resource = resources[index]
      if (!resource?.node)
        return []

      return [{
        icon: material.icon,
        sourceId: resource.node.id,
        title: material.title,
      }]
    }),
  },
]

export const engine = createDesigner({
  defaultComponentTree: {
    id: 'form-root',
    componentName: 'Form',
    props: {
      title: 'Playground Form',
    },
    children: [
      {
        componentName: 'MockField',
        props: {
          label: 'Name',
          placeholder: 'Jane Doe',
        },
      },
      {
        componentName: 'MockSection',
        props: {
          title: 'Contact',
        },
        children: [
          {
            componentName: 'MockField',
            props: {
              label: 'Email',
              placeholder: 'jane@example.com',
            },
          },
        ],
      },
    ],
  },
  rootComponentName: 'Form',
})

resources.forEach((resource) => {
  if (resource.node)
    engine.sourceNodes.registerTree(resource.node)
})
