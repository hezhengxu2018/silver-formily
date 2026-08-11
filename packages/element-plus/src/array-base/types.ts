import type { ArrayField } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import type { Ref } from 'vue'

export interface ArrayBaseAdditionProps {
  method?: 'push' | 'unshift'
  defaultValue?: any
  title?: string
}

export interface ArrayBaseOperationProps {
  title?: string
}

export interface ArrayBaseProps {
  disabled?: boolean
  keyMap?: WeakMap<Record<string, unknown>, string> | string[]
}

export interface ArrayBaseItemProps {
  index: number
  record: any
}

export interface IArrayBaseContext {
  field: Ref<ArrayField>
  schema: Ref<Schema>
  props: ArrayBaseProps
  attrs: {
    [key in string]?: any
  }
  keyMap?: WeakMap<Record<string, unknown>, string> | string[] | null
}

/** @deprecated Use ArrayBaseAdditionProps instead. */
export type IArrayBaseAdditionProps = ArrayBaseAdditionProps

/** @deprecated Use ArrayBaseOperationProps instead. */
export type IArrayBaseOperationProps = ArrayBaseOperationProps

/** @deprecated Use ArrayBaseProps instead. */
export type IArrayBaseProps = ArrayBaseProps

/** @deprecated Use ArrayBaseItemProps instead. */
export type IArrayBaseItemProps = ArrayBaseItemProps
