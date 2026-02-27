import type { GeneralField } from '@formily/core'
import type { Grid, GridNode, IGridOptions } from '@formily/grid'
import type { ISchema } from '@formily/json-schema'
import type { Component } from 'vue'

// #region visible
export interface QueryFormVisibleContext {
  field?: GeneralField
  schema?: ISchema
  index: number
  node: GridNode
  grid: Grid<HTMLElement>
  collapsed: boolean
  breakpoint: number
}

export type QueryFormVisible = (context: QueryFormVisibleContext) => boolean
// #endregion visible

// #region props
export interface IQueryFormProps {
  schema?: ISchema
  schemaField?: Component
  components?: Record<string, Component>
  scope?: Record<string, any>
  gridProps?: Omit<IGridOptions, 'shouldVisible' | 'maxRows'>
  defaultExpanded?: boolean
  showToggle?: boolean
  actionsAtRowEnd?: boolean
  visibleWhen?: QueryFormVisible
  submitText?: string
  resetText?: string
  expandText?: string
  collapseText?: string
  showSubmit?: boolean
  showReset?: boolean
  submitProps?: Record<string, any>
  resetProps?: Record<string, any>
}
// #endregion props

// #region light-props
export interface IQueryFormLightProps {
  schema?: ISchema
  schemaField?: Component
  components?: Record<string, Component>
  scope?: Record<string, any>
  throttleWait?: number
}
// #endregion light-props

export interface SchemaEntry { name?: string | number, schema: ISchema }
