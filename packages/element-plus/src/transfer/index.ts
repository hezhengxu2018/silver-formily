import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElTransfer } from 'element-plus'

export type TransferProps = VueComponentProps<typeof ElTransfer>
export type TransferComponent = typeof ElTransfer

export const Transfer = connect<typeof ElTransfer>(
  ElTransfer,
  mapProps({ dataSource: 'data' }),
)

export default Transfer
