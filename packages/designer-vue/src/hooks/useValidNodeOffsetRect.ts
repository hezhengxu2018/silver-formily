import type { TreeNode } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '../shared/reactive'
import { useViewport } from './useViewport'

export function useValidNodeOffsetRect(nodeRef: Ref<TreeNode | null>) {
  const viewportRef = useViewport()

  return reactiveComputed(() => {
    const node = nodeRef.value
    const viewport = viewportRef.value
    if (!node || !viewport)
      return null
    return viewport.getValidNodeOffsetRect(node) ?? null
  })
}
