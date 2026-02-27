import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import InnerTree from './tree.vue'

const Tree = connect<typeof InnerTree>(
  InnerTree,
  mapProps({ dataSource: 'data', loading: 'loading', disabled: true }),
  mapReadPretty(PreviewText.Tree),
)

export { Tree }

export default Tree
