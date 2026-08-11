import type { VueComponentProps } from '@silver-formily/vue'
import type { ElCascader } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FCascader from './cascader.vue'

export type CascaderProps = VueComponentProps<typeof ElCascader>
export type CascaderComponent = typeof ElCascader

export const Cascader = connect<typeof FCascader, CascaderProps>(
  FCascader,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Cascader),
)

export default Cascader
