import type { DataField } from '@silver-formily/core'
import type {
  CheckListItemProps,
  CheckListProps,
} from 'antd-mobile/es/components/check-list'
import type { IListItemProps } from '../list'
import { connect, mapProps, useField } from '@silver-formily/react'
import { CheckList as AntdCheckList } from 'antd-mobile'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import './style.less'

export interface ICheckListOption {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  options?: string[] | ICheckListOption[]
  layout?: 'vertical' | 'horizontal'
  layoutBlock?: boolean
}

export interface ICheckListProps extends Props, CheckListProps {}

export interface ICheckListItemProps
  extends Props,
  CheckListItemProps,
  IListItemProps {}

export function BaseCheckList({
  className,
  style,
  children,
  options,
  ...props
}: ICheckListProps) {
  const prefixCls = usePrefixCls('formily-check-list')
  const field = useField<DataField>()
  const dataSource = field?.dataSource.length
    ? field.dataSource
    : options?.length
      ? options
      : []

  if (children && dataSource.length === 0) {
    // 原生jsx模式
    return <AntdCheckList {...props}>{children}</AntdCheckList>
  }

  return (
    <div className={cls(prefixCls, className)} style={style}>
      <AntdCheckList {...props}>
        {dataSource.map((item) => {
          const option
            = typeof item === 'string' ? { label: item, value: item } : item
          return (
            <AntdCheckList.Item
              {...option}
              disabled={option.disabled}
              value={option.value}
              key={option.value}
            >
              {option.label}
            </AntdCheckList.Item>
          )
        })}
      </AntdCheckList>
    </div>
  )
}

export const CheckList = Object.assign(connect(BaseCheckList, mapProps({})), {
  displayName: 'CheckList',
  __ANTD_MOBILE_CHECKLIST: true,
  Item: AntdCheckList.Item,
})

export default CheckList
