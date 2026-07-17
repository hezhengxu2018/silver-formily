import type { GeneralField } from '@silver-formily/core'
import { isVoidField } from '@silver-formily/core'

export function getFieldControlId(field?: GeneralField) {
  if (!field || isVoidField(field))
    return

  const address = field.address.toString()
  if (!address)
    return

  const formId = field.form.id || 'settings'
  return `settings-${formId}-${address}`.replace(/[^\w-]/g, '-')
}

export function fieldControlIdMapper(
  props: Record<string, any>,
  field?: GeneralField,
) {
  return {
    ...props,
    id: props.id ?? getFieldControlId(field),
  }
}
