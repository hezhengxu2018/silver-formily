import type { ExtractPropTypes } from 'vue'
import type Prev from './prev.vue'
import { buildProps, iconPropType } from 'element-plus/es/utils/index'

export const paginationPrevProps = buildProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1,
  },
  prevText: {
    type: String,
  },
  prevIcon: {
    type: iconPropType,
  },
} as const)

export const paginationPrevEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type PaginationPrevProps = ExtractPropTypes<typeof paginationPrevProps>

export type PrevInstance = InstanceType<typeof Prev> & unknown
