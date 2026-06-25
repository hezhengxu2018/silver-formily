import type { TreeNode, Workspace } from '@silver-formily/designer-core'
import type { ICoordinates } from '@vue-dnd-kit/core'
import type { DesignerMaterialDefinition, PaletteMaterialGroup, PaletteMaterialItem } from '../materials'
import { createBehavior, createDesigner, createResource, GlobalRegistry } from '@silver-formily/designer-core'
import { autorun } from '@silver-formily/reactive'
import { shallowRef } from 'vue'
import { materialGroups, materials } from '../materials'

export interface PaletteResourceItem extends PaletteMaterialItem {
  sourceId: string
}

export interface PaletteResourceGroup extends Omit<PaletteMaterialGroup, 'items'> {
  items: PaletteResourceItem[]
}

function cloneDefaultNode(material: DesignerMaterialDefinition) {
  const node = typeof material.defaultNode === 'function'
    ? material.defaultNode()
    : material.defaultNode

  return JSON.parse(JSON.stringify({
    componentName: material.runtimeComponent ?? material.name,
    props: {},
    children: [],
    ...node,
  }))
}

function getMaterialDesignerMetadata(material: DesignerMaterialDefinition) {
  const defaultNode = typeof material.defaultNode === 'function'
    ? material.defaultNode()
    : material.defaultNode
  return material.designer ?? defaultNode?.metadata?.designer
}

function createMaterialBehaviors() {
  return createBehavior(
    {
      name: 'Form',
      selector: 'Form',
      designerProps: {
        droppable: true,
        draggable: false,
      },
    },
    ...materials.map(material => ({
      name: material.runtimeComponent ?? material.name,
      selector: material.runtimeComponent ?? material.name,
      designerProps: {
        droppable: !!getMaterialDesignerMetadata(material)?.container,
        draggable: (material.runtimeComponent ?? material.name) !== 'Form',
        deletable: true,
        cloneable: true,
        inlineChildrenLayout: false,
      },
    })),
  )
}

const resources = createResource(
  ...materials.map(material => ({
    title: material.title,
    elements: [cloneDefaultNode(material)],
  })),
)

const resourceIdByMaterialName = new Map(
  materials.map((material, index) => [
    material.name,
    resources[index]?.node?.children?.[0]?.id ?? '',
  ]),
)

const materialByComponentName = new Map<string, DesignerMaterialDefinition>()
materials.forEach((material) => {
  materialByComponentName.set(material.runtimeComponent ?? material.name, material)
})

const paletteResourceGroups: PaletteResourceGroup[] = materialGroups.map(group => ({
  ...group,
  items: group.items.map(item => ({
    ...item,
    sourceId: resourceIdByMaterialName.get(item.name) ?? '',
  })),
}))

GlobalRegistry.setDesignerBehaviors([createMaterialBehaviors()])

const engine = createDesigner({
  defaultComponentTree: {
    id: 'form-root',
    componentName: 'Form',
    props: {
      title: 'Untitled Form',
    },
    children: [],
  },
  mountTarget: false,
} as any) as any

const workspace = shallowRef<Workspace | null>(null)
let activePaletteSourceId: string | null = null

function ensureWorkspace(): Workspace {
  if (!workspace.value) {
    workspace.value = engine.workbench.ensureWorkspace({
      id: 'element-plus-form-builder',
    })
    engine.workbench.setActiveWorkspace(workspace.value)
  }
  return workspace.value as Workspace
}

function pointToDragInput(point?: ICoordinates) {
  return {
    clientX: point?.x ?? 0,
    clientY: point?.y ?? 0,
    pageX: point?.x ?? 0,
    pageY: point?.y ?? 0,
  }
}

function getDragController() {
  const drag = engine?.drag
  if (
    drag
    && typeof drag.start === 'function'
    && typeof drag.move === 'function'
    && typeof drag.stop === 'function'
  ) {
    return drag
  }
  return null
}

function resolveTouchNodeId(point?: ICoordinates) {
  if (!point || typeof document === 'undefined')
    return
  const nodeIdAttrName = engine.props.nodeIdAttrName ?? 'data-designer-node-id'
  const target = document.elementFromPoint(point.x, point.y) as HTMLElement | null
  return target
    ?.closest?.(`[${nodeIdAttrName}]`)
    ?.getAttribute?.(nodeIdAttrName)
    ?? undefined
}

function mountViewport(element: HTMLElement) {
  const currentWorkspace = ensureWorkspace()
  currentWorkspace.viewport.onMount(element, window)
  engine.workbench.setActiveWorkspace(currentWorkspace)
  return currentWorkspace
}

function startPaletteDrag(sourceId: string, point?: ICoordinates) {
  ensureWorkspace()
  const drag = getDragController()
  if (!drag)
    return

  drag.start({
    sourceId,
    ...pointToDragInput(point),
  })
  activePaletteSourceId = sourceId
  if (point) {
    movePaletteDrag(point)
  }
}

function movePaletteDrag(point?: ICoordinates) {
  const drag = getDragController()
  if (!drag)
    return

  drag.move({
    touchNodeId: resolveTouchNodeId(point),
    ...pointToDragInput(point),
  })
}

function syncPaletteDrag(sourceId: string, point?: ICoordinates) {
  if (activePaletteSourceId !== sourceId) {
    startPaletteDrag(sourceId, point)
    return
  }
  movePaletteDrag(point)
}

function endPaletteDrag(point?: ICoordinates) {
  const drag = getDragController()
  if (!drag)
    return

  if (point) {
    movePaletteDrag(point)
  }
  drag.stop(pointToDragInput(point))
  activePaletteSourceId = null
}

function getRootNode() {
  return ensureWorkspace().operation.tree
}

function getSelection() {
  return ensureWorkspace().operation.selection
}

function getSelectedIds() {
  return [...getSelection().selected]
}

function getSelectedNode() {
  const currentWorkspace = ensureWorkspace()
  const selectedId = getSelection().last || getSelection().first
  return selectedId
    ? currentWorkspace.operation.tree.findById(selectedId)
    : currentWorkspace.operation.tree
}

function isNodeSelected(node: TreeNode) {
  return getSelectedIds().includes(node.id)
}

function selectNode(node: TreeNode) {
  getSelection().select(node)
}

function duplicateNode(node: TreeNode) {
  if (!node.allowClone() || !node.parent)
    return
  const cloned = node.clone()
  if (!cloned)
    return
  node.insertAfter(cloned)
  selectNode(cloned)
}

function removeNode(node: TreeNode) {
  ensureWorkspace().operation.removeNodes([node])
}

function getNodeMaterial(node: TreeNode) {
  if (node.componentName === 'Form')
    return null
  return materialByComponentName.get(node.componentName) ?? null
}

function getNodeDisplayTitle(node: TreeNode) {
  if (node.componentName === 'Form')
    return 'Form'
  return getNodeMaterial(node)?.title ?? node.componentName
}

function isContainerNode(node: TreeNode) {
  if (node.componentName === 'Form')
    return true
  const material = getNodeMaterial(node)
  return !!material && !!getMaterialDesignerMetadata(material)?.container
}

function serializeTree() {
  return getRootNode().serialize()
}

function flattenTree(
  node: TreeNode = getRootNode(),
  depth = 0,
): Array<{
  id: string
  depth: number
  name: string
  type: string
  selected: boolean
}> {
  const current = [{
    id: node.id,
    depth,
    name: getNodeDisplayTitle(node),
    type: node.componentName,
    selected: getSelectedNode()?.id === node.id,
  }]

  return current.concat(
    node.children.flatMap(child => flattenTree(child, depth + 1)),
  )
}

function getNodePlaceholder(node: TreeNode) {
  const value = node.props?.placeholder
  return typeof value === 'string' ? value : ''
}

function getClosestNode() {
  return ensureWorkspace().operation.getClosestNode()
}

function getClosestPosition() {
  return ensureWorkspace().operation.getClosestPosition()
}

ensureWorkspace()

autorun(() => {
  const selection = getSelection()
  const selected = [...selection.selected]
  if (!selected.length)
    return
  if (selected.length > 1)
    selection.batchSelect([selected[selected.length - 1]])
})

export function useEditorDesigner() {
  return {
    engine,
    workspace,
    paletteResourceGroups,
    mountViewport,
    startPaletteDrag,
    syncPaletteDrag,
    movePaletteDrag,
    endPaletteDrag,
    getRootNode,
    getSelectedIds,
    getSelectedNode,
    isNodeSelected,
    selectNode,
    duplicateNode,
    removeNode,
    getNodeDisplayTitle,
    getNodeMaterial,
    getNodePlaceholder,
    isContainerNode,
    serializeTree,
    flattenTree,
    getClosestNode,
    getClosestPosition,
  }
}
