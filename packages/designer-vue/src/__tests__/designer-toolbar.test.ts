import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import DesignerToolbar from '../components/panels/DesignerToolbar.vue'
import { createDesigner, withDesignerProvider } from './shared'

describe('designerToolbar', () => {
  it('should delete the selected node and support undo redo', async () => {
    const designer = createDesigner()
    const inserted = designer.insertNode(designer.createNodeFromMaterial('Input'), {
      parentId: designer.tree.root.id,
    })
    designer.selectNode(inserted.node.id)

    const screen = await render(withDesignerProvider(DesignerToolbar, designer))

    await screen.getByTestId(`toolbar-delete-${inserted.node.id}`).click()
    expect(designer.exportSchema().children).toHaveLength(0)

    await screen.getByRole('button', { name: 'Undo' }).click()
    expect(designer.exportSchema().children).toHaveLength(1)

    await screen.getByRole('button', { name: 'Redo' }).click()
    expect(designer.exportSchema().children).toHaveLength(0)
  })
})
