import type { ArrayField } from '@formily/core'
import type { Schema } from '@formily/json-schema'
import type { Ref } from 'vue'

export interface IArrayBaseAdditionProps {
  method?: 'push' | 'unshift'
  defaultValue?: any
  title?: string
}

export interface IArrayBaseOperationProps {
  title?: string
}

export interface IArrayBaseProps {
  disabled?: boolean
  keyMap?: WeakMap<Record<string, unknown>, string> | string[]
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export interface IArrayBaseContext {
  field: Ref<ArrayField>
  schema: Ref<Schema>
  props: IArrayBaseProps
  attrs: {
    [key in string]?: any
  }
  keyMap?: WeakMap<Record<string, unknown>, string> | string[] | null
}
