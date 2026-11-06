import { Cascader as AntdCascader } from 'antd'
import { connectControl, mapLoadingIcon, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Cascader: typeof AntdCascader = connectControl(AntdCascader, mapOptions('options'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.Cascader))
export default Cascader
