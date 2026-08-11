import type { Form } from '@silver-formily/core'
import type { ISchema } from '@silver-formily/json-schema'
import type { PaginationProps } from 'element-plus'
import type { FormItemProps } from '../form-item'
import type { QueryFormLightProps, QueryFormProps } from '../query-form'

export type QueryFormItemMode = 'default' | 'light'

export interface QueryFormItemPagination {
  current: number
  pageSize: number
}

export interface QueryFormItemPaginationMap {
  current?: string
  pageSize?: string
}

export interface QueryFormItemRequestResultObject {
  data: any[]
  success: boolean
  total?: number
}

export type QueryFormItemRequest = (
  params: Record<string, any> & Partial<QueryFormItemPagination>,
) => Promise<QueryFormItemRequestResultObject>

export type QueryFormItemPaginationProps = Partial<PaginationProps>

type QueryFormDefaultComponentProps = Omit<QueryFormProps, 'schema'>
type QueryFormLightComponentProps = Omit<QueryFormLightProps, 'schema'>

export type QueryFormItemQueryProps = Partial<QueryFormDefaultComponentProps & QueryFormLightComponentProps> & {
  form?: Form | (() => Form | undefined)
  schema?: ISchema
}

export interface QueryFormItemProps extends FormItemProps {
  mode?: QueryFormItemMode
  request?: QueryFormItemRequest
  clearOnDataChange?: boolean
  querySchema?: ISchema
  queryFormProps?: QueryFormItemQueryProps
  pagination?: boolean
  paginationProps?: QueryFormItemPaginationProps
  paginationMap?: QueryFormItemPaginationMap
  immediate?: boolean
}

/** @deprecated Use QueryFormItemProps instead. */
export type IQueryFormItemProps = QueryFormItemProps

export interface QueryFormItemRequestSuccessPayload {
  values: Record<string, any>
  pagination?: QueryFormItemPagination
  dataSource: any[]
  total?: number
  result: QueryFormItemRequestResultObject
}

export interface QueryFormItemSelectedListItem {
  value: any
  rawValue: any
  record?: Record<string, any>
  index: number
}

export type QueryFormItemSelectedListText = (
  item: QueryFormItemSelectedListItem,
) => string
