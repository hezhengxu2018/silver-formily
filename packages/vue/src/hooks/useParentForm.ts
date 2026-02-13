import type { Form, GeneralField, ObjectField } from '@formily/core'
import type { Ref } from 'vue'
import { isObjectField } from '@formily/core'
import { computed } from 'vue'
import { useField } from './useField'
import { useForm } from './useForm'

export function useParentForm(): Ref<Form | ObjectField> {
  const field = useField()
  const form = useForm()
  const findObjectParent = (field: GeneralField) => {
    if (!field)
      return form.value
    if (isObjectField(field))
      return field
    return findObjectParent(field?.parent)
  }
  return computed(() => findObjectParent(field.value))
}
