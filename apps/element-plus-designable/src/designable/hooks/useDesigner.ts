import type { Engine } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { DesignerEngineSymbol } from '../context'

export function useDesigner(): Ref<Engine | null> {
  return inject(DesignerEngineSymbol, ref(null))
}
