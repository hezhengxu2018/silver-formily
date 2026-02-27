import type { TreeNodeData } from 'element-plus'

export function flattenTree(nodes: TreeNodeData[], result: TreeNodeData[] = [], childrenKey = 'children'): TreeNodeData[] {
  for (const node of nodes) {
    result.push(node)
    if (node[childrenKey] && node[childrenKey].length > 0) {
      flattenTree(node[childrenKey], result, childrenKey)
    }
  }
  return result
}

export function addDisabledToNodes(nodes: TreeNodeData[], disabled: boolean, propsConfig: any): TreeNodeData[] {
  if (!disabled) {
    return nodes
  }

  return nodes.map((node) => {
    const newNode = { ...node }
    newNode[propsConfig.disabled!] = true

    if (node[propsConfig.children!] && node[propsConfig.children!].length > 0) {
      newNode[propsConfig.children!] = addDisabledToNodes(node[propsConfig.children!], disabled, propsConfig)
    }

    return newNode
  })
}

export function traverseTree(
  nodes: TreeNodeData[],
  callback: (node: TreeNodeData) => void,
  options: {
    leafOnly?: boolean
    childrenKey?: string
  } = {},
) {
  const { leafOnly = false, childrenKey = 'children' } = options

  for (const node of nodes) {
    const children = node[childrenKey] || []
    const isLeaf = children.length === 0

    if (!leafOnly || isLeaf) {
      callback(node)
    }
    if (children.length > 0) {
      traverseTree(children, callback, options)
    }
  }
}

export function getChildrenKeys(node: TreeNodeData, nodeKey: string, propsConfig: any): any[] {
  const children = node[propsConfig.children!] || []
  if (children.length === 0)
    return []

  const keys: any[] = []
  traverseTree(children, (child) => {
    keys.push(child[nodeKey])
  }, { childrenKey: propsConfig.children })

  return keys
}

export function extractKeysFromPath(pathNodes: TreeNodeData[], nodeKey: string, propsConfig: any): any[] {
  const keys: any[] = []
  traverseTree(pathNodes, (node) => {
    keys.push(node[nodeKey])
  }, { leafOnly: true, childrenKey: propsConfig.children })

  return keys
}

export function getSelectedPath(nodes: TreeNodeData[], selectedKeys: any[], nodeKey: string, propsConfig: any): TreeNodeData[] {
  const result: TreeNodeData[] = []

  for (const node of nodes) {
    const children = node[propsConfig.children!] || []
    const hasSelectedChild = children.length > 0
      ? getSelectedPath(children, selectedKeys, nodeKey, propsConfig).length > 0
      : false

    if (selectedKeys.includes(node[nodeKey]) || hasSelectedChild) {
      const newNode = { ...node }
      if (hasSelectedChild && children.length > 0) {
        newNode[propsConfig.children!] = getSelectedPath(children, selectedKeys, nodeKey, propsConfig)
      }
      result.push(newNode)
    }
  }

  return result
}

/**
 * 查找节点的所有父节点路径
 */
export function findParents(nodes: TreeNodeData[], targetKey: any, nodeKey: string, propsConfig: any, parents: any[] = []): any[] {
  for (const node of nodes) {
    const currentPath = [...parents, node[nodeKey]]

    if (node[nodeKey] === targetKey) {
      return currentPath
    }

    const children = node[propsConfig.children!] || []
    if (children.length > 0) {
      const found = findParents(children, targetKey, nodeKey, propsConfig, currentPath)
      if (found.length > 0) {
        return found
      }
    }
  }
  /* istanbul ignore next -- @preserve */
  return []
}

/**
 * 过滤叶子节点
 */
export function filterLeafNodes(keys: any[], flatData: TreeNodeData[], nodeKey: string, propsConfig: any): any[] {
  return keys.filter((key) => {
    const node = flatData.find(n => n[nodeKey] === key)
    if (!node)
      return false
    const children = node[propsConfig.children!] || []
    return children.length === 0
  })
}

/**
 * 获取输出数据
 */
export function getOutputData(
  keys: any[],
  halfCheckedKeys: any[] = [],
  options: {
    flatData: TreeNodeData[]
    nodeKey: string
    propsConfig: any
    data: TreeNodeData[]
    valueType: string
    includeHalfChecked: boolean
    checkStrictly: boolean
  },
) {
  const { flatData, nodeKey, propsConfig, data, valueType, includeHalfChecked, checkStrictly } = options

  const selectedNodes = flatData.filter(node =>
    keys.includes(node[nodeKey]),
  )

  let outputKeys = [...keys]
  let outputNodes = [...selectedNodes]

  if (checkStrictly) {
    return {
      value: outputKeys,
      nodes: outputNodes,
    }
  }

  switch (valueType) {
    case 'parent': {
      const allChildKeys: any[] = []
      for (const node of selectedNodes) {
        allChildKeys.push(...getChildrenKeys(node, nodeKey, propsConfig))
      }
      outputKeys = keys.filter(key => !allChildKeys.includes(key))
      outputNodes = selectedNodes.filter(node =>
        outputKeys.includes(node[nodeKey]),
      )
      break
    }

    case 'child': {
      for (const node of selectedNodes) {
        const childKeys = getChildrenKeys(node, nodeKey, propsConfig)
        const hasSelectedChild = childKeys.some(key => keys.includes(key))
        if (hasSelectedChild) {
          outputKeys = outputKeys.filter(key => key !== node[nodeKey])
          outputNodes = outputNodes.filter(n =>
            n[nodeKey] !== node[nodeKey],
          )
        }
      }
      break
    }

    case 'path': {
      const selectedPath = getSelectedPath(data, keys, nodeKey, propsConfig)
      return {
        value: selectedPath,
        nodes: selectedPath,
      }
    }

    default: { // 'all'
      if (includeHalfChecked && halfCheckedKeys.length > 0) {
        const halfCheckedNodes = flatData.filter(node =>
          halfCheckedKeys.includes(node[nodeKey]),
        )
        outputKeys = [...outputKeys, ...halfCheckedKeys]
        outputNodes = [...outputNodes, ...halfCheckedNodes]
      }
      break
    }
  }

  return {
    value: outputKeys,
    nodes: outputNodes,
  }
}

/**
 * 根据valueType将输入值转换为checkedKeys
 */
export function getInputKeys(
  inputValue: any,
  options: {
    optionAsValue: boolean
    nodeKey: string
    flatData: TreeNodeData[]
    propsConfig: any
    data: TreeNodeData[]
    valueType: string
    checkStrictly: boolean
  },
): any[] {
  const { optionAsValue, nodeKey, flatData, propsConfig, data, valueType, checkStrictly } = options

  /* istanbul ignore if -- @preserve */
  if (!inputValue || !Array.isArray(inputValue))
    return []

  const valueArray = optionAsValue ? inputValue.map((item: any) => item[nodeKey]) : inputValue

  if (checkStrictly) {
    return valueArray
  }

  switch (valueType) {
    case 'parent': {
      const allKeys = [...valueArray]

      for (const key of valueArray) {
        const node = flatData.find(n => n[nodeKey] === key)
        if (node) {
          const childKeys = getChildrenKeys(node, nodeKey, propsConfig)
          allKeys.push(...childKeys)
        }
      }
      return filterLeafNodes(allKeys, flatData, nodeKey, propsConfig)
    }

    case 'child': {
      const allKeys = [...valueArray]
      for (const key of valueArray) {
        const parentPath = findParents(data, key, nodeKey, propsConfig)
        allKeys.push(...parentPath)
      }
      return filterLeafNodes(allKeys, flatData, nodeKey, propsConfig)
    }

    case 'path': {
      return extractKeysFromPath(valueArray, nodeKey, propsConfig)
    }

    default: { // 'all'
      return filterLeafNodes(valueArray, flatData, nodeKey, propsConfig)
    }
  }
}
