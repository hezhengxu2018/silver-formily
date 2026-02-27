import type { ExtractPropTypes } from 'vue'
import type Jumper from './jumper.vue'
import { componentSizes } from 'element-plus'
import { buildProps } from 'element-plus/es/utils/index'

export const paginationJumperProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
  },
} as const)

export type PaginationJumperProps = ExtractPropTypes<
  typeof paginationJumperProps
>

export type PaginationJumperInstance = InstanceType<typeof Jumper> & unknown
