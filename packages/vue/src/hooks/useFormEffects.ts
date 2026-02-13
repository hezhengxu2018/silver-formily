import type { Form } from '@formily/core'
import { uid } from '@formily/shared'
import { onBeforeUnmount, watchEffect } from 'vue'
import { useForm } from './useForm'

export function useFormEffects(effects?: (form: Form) => void): void {
  const formRef = useForm()

  const stop = watchEffect((onCleanup) => {
    const id = uid()
    formRef.value.addEffects(id, effects)

    onCleanup(() => {
      formRef.value.removeEffects(id)
    })
  })

  onBeforeUnmount(() => stop())
}
