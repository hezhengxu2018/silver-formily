import type { TreeNode } from '@silver-formily/designer-core'

export function getNodeTitle(node: TreeNode) {
  const title = node.props?.title ?? node.props?.label ?? node.componentName
  return String(title)
}
