import type { Form } from '@formily/core'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { FormSymbol } from '../shared/context'

export function useForm() {
  const form = inject(FormSymbol, ref())
  return form as Ref<Form>
}
