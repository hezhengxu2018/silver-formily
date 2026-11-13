import { Mentions as AntdMentions } from 'antd'
import { connectControl, mapLoading, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Mentions: typeof AntdMentions = connectControl(
  AntdMentions,
  mapOptions('options'),
  mapLoading(),
  mapReadPrettyControl(({ value, className, style }) => <PreviewText value={value} className={className} style={style} />),
)
export default Mentions
