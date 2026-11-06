import { TreeSelect as AntdTreeSelect } from 'antd'
import { connectControl, mapLoadingIcon, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const TreeSelect: typeof AntdTreeSelect = connectControl(AntdTreeSelect, mapOptions('treeData'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.TreeSelect))
export default TreeSelect
