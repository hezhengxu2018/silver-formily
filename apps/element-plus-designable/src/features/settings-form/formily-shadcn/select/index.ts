import { connect, mapProps } from '@silver-formily/vue'
import { fieldControlIdMapper } from '../utils'
import FSelect from './Select.vue'

export const Select = connect<typeof FSelect>(
  FSelect,
  mapProps({
    dataSource: 'options',
    disabled: true,
    loading: true,
  }, fieldControlIdMapper),
)

export default Select
