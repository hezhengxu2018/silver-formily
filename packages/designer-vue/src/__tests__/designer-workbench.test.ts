import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import DesignerWorkbench from '../components/DesignerWorkbench.vue'
import { createDesigner } from './shared'

describe('designerWorkbench', () => {
  it('should render the assembled workbench panels', async () => {
    const screen = await render(DesignerWorkbench, {
      props: {
        designer: createDesigner(),
      },
    })

    await expect.element(screen.getByRole('heading', { name: 'Materials' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Structure' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Canvas' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Properties' })).toBeInTheDocument()
  })
})
