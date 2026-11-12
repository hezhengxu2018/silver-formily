import { Input as AntdInput } from 'antd'
import { connectControl, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const OTP: typeof AntdInput.OTP = connectControl(AntdInput.OTP, mapReadPrettyControl(PreviewText.Password))
export default OTP
