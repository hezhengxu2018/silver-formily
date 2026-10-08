import type { Field as FieldType } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '../types'
import { useEffect } from 'react'
import { useField, useForm } from '../hooks'
import { FieldContext } from '../shared'
import { ReactiveField } from './ReactiveField'

export function Field<D extends JSXComponent, C extends JSXComponent>(props: IFieldProps<D, C>) {
  const form = useForm()
  const parent = useField()
  const field = form.createField({
    basePath: parent?.address,
    ...props,
  }) as FieldType
  useEffect(() => {
    field?.onMount()
    return () => {
      field?.onUnmount()
    }
  }, [field])
  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children as any}</ReactiveField>
    </FieldContext.Provider>
  )
}

Field.displayName = 'Field'
