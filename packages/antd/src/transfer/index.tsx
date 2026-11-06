import { mapProps } from '@silver-formily/react'
import { Transfer as AntdTransfer } from 'antd'
import { connectControl, mapOptions, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Transfer: typeof AntdTransfer = connectControl(AntdTransfer, mapProps({ value: 'targetKeys' }), mapOptions('dataSource'), mapReadPrettyControl(PreviewText.Transfer))
export default Transfer
