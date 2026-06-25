import type { TreeNode } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { TreeNodeSymbol } from '../context'

export function useNode(): Ref<TreeNode | null> {
  return inject(TreeNodeSymbol, ref(null))
}
