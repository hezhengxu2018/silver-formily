import type { TreeValueTypeProps } from './types'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import InnerTree from './tree.vue'

export type TreeProps = TreeValueTypeProps
export type TreeComponent = typeof InnerTree

const Tree = connect<typeof InnerTree, TreeProps>(
  InnerTree,
  mapProps({ dataSource: 'data', loading: 'loading', disabled: true }),
  mapReadPretty(PreviewText.Tree),
)

export { Tree }

export default Tree
