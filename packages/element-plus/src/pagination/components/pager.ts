import type { ExtractPropTypes } from 'vue'
import type Pager from './pager.vue'
import { buildProps } from 'element-plus/es/utils/index'

export const paginationPagerProps = buildProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
  pageSize: {
    type: Number,
  },
  disabled: Boolean,
} as const)

export type PaginationPagerProps = ExtractPropTypes<typeof paginationPagerProps>

export type PagerInstance = InstanceType<typeof Pager> & unknown
