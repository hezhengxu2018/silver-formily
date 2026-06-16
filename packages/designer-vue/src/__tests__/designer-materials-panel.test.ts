import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import DesignerMaterialsPanel from '../components/panels/DesignerMaterialsPanel.vue'
import { createDesigner, withDesignerProvider } from './shared'

describe('designerMaterialsPanel', () => {
  it('should insert a node from the selected material', async () => {
    const designer = createDesigner()
    const screen = await render(withDesignerProvider(DesignerMaterialsPanel, designer))

    await screen.getByTestId('material-Input').click()

    expect(designer.exportSchema().children).toHaveLength(1)
    expect(designer.exportSchema().children?.[0].componentName).toBe('Input')
    expect(designer.selection.selectedId).toBe(designer.exportSchema().children?.[0].id)
  })

  it('should insert into the selected container node default container', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    designer.selectNode(section.node.id)

    const screen = await render(withDesignerProvider(DesignerMaterialsPanel, designer))

    await screen.getByTestId('material-Input').click()

    expect(designer.tree.getNode(section.node.id)?.children).toHaveLength(1)
    expect(designer.tree.getNode(section.node.id)?.children[0].componentName).toBe('Input')
  })

  it('should insert after the selected node inside the same container when possible', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    const first = designer.insertNode(designer.createNodeFromMaterial('Input'), {
      parentId: section.node.id,
      container: 'header',
    })
    designer.selectNode(first.node.id)

    const screen = await render(withDesignerProvider(DesignerMaterialsPanel, designer))

    await screen.getByTestId('material-Select').click()

    const headerNodes = designer.tree.getNode(section.node.id)?.slots.header || []
    expect(headerNodes).toHaveLength(2)
    expect(headerNodes[0].componentName).toBe('Input')
    expect(headerNodes[1].componentName).toBe('Select')
  })
})
