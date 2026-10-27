import type { CascaderProps } from 'antd-mobile'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Cascader as AntCascader } from 'antd-mobile'
import PreviewText from '../preview-text'

export type ICascaderProps = CascaderProps

export const Cascader = connect(
  AntCascader,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Cascader),
)

export default Cascader
