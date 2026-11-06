import { Checkbox as AntdCheckbox } from 'antd'
import { connectControl, mapChecked, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Checkbox: typeof AntdCheckbox = Object.assign(connectControl(AntdCheckbox, mapChecked(), mapReadPrettyControl(PreviewText.Boolean)), {
  Group: connectControl(AntdCheckbox.Group, mapOptions('options'), mapReadPrettyControl(PreviewText.Select, { mode: 'multiple' })),
})
export default Checkbox
