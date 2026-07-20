import type { Engine } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { inject, onBeforeUnmount, ref } from 'vue'
import { DesignerEngineSymbol } from '../context'

export function useDesigner(effects?: (engine: Engine) => void | (() => void)): Ref<Engine | null> {
  const designer = inject(DesignerEngineSymbol, ref(null))
  const dispose = designer.value && effects ? effects(designer.value) : undefined

  onBeforeUnmount(() => {
    if (typeof dispose === 'function')
      dispose()
  })

  return designer
}
