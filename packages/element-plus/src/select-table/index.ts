import type { SelectTableProps } from './types'
import { connect, mapProps } from '@silver-formily/vue'
import InnerSelectTable from './select-table.vue'
import './style.scss'

export type SelectTableComponent = typeof InnerSelectTable

const SelectTable = connect<typeof InnerSelectTable, SelectTableProps>(
  InnerSelectTable,
  mapProps({ dataSource: 'dataSource', loading: 'loading' }),
)

export { SelectTable }
export type { SelectTableProps }

export default SelectTable
