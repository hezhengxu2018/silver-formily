import type { ArrayField } from '@silver-formily/core'
import type { ListItemProps, ListProps } from 'antd-mobile/es/components/list'
import type { NativeProps } from 'antd-mobile/es/utils/native-props'
import {
  observer,
  RecursionField,
  useField,
  useFieldSchema,
} from '@silver-formily/react'
import { List as AntdList } from 'antd-mobile'
import cls from 'classnames'
import React from 'react'
import { usePrefixCls } from '../__builtins__'
import {
  ArrayBase,
  isArrayItemComponent,
  useArrayItemComponent,
} from '../array-base'
import './style.less'

export interface IListProps
  extends Omit<ListProps, 'style' | 'className'>,
  NativeProps<'--header-font-color' | '--footer-font-color'> {
  renderHeader?: React.ReactNode
  renderFooter?: React.ReactNode
  title?: string
}

export type IListItemProps = ListItemProps

enum listPropsMap {
  title = 'ItemTitle',
  prefix = 'ItemPrefix',
  description = 'ItemDescription',
  extra = 'ItemExtra',
  children = 'ItemChildren',
}

const listComponentMap = {
  [listPropsMap.title]: 'ItemTitle',
  [listPropsMap.prefix]: 'ItemPrefix',
  [listPropsMap.description]: 'ItemDescription',
  [listPropsMap.extra]: 'ItemExtra',
  [listPropsMap.children]: 'ItemChildren',
}

function baseItemComponent() {
  return null
}

export const List = Object.assign(
  observer(({ className, style, title, mode, renderFooter, renderHeader, ...props }: IListProps) => {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()
    const options = Array.isArray(field?.value) ? field?.value : []
    const prefixCls = usePrefixCls('formily-list')

    const renderTitle = () => {
      if (!title && !renderHeader) {
        return null
      }
      const innerHeader = title || renderHeader
      return <div className={`${prefixCls}-header`}>{innerHeader}</div>
    }

    const renderChildren = () => {
      if (props.children) {
        // jsx模式
        return props.children
      }
      return options?.map((item, index) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items

        return (
          <ArrayBase.Item key={index} index={index} record={item}>
            <RecursionField
              schema={items as any}
              name={index}
              filterProperties={(sc) => {
                return !isArrayItemComponent(
                  sc,
                  Object.values(listComponentMap),
                )
              }}
            />
          </ArrayBase.Item>
        )
      })
    }

    return (
      <ArrayBase>
        <div className={cls(prefixCls, className)} style={style}>
          {renderTitle()}
          <AntdList mode={mode}>{renderChildren()}</AntdList>
          {renderFooter && (
            <div className={`${prefixCls}-footer`}>{renderFooter}</div>
          )}
        </div>
      </ArrayBase>
    )
  }),
  {
    Item: observer((props: IListItemProps) => {
      const schema = useFieldSchema()
      const components = useArrayItemComponent(
        schema,
        Object.values(listComponentMap),
      )
      return (
        <AntdList.Item
          title={components?.get(listPropsMap.title)}
          prefix={components?.get(listPropsMap.prefix)}
          description={components?.get(listPropsMap.description)}
          extra={components?.get(listPropsMap.extra)}
          {...props}
        >
          {components?.get(listPropsMap.children) || props.children}
        </AntdList.Item>
      )
    }),

    ItemPrefix: baseItemComponent,
    ItemTitle: baseItemComponent,
    ItemDescription: baseItemComponent,
    ItemChildren: baseItemComponent,
    ItemExtra: baseItemComponent,
    displayName: 'List',
  },
)

export default List
