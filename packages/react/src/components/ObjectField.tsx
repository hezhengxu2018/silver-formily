import type { ObjectField as ObjectFieldType } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '../types'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldContext } from '../shared'
import { ReactiveField } from './ReactiveField'

export function ObjectField<D extends JSXComponent, C extends JSXComponent>(props: IFieldProps<D, C, ObjectFieldType>) {
  const form = useForm()
  const parent = useField()
  const field = useAttach(
    form.createObjectField({ basePath: parent?.address, ...props }) as ObjectFieldType,
  )
  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children as any}</ReactiveField>
    </FieldContext.Provider>
  )
}

ObjectField.displayName = 'ObjectField'
