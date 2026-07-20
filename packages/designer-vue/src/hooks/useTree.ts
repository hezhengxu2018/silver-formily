import type { TreeNode } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { useOperation } from './useOperation'

export function useTree(): Ref<TreeNode | null> {
  const operationRef = useOperation()
  return reactiveComputed(() => operationRef.value?.tree ?? null)
}
