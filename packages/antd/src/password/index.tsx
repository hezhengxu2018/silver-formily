import { Input as AntdInput } from 'antd'
import { connectControl, mapLoadingIcon, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Password: typeof AntdInput.Password = connectControl(AntdInput.Password, mapLoadingIcon('suffix'), mapReadPrettyControl(PreviewText.Password))
export default Password
