import type { MoveHelper } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '../shared/reactive'
import { useOperation } from './useOperation'

export function useMoveHelper(): Ref<MoveHelper | null> {
  const operationRef = useOperation()
  return reactiveComputed(() => operationRef.value?.moveHelper ?? null)
}
