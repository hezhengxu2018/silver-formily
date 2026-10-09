import type { IOperation } from './types'
import { isFn } from './checkers'
import { ObserverListeners } from './environment'
import { raw as getRaw } from './externals'
import { DataChange, getDataNode } from './tree'

export function observe(target: object, observer?: (change: DataChange) => void, deep = true) {
  const addListener = (target: object) => {
    const raw = getRaw(target)
    const node = getDataNode(raw as object)

    const listener = (operation: IOperation) => {
      const targetRaw = getRaw(operation.target)
      const targetNode = getDataNode(targetRaw as object)
      if (deep) {
        if (node.contains(targetNode)) {
          observer(new DataChange(operation, targetNode))
          return
        }
      }
      if (
        node === targetNode
        || (node.targetRaw === targetRaw && node.key === operation.key)
      ) {
        observer(new DataChange(operation, targetNode))
      }
    }

    if (node && isFn(observer)) {
      ObserverListeners.add(listener)
    }
    return () => {
      ObserverListeners.delete(listener)
    }
  }
  if (target && typeof target !== 'object')
    throw new Error(`Can not observe ${typeof target} type.`)
  return addListener(target)
}
