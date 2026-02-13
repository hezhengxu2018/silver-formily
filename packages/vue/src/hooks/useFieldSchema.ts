import { inject, ref } from 'vue'
import { SchemaSymbol } from '../shared/context'

export function useFieldSchema() {
  return inject(SchemaSymbol, ref())
}
