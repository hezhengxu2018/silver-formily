import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import DesignerPropertiesPanel from '../components/panels/DesignerPropertiesPanel.vue'
import { createDesigner, withDesignerProvider } from './shared'

describe('designerPropertiesPanel', () => {
  it('should update the selected node title', async () => {
    const designer = createDesigner()
    const inserted = designer.insertNode(designer.createNodeFromMaterial('Input'), {
      parentId: designer.tree.root.id,
    })
    designer.selectNode(inserted.node.id)

    const screen = await render(withDesignerProvider(DesignerPropertiesPanel, designer))

    await screen.getByTestId('properties-name').fill('customerName')
    await screen.getByTestId('properties-title').fill('Customer Name')
    await screen.getByTestId('properties-setter-placeholder').fill('Please enter your full name')
    await screen.getByTestId('properties-apply').click()

    expect(designer.exportSchema().children?.[0].title).toBe('Customer Name')
    expect(designer.exportSchema().children?.[0].metadata?.name).toBe('customerName')
    expect(designer.exportSchema().children?.[0].props?.placeholder).toBe('Please enter your full name')
  })

  it('should update boolean and array setters for select materials', async () => {
    const designer = createDesigner()
    const inserted = designer.insertNode(designer.createNodeFromMaterial('Select'), {
      parentId: designer.tree.root.id,
    })
    designer.selectNode(inserted.node.id)

    const screen = await render(withDesignerProvider(DesignerPropertiesPanel, designer))

    await screen.getByTestId('properties-setter-clearable').click()
    await screen.getByTestId('properties-setter-options').fill(JSON.stringify([
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ], null, 2))
    await screen.getByTestId('properties-apply').click()

    expect(designer.exportSchema().children?.[0].props?.clearable).toBe(false)
    expect(designer.exportSchema().children?.[0].props?.options).toEqual([
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ])
  })

  it('should import schema from the schema editor', async () => {
    const designer = createDesigner()
    const screen = await render(withDesignerProvider(DesignerPropertiesPanel, designer))

    await screen.getByTestId('properties-schema').fill(JSON.stringify({
      componentName: 'Form',
      title: 'Imported Form',
      metadata: {
        designer: {
          container: true,
        },
      },
      children: [
        {
          componentName: 'Section',
          title: 'Imported Section',
        },
      ],
    }))
    await screen.getByTestId('properties-import-schema').click()

    expect(designer.exportSchema().title).toBe('Imported Form')
    expect(designer.exportSchema().children?.[0].title).toBe('Imported Section')
  })
})
