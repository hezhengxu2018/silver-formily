import { describe, expect, it } from 'vitest'

import { DesignerCore } from '../models/DesignerCore'
import { DesignerTree } from '../models/DesignerTree'

function createDesigner() {
  return new DesignerCore({
    schema: {
      componentName: 'Form',
      children: [
        {
          id: 'input_1',
          componentName: 'Input',
          props: {
            placeholder: 'name',
          },
        },
      ],
    },
    materials: [
      {
        name: 'Input',
        title: 'Input',
        group: 'Fields',
        defaultNode: {
          props: {
            placeholder: 'input value',
          },
        },
      },
      {
        name: 'Section',
        title: 'Section',
        group: 'Layout',
        defaultNode: {
          children: [],
          slots: {
            header: [],
          },
        },
      },
    ],
  })
}

describe('designer tree', () => {
  it('should import schema and index nodes', () => {
    const tree = new DesignerTree({
      schema: {
        componentName: 'Form',
        children: [
          {
            id: 'section_1',
            componentName: 'Section',
            slots: {
              header: [
                {
                  id: 'header_input',
                  componentName: 'Input',
                },
              ],
            },
          },
        ],
      },
    })

    expect(tree.getNode('section_1')?.componentName).toBe('Section')
    expect(tree.getNode('header_input')?.parent?.id).toBe('section_1')
    expect(tree.getNode('header_input')?.container).toBe('header')
  })

  it('should move nodes across containers', () => {
    const tree = new DesignerTree({
      schema: {
        id: 'form_root',
        componentName: 'Form',
        children: [
          {
            id: 'section_1',
            componentName: 'Section',
            children: [],
            slots: {
              header: [],
            },
          },
          {
            id: 'input_1',
            componentName: 'Input',
          },
        ],
      },
    })

    tree.moveNode('input_1', {
      parentId: 'section_1',
      container: 'header',
    })

    expect(tree.getNode('input_1')?.parent?.id).toBe('section_1')
    expect(tree.getNode('input_1')?.container).toBe('header')
    expect(tree.exportSchema().children?.[0].slots?.header).toHaveLength(1)
  })

  it('should prevent moving nodes into descendants', () => {
    const tree = new DesignerTree({
      schema: {
        componentName: 'Form',
        children: [
          {
            id: 'section_1',
            componentName: 'Section',
            children: [
              {
                id: 'input_1',
                componentName: 'Input',
              },
            ],
          },
        ],
      },
    })

    expect(() => tree.moveNode('section_1', {
      parentId: 'input_1',
    })).toThrowError(/Cannot move/)
  })
})

describe('designer core', () => {
  it('should create nodes from registered materials', () => {
    const designer = createDesigner()
    const schema = designer.createNodeFromMaterial('Input', {
      props: {
        clearable: true,
      },
    })

    expect(schema.componentName).toBe('Input')
    expect(schema.id).toBeTruthy()
    expect(schema.props).toEqual({
      placeholder: 'input value',
      clearable: true,
    })
  })

  it('should support insert update remove and history', () => {
    const designer = createDesigner()
    const inserted = designer.insertNode(designer.createNodeFromMaterial('Input'))

    expect(designer.exportSchema().children).toHaveLength(2)
    expect(designer.selection.selectedId).toBe(inserted.node.id)

    designer.updateNode(inserted.node.id, {
      props: {
        placeholder: 'email',
      },
    })

    expect(designer.tree.getNode(inserted.node.id)?.props.placeholder).toBe('email')

    designer.undo()
    expect(designer.tree.getNode(inserted.node.id)?.props.placeholder).toBe('input value')

    designer.undo()
    expect(designer.tree.getNode(inserted.node.id)).toBeUndefined()

    designer.redo()
    expect(designer.tree.getNode(inserted.node.id)?.componentName).toBe('Input')

    designer.removeNode(inserted.node.id)
    expect(designer.tree.getNode(inserted.node.id)).toBeUndefined()
  })

  it('should duplicate nodes with fresh ids', () => {
    const designer = createDesigner()
    const duplicate = designer.duplicateNode('input_1')

    expect(duplicate.node.id).not.toBe('input_1')
    expect(designer.exportSchema().children).toHaveLength(2)
    expect(designer.exportSchema().children?.[1].componentName).toBe('Input')
  })

  it('should run built-in commands and emit events', () => {
    const designer = createDesigner()
    const events: string[] = []

    designer.subscribe((event) => {
      events.push(event.type)
    })

    const created = designer.commands.execute('createNodeFromMaterial', {
      name: 'Section',
    })

    designer.commands.execute('insertNode', {
      schema: created.result,
      options: {
        parentId: designer.tree.root.id,
      },
    })

    designer.commands.execute('select', {
      nodeId: designer.exportSchema().children?.[1].id,
    })

    expect(events).toContain('tree:changed')
    expect(events).toContain('selection:changed')
    expect(events).toContain('command:executed')
  })

  it('should keep selection valid after import', () => {
    const designer = createDesigner()
    designer.selectNode('input_1')

    designer.importSchema({
      componentName: 'Form',
      children: [],
    })

    expect(designer.selection.selectedId).toBeUndefined()
  })
})
