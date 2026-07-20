import type { Component } from 'vue'
import { TreeNode } from '@silver-formily/designer-core'

export type ComponentNameMatcher
  = | string
    | string[]
    | ((name: string, node: TreeNode, context?: unknown) => boolean)

export function composeExport<T extends Component, E extends Record<string, unknown>>(component: T, exports: E): T & E {
  return Object.assign(component, exports)
}

export function matchComponent(node: TreeNode, name: ComponentNameMatcher, context?: unknown) {
  if (name === '*')
    return true
  const componentName = node?.props?.['x-component']
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name))
    return name.includes(componentName)
  return componentName === name
}

export function matchChildComponent(node: TreeNode, name: ComponentNameMatcher, context?: unknown) {
  if (name === '*')
    return true
  const componentName = node?.props?.['x-component']
  if (!componentName)
    return false
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name))
    return name.includes(componentName)
  return componentName.includes(`${name}.`)
}

export function queryNodesByComponentPath(node: TreeNode, path: ComponentNameMatcher[]): TreeNode[] {
  if (!path.length)
    return []
  if (path.length === 1)
    return matchComponent(node, path[0]) ? [node] : []
  if (!matchComponent(node, path[0]))
    return []
  return node.children.reduce<TreeNode[]>((buffer, child) => {
    buffer.push(...queryNodesByComponentPath(child, path.slice(1)))
    return buffer
  }, [])
}

export function findNodeByComponentPath(node: TreeNode, path: ComponentNameMatcher[]): TreeNode | undefined {
  if (!path.length)
    return undefined
  if (path.length === 1)
    return matchComponent(node, path[0]) ? node : undefined
  if (!matchComponent(node, path[0]))
    return undefined
  for (const child of node.children) {
    const result = findNodeByComponentPath(child, path.slice(1))
    if (result)
      return result
  }
}

export function hasNodeByComponentPath(node: TreeNode, path: ComponentNameMatcher[]) {
  return !!findNodeByComponentPath(node, path)
}

export function resolveComponentPath(components: Record<string, any>, path?: string) {
  if (!path)
    return null
  if (components[path])
    return components[path]
  return path.split('.').reduce<any>((current, key) => current?.[key], components)
}

export function createEnsureTypeItemsNode(type: string) {
  return (node: TreeNode) => {
    const objectNode = node.children.find(child => child.props?.type === type)
    if (objectNode)
      return objectNode

    const newObjectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type,
      },
    })
    node.prepend(newObjectNode)
    return newObjectNode
  }
}
