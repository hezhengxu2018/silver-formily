import type { Form, GeneralField, IFormFeedback } from '@silver-formily/core'
import type { Grid, GridNode, IGridOptions } from '@silver-formily/grid'
import type { ISchema } from '@silver-formily/json-schema'
import type { Component } from 'vue'

export type QueryFormFormProvider = Form | (() => Form | undefined)

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
  form?: QueryFormFormProvider
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
  onAutoSubmit?: (values: Form['values']) => Promise<any>
  onAutoSubmitFailed?: (error: IFormFeedback[]) => void
}
// #endregion props

// #region light-props
export interface IQueryFormLightProps {
  form?: QueryFormFormProvider
  schema?: ISchema
  schemaField?: Component
  components?: Record<string, Component>
  scope?: Record<string, any>
  throttleWait?: number
  onAutoSubmit?: (values: Form['values']) => Promise<any>
  onAutoSubmitFailed?: (error: any) => void
}
// #endregion light-props

export interface SchemaEntry { name?: string | number, schema: ISchema }
