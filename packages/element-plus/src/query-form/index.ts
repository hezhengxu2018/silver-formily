import { composeExport } from '../__builtins__/shared'
import QueryFormLightInner from './query-form-light.vue'
import QueryFormInner from './query-form.vue'
import './style.scss'

export type { IQueryFormLightProps, IQueryFormProps, QueryFormVisible, QueryFormVisibleContext } from './types'

export const QueryForm = composeExport(QueryFormInner, {
  Light: QueryFormLightInner,
})

export default QueryForm
