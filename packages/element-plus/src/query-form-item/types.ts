import type { Form } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import type { PaginationProps } from 'element-plus'
import type { IFormItemProps } from '../form-item'
import type { IQueryFormLightProps, IQueryFormProps } from '../query-form'

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

type QueryFormDefaultProps = Omit<IQueryFormProps, 'schema'>
type QueryFormLightProps = Omit<IQueryFormLightProps, 'schema'>

export type QueryFormItemQueryProps = Partial<QueryFormDefaultProps & QueryFormLightProps> & {
  form?: Form | (() => Form | undefined)
  schema?: ISchema
}

export interface IQueryFormItemProps extends IFormItemProps {
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

export interface QueryFormItemRequestSuccessPayload {
  values: Record<string, any>
  pagination?: QueryFormItemPagination
  dataSource: any[]
  total?: number
  result: QueryFormItemRequestResultObject
}
