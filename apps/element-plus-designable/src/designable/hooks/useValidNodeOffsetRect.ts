import type { TreeNode } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { useViewport } from './useViewport'

export function useValidNodeOffsetRect(nodeRef: Ref<TreeNode | null>) {
  const viewportRef = useViewport()

  return computed(() => {
    const node = nodeRef.value
    const viewport = viewportRef.value
    if (!node || !viewport)
      return null
    return viewport.getValidNodeOffsetRect(node) ?? null
  })
}
