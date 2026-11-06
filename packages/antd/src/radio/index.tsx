import { Radio as AntdRadio } from 'antd'
import { connectControl, mapChecked, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Radio: typeof AntdRadio = Object.assign(connectControl(AntdRadio, mapChecked(), mapReadPrettyControl(PreviewText.Boolean)), {
  Group: connectControl(AntdRadio.Group, mapOptions('options'), mapReadPrettyControl(PreviewText.Select)),
})
export default Radio
