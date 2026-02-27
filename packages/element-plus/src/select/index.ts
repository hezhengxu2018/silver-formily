import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FSelect from './select.vue'

export const Select = connect<typeof FSelect>(
  FSelect,
  mapProps({ dataSource: 'options', loading: true, disabled: true }),
  mapReadPretty(PreviewText.Select),
)

export default Select
