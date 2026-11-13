import { AutoComplete as AntdAutoComplete } from 'antd'
import { connectControl, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const AutoComplete: typeof AntdAutoComplete = connectControl(
  AntdAutoComplete,
  mapOptions('options'),
  mapReadPrettyControl(({ value, className, style }) => <PreviewText value={value} className={className} style={style} />),
)
export default AutoComplete
