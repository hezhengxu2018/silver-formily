import type { DataField } from '@silver-formily/core'
import type {
  CheckListItemProps,
  CheckListProps,
  CheckListValue,
} from 'antd-mobile/es/components/check-list'
import type { ReactNode } from 'react'
import { observer, useField } from '@silver-formily/react'
import { CheckList as AntdCheckList } from 'antd-mobile'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import './style.less'

export interface ICheckListOption extends Omit<CheckListItemProps, 'children'> {
  label: ReactNode
}

export interface ICheckListProps extends CheckListProps {
  options?: (CheckListValue | ICheckListOption)[]
}

export type ICheckListItemProps = CheckListItemProps

const BaseCheckList = observer(({
  className,
  style,
  children,
  options,
  ...props
}: ICheckListProps) => {
  const prefixCls = usePrefixCls('formily-check-list')
  const field = useField<DataField>()
  const dataSource = field?.dataSource?.length
    ? field.dataSource
    : options ?? []

  return (
    <AntdCheckList {...props} className={cls(prefixCls, className)} style={style}>
      {dataSource.length > 0
        ? dataSource.map((item) => {
            const { label, ...itemProps }
              = typeof item === 'object' ? item : { label: item, value: item }
            return (
              <AntdCheckList.Item
                {...itemProps}
                value={itemProps.value}
                key={`${typeof itemProps.value}:${itemProps.value}`}
              >
                {label}
              </AntdCheckList.Item>
            )
          })
        : children}
    </AntdCheckList>
  )
})

export const CheckList = Object.assign(BaseCheckList, {
  displayName: 'CheckList',
  Item: AntdCheckList.Item,
})

export default CheckList
