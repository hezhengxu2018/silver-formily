import type { ArrayField as ArrayFieldType } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '../types'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldContext } from '../shared'
import { ReactiveField } from './ReactiveField'

export function ArrayField<D extends JSXComponent, C extends JSXComponent>(props: IFieldProps<D, C, ArrayFieldType>) {
  const form = useForm()
  const parent = useField()
  const field = useAttach(
    form.createArrayField({
      basePath: parent?.address,
      ...props,
    }) as ArrayFieldType,
  )
  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children as any}</ReactiveField>
    </FieldContext.Provider>
  )
}

ArrayField.displayName = 'ArrayField'
