import { DnDProvider } from '@vue-dnd-kit/core'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { commands } from 'vitest/browser'
import { defineComponent, h, onMounted } from 'vue'

import DesignerProvider from '../components/DesignerProvider'
import DesignerWorkbench from '../components/DesignerWorkbench.vue'
import DesignerCanvas from '../components/panels/DesignerCanvas.vue'
import DesignerMaterialsPanel from '../components/panels/DesignerMaterialsPanel.vue'
import { useDesignerDrag } from '../composables'
import { createDesigner } from './shared'

function createMaterialCanvasHarness(designer: ReturnType<typeof createDesigner>) {
  return defineComponent({
    name: 'DesignerMaterialDragHarness',
    setup() {
      return () => h(DesignerProvider, { designer }, {
        default: () => h(DnDProvider, undefined, {
          default: () => h('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: '280px minmax(0, 1fr)',
              gap: '16px',
              alignItems: 'start',
            },
          }, [
            h(DesignerMaterialsPanel),
            h(DesignerCanvas),
          ]),
        }),
      })
    },
  })
}

describe('designer drag and drop', () => {
  it('should reveal insertion guides while a material drag session is active', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    designer.insertNode(designer.createNodeFromMaterial('Select'), {
      parentId: section.node.id,
      container: 'header',
    })

    const DragActivator = defineComponent({
      name: 'DragActivator',
      setup() {
        const { startMaterialDrag } = useDesignerDrag()

        onMounted(() => {
          startMaterialDrag('Input', 'Input')
        })

        return () => null
      },
    })

    const Harness = defineComponent({
      name: 'DesignerDndHarness',
      setup() {
        return () => h(DesignerProvider, { designer }, {
          default: () => h(DnDProvider, undefined, {
            default: () => [h(DragActivator), h(DesignerCanvas)],
          }),
        })
      },
    })

    await render(Harness)

    await expect.element(document.querySelector<HTMLElement>(`[data-testid="canvas-insert-${section.node.id}-header-0"]`)).toBeInTheDocument()
    await expect.element(document.querySelector<HTMLElement>(`[data-testid="canvas-insert-${section.node.id}-header-1"]`)).toBeInTheDocument()
  })

  it('should inspect drag source and target through vitest browser commands', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))

    await render(DesignerWorkbench, {
      props: {
        designer,
      },
    })

    const snapshot = await commands.inspectPointerDrag(
      '[data-testid="material-Input"]',
      `[data-testid="canvas-container-${section.node.id}-header"]`,
    )

    expect(snapshot.source.exists).toBe(true)
    expect(snapshot.target.exists).toBe(true)
    expect(snapshot.source.count).toBeGreaterThan(0)
    expect(snapshot.draggableCount).toBeGreaterThan(0)
    expect(snapshot.droppableCount).toBeGreaterThan(0)
  })

  it('should add a material to the canvas through pointer drag', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))

    const view = await render(createMaterialCanvasHarness(designer))
    await expect.element(view.baseElement.querySelector<HTMLElement>(`[data-testid="canvas-container-${section.node.id}-header"]`)).toBeInTheDocument()

    await commands.dragByPointer(
      '[data-testid="material-Input"]',
      `[data-testid="canvas-container-${section.node.id}-header"]`,
    )

    const headerNodes = designer.tree.getNode(section.node.id)?.slots.header || []
    expect(headerNodes).toHaveLength(1)
    expect(headerNodes[0].componentName).toBe('Input')
  })

  it('should insert a material before existing nodes through pointer drag', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    const existing = designer.insertNode(designer.createNodeFromMaterial('Select'), {
      parentId: section.node.id,
      container: 'header',
    })

    await render(createMaterialCanvasHarness(designer))

    await commands.dragByPointer(
      '[data-testid="material-Input"]',
      `[data-testid="canvas-insert-${section.node.id}-header-0"]`,
    )

    const headerNodes = designer.tree.getNode(section.node.id)?.slots.header || []
    expect(headerNodes).toHaveLength(2)
    expect(headerNodes[0].componentName).toBe('Input')
    expect(headerNodes[1].id).toBe(existing.node.id)
  })

  it('should reorder existing nodes through the insertion guide', async () => {
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
      `[data-testid="canvas-node-drag-${second.node.id}"]`,
      `[data-testid="canvas-insert-${section.node.id}-header-0"]`,
    )

    const headerNodes = designer.tree.getNode(section.node.id)?.slots.header || []
    expect(headerNodes).toHaveLength(2)
    expect(headerNodes[0].id).toBe(second.node.id)
    expect(headerNodes[1].id).toBe(first.node.id)
  })

  it('should move an existing node into another container', async () => {
    const designer = createDesigner()
    const section = designer.insertNode(designer.createNodeFromMaterial('Section'))
    const input = designer.insertNode(designer.createNodeFromMaterial('Input'), {
      parentId: section.node.id,
      container: 'header',
    })

    await render(DesignerWorkbench, {
      props: {
        designer,
      },
    })

    await commands.dragByHtml5(
      `[data-testid="canvas-node-drag-${input.node.id}"]`,
      `[data-testid="canvas-container-${section.node.id}-children"]`,
    )

    const movedSection = designer.tree.getNode(section.node.id)
    expect(movedSection?.slots.header || []).toHaveLength(0)
    expect(movedSection?.children).toHaveLength(1)
    expect(movedSection?.children[0].id).toBe(input.node.id)
  })
})
