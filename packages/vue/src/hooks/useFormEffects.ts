import type { Form } from '@silver-formily/core'
import { uid } from '@silver-formily/shared'
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
