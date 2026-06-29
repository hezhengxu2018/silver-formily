import type { TreeNode } from './TreeNode'

export class TreeNodeRegistry {
  private nodes = new Map<string, TreeNode>()

  get(id: string) {
    return this.nodes.get(id)
  }

  has(id: string) {
    return this.nodes.has(id)
  }

  register(node: TreeNode) {
    this.nodes.set(node.id, node)
  }

  unregister(node: TreeNode) {
    this.unregisterTree(node)
  }

  unregisterChildren(node: TreeNode, retainedChildren: TreeNode[] = []) {
    const retained = new Set(retainedChildren)
    node.children.forEach((child) => {
      if (!retained.has(child))
        this.unregisterTree(child)
    })
  }

  rename(node: TreeNode, nextId: string) {
    this.nodes.delete(node.id)
    node.id = nextId
    this.register(node)
  }

  rebindTree(node: TreeNode, root: TreeNode) {
    if (node.root && node.root !== root) {
      node.root.nodeRegistry.unregisterTree(node)
    }
    this.bindRoot(node, root)
    root.nodeRegistry.registerTree(node)
  }

  registerTree(node: TreeNode) {
    this.register(node)
    node.children.forEach(child => this.registerTree(child))
  }

  unregisterTree(node: TreeNode) {
    node.children.forEach(child => this.unregisterTree(child))
    this.nodes.delete(node.id)
  }

  private bindRoot(node: TreeNode, root: TreeNode) {
    node.root = root
    node.children.forEach(child => this.bindRoot(child, root))
  }
}
