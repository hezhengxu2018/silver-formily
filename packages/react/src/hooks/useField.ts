import type { GeneralField } from '@silver-formily/core'
import { useContext } from 'react'
import { FieldContext } from '../shared'

export function useField<T = GeneralField>(): T {
  return useContext(FieldContext) as any
}
