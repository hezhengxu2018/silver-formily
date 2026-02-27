import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FAutocomplete from './autocomplete.vue'

export const Autocomplete = connect<typeof FAutocomplete>(
  FAutocomplete,
  mapProps({ dataSource: 'options', readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.Input),
)

export default Autocomplete
