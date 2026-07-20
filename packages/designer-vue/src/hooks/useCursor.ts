import type { Cursor } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { useDesigner } from './useDesigner'

export function useCursor(): Ref<Cursor | null> {
  const designerRef = useDesigner()
  return reactiveComputed(() => designerRef.value?.cursor ?? null)
}
