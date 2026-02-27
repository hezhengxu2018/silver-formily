import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FCascader from './cascader.vue'

export const Cascader = connect<typeof FCascader>(
  FCascader,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Cascader),
)

export default Cascader
