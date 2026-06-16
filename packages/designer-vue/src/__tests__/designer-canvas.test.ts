import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import DesignerCanvas from '../components/panels/DesignerCanvas.vue'
import { createDesigner, withDesignerProvider } from './shared'

describe('designerCanvas', () => {
  it('should render configured containers even before they contain children', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    designer.selectNode(section.node.id)

    const screen = await render(withDesignerProvider(DesignerCanvas, designer))

    await expect.element(screen.getByText('Body')).toBeInTheDocument()
    await expect.element(screen.getByText('Header')).toBeInTheDocument()
    await expect.element(screen.getByText('Ready for components').first()).toBeInTheDocument()
  })
})
