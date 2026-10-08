import type { VoidField as VoidFieldType } from '@silver-formily/core'
import type { IVoidFieldProps, JSXComponent } from '../types'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldContext } from '../shared'
import { ReactiveField } from './ReactiveField'

export function VoidField<D extends JSXComponent, C extends JSXComponent>(props: IVoidFieldProps<D, C>) {
  const form = useForm()
  const parent = useField()
  const field = useAttach(
    form.createVoidField({ basePath: parent?.address, ...props }) as VoidFieldType,
  )
  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children as any}</ReactiveField>
    </FieldContext.Provider>
  )
}

VoidField.displayName = 'VoidField'
