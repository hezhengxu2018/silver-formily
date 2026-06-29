import type { TreeNode } from './TreeNode'

export class SourceNodeRegistry {
  private nodes = new Map<string, TreeNode>()

  private roots = new Set<TreeNode>()

  get(id: string) {
    if (!id)
      return
    const node = this.nodes.get(id)
    if (this.isAlive(node, id))
      return node
    this.nodes.delete(id)
    for (const root of this.roots) {
      const matched = root.findById(id)
      if (matched) {
        this.registerTree(root)
        return matched
      }
    }
  }

  register(node: TreeNode) {
    this.nodes.set(node.id, node)
    this.roots.add(node.root || node)
  }

  registerTree(node: TreeNode) {
    this.roots.add(node.root || node)
    this.register(node)
    node.children.forEach(child => this.registerTree(child))
  }

  unregister(node: TreeNode) {
    this.unregisterTree(node)
    if (!node.root || node.root === node)
      this.roots.delete(node.root || node)
  }

  unregisterTree(node: TreeNode) {
    node.children.forEach(child => this.unregisterTree(child))
    this.nodes.delete(node.id)
  }

  clear() {
    this.nodes.clear()
    this.roots.clear()
  }

  private isAlive(node: TreeNode, id: string) {
    return !!node && node.root?.findById(id) === node
  }
}
