import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import DesignerWorkbench from '../components/DesignerWorkbench.vue'
import { createDesigner } from './shared'

describe('designer hover state', () => {
  it('should sync hoveredId from canvas nodes', async () => {
    const designer = createDesigner()
    const inserted = designer.insertNode(designer.createNodeFromMaterial('Input'))

    const screen = await render(DesignerWorkbench, {
      props: {
        designer,
      },
    })

    const target = screen.getByTestId(`canvas-node-${inserted.node.id}`)
    const sidebarHeading = screen.getByRole('heading', { name: 'Materials' })

    await target.hover()
    expect(designer.selection.hoveredId).toBe(inserted.node.id)

    await sidebarHeading.hover()
    expect(designer.selection.hoveredId).toBeUndefined()
  })
})
