import type { Operation } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { useOperation } from './useOperation'

export function useHover(): Ref<Operation['hover'] | null> {
  const operationRef = useOperation()
  return reactiveComputed(() => operationRef.value?.hover ?? null)
}
