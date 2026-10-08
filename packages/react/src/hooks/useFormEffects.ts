import type { Form } from '@silver-formily/core'
import { useCompatFactory } from '@silver-formily/reactive-react'
import { uid } from '@silver-formily/shared'
import { useForm } from './useForm'

export function useFormEffects(effects?: (form: Form) => void) {
  const form = useForm()
  useCompatFactory(() => {
    const id = uid()
    form.addEffects(id, effects)
    return {
      dispose() {
        form.removeEffects(id)
      },
    }
  })
}
