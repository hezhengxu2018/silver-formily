import type { ExtractPropTypes } from 'vue'
import type Total from './total.vue'
import { buildProps } from 'element-plus/es/utils/index'

export const paginationTotalProps = buildProps({
  total: {
    type: Number,
    default: 1000,
  },
} as const)

export type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>

export type TotalInstance = InstanceType<typeof Total> & unknown
