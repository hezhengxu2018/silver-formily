import type { DesignerCore, DesignerNode } from '@silver-formily/designer-core'

function canReceiveChildren(node?: DesignerNode) {
  if (!node)
    return false

  if (node.isRoot)
    return true

  if (node.children.length > 0)
    return true

  if (Object.keys(node.slots || {}).length > 0)
    return true

  if (node.metadata?.designer?.container === true)
    return true

  return ['Form', 'Root', 'Section', 'Card', 'Group'].includes(node.componentName)
}

export function resolveInsertionTarget(designer: DesignerCore) {
  const selectedNode = designer.selection.selectedId
    ? designer.tree.getNode(designer.selection.selectedId)
    : undefined

  if (canReceiveChildren(selectedNode)) {
    return {
      parentId: selectedNode?.id,
    }
  }

  if (selectedNode?.parent) {
    return {
      parentId: selectedNode.parent.id,
    }
  }

  return {
    parentId: designer.tree.root.id,
  }
}
