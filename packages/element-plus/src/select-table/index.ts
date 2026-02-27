import { connect, mapProps } from '@silver-formily/vue'
import InnerSelectTable from './select-table.vue'
import './style.scss'

const SelectTable = connect<typeof InnerSelectTable>(
  InnerSelectTable,
  mapProps({ dataSource: 'dataSource', loading: 'loading' }),
)

export { SelectTable }

export default SelectTable
