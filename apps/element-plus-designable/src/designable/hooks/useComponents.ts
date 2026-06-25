import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { DesignerComponentsSymbol } from '../context'

export function useComponents(): Ref<Record<string, any>> {
  return inject(DesignerComponentsSymbol, ref({}))
}
