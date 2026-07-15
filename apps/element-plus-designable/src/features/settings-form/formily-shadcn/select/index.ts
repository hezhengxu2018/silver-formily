import { connect, mapProps } from '@silver-formily/vue'
import FSelect from './Select.vue'

export const Select = connect<typeof FSelect>(
  FSelect,
  mapProps({
    dataSource: 'options',
    disabled: true,
    loading: true,
  }),
)

export default Select
