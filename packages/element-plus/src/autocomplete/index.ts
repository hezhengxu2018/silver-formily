import type { VueComponentProps } from '@silver-formily/vue'
import type { AutocompleteData, ElAutocomplete } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FAutocomplete from './autocomplete.vue'

export type AutocompleteProps = VueComponentProps<typeof ElAutocomplete> & {
  options?: AutocompleteData
}
export type AutocompleteComponent = typeof ElAutocomplete

export const Autocomplete = connect<typeof FAutocomplete, AutocompleteProps>(
  FAutocomplete,
  mapProps({ dataSource: 'options', readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.Input),
)

export default Autocomplete
