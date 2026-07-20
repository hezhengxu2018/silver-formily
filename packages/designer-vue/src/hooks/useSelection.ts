import type { Selection } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { useOperation } from './useOperation'

export function useSelection(): Ref<Selection | null> {
  const operationRef = useOperation()
  return reactiveComputed(() => operationRef.value?.selection ?? null)
}
