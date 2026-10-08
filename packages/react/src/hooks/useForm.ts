import type { Form } from '@silver-formily/core'
import { useContext } from 'react'
import { FormContext } from '../shared'

export function useForm<T extends object = any>(): Form<T> {
  return useContext(FormContext)
}
