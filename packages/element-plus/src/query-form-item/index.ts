import { connect, mapProps } from '@silver-formily/vue'
import { fieldFeedbackMapper } from '../form-item'
import QueryFormItemInner from './query-form-item.vue'
import QueryFormItemSelectedList from './selected-list.vue'
import './style.scss'

export type {
  IQueryFormItemProps,
  QueryFormItemMode,
  QueryFormItemPagination,
  QueryFormItemPaginationMap,
  QueryFormItemPaginationProps,
  QueryFormItemQueryProps,
  QueryFormItemRequest,
  QueryFormItemRequestResultObject,
  QueryFormItemRequestSuccessPayload,
  QueryFormItemSelectedListItem,
  QueryFormItemSelectedListText,
} from './types'

export const QueryFormItem = connect<typeof QueryFormItemInner>(
  QueryFormItemInner,
  mapProps(
    {
      validateStatus: true,
      title: 'label',
      required: true,
      description: 'extra',
    },
    fieldFeedbackMapper,
  ),
)

export { QueryFormItemSelectedList }

export default QueryFormItem
