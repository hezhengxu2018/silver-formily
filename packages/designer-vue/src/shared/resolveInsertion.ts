import type { DesignerCore, DesignerNode } from '@silver-formily/designer-core'

function resolveContainerTarget(node: DesignerNode, componentName?: string, preferredContainer?: string) {
  if (preferredContainer && node.canAcceptChild(componentName, preferredContainer)) {
    return {
      parentId: node.id,
      container: preferredContainer,
    }
  }

  if (node.isContainer && node.canAcceptChild(componentName, node.defaultContainer)) {
    return {
      parentId: node.id,
      container: node.defaultContainer,
    }
  }

  const fallback = node.availableContainers.find(container => node.canAcceptChild(componentName, container.name))
  if (!fallback)
    return undefined

  return {
    parentId: node.id,
    container: fallback.name,
  }
}

export function resolveInsertionTarget(designer: DesignerCore, componentName?: string) {
  const selectedNode = designer.selection.selectedId
    ? designer.tree.getNode(designer.selection.selectedId)
    : undefined

  if (selectedNode) {
    const ownTarget = resolveContainerTarget(selectedNode, componentName)
    if (ownTarget)
      return ownTarget
  }

  let current = selectedNode
  while (current?.parent) {
    const parent = current.parent
    const siblingTarget = resolveContainerTarget(parent, componentName, current.container)
    if (siblingTarget) {
      const location = designer.tree.getLocation(current.id)
      return {
        ...siblingTarget,
        index: location.index + 1,
      }
    }

    const ancestorTarget = resolveContainerTarget(parent, componentName)
    if (ancestorTarget)
      return ancestorTarget

    current = parent
  }

  return resolveContainerTarget(designer.tree.root, componentName) || {
    parentId: designer.tree.root.id,
    container: designer.tree.root.defaultContainer,
  }
}
