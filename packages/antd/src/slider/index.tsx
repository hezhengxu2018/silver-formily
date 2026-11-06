import { Slider as AntdSlider } from 'antd'
import { connectControl, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Slider: typeof AntdSlider = connectControl(AntdSlider, mapReadPrettyControl(PreviewText.Slider))
export default Slider
