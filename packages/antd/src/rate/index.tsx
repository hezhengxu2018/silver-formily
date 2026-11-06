import { Rate as AntdRate } from 'antd'
import { connectControl, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Rate: typeof AntdRate = connectControl(AntdRate, mapReadPrettyControl(PreviewText.NumberPicker))
export default Rate
