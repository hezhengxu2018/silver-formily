import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FSegmented from './segmented.vue'

export const Segmented = connect<typeof FSegmented>(
  FSegmented,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Select),
)

export default Segmented
