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
})
