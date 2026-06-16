import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { commands } from 'vitest/browser'

import DesignerWorkbench from '../components/DesignerWorkbench.vue'
import { createDesigner } from './shared'

describe('designer structure drag and drop', () => {
  it('should reorder existing nodes through structure insertion guides', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    const first = designer.insertNode(designer.createNodeFromMaterial('Input'), {
      parentId: section.node.id,
      container: 'header',
    })
    const second = designer.insertNode(designer.createNodeFromMaterial('Select'), {
      parentId: section.node.id,
      container: 'header',
    })

    await render(DesignerWorkbench, {
      props: {
        designer,
      },
    })

    await commands.dragByHtml5(
      `[data-testid="structure-node-${second.node.id}"]`,
      `[data-testid="structure-insert-${section.node.id}-header-0"]`,
    )

    const headerNodes = designer.tree.getNode(section.node.id)?.slots.header || []
    expect(headerNodes).toHaveLength(2)
    expect(headerNodes[0].id).toBe(second.node.id)
    expect(headerNodes[1].id).toBe(first.node.id)
  })
})
