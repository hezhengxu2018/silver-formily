import type { ArrayField } from '@silver-formily/core'
import type { IArrayBaseProps } from '../array-base'
import { observer, RecursionField, useField, useFieldSchema } from '@silver-formily/react'
import cls from 'classnames'
import React from 'react'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, isAdditionComponent } from '../array-base'
import { FormLayout, useFormLayout } from '../form-layout'
import './style.less'

export interface IArrayItemsProps extends IArrayBaseProps, React.HTMLAttributes<HTMLDivElement> {}

export interface IArrayItemsItemProps {
  title?: React.ReactNode
  extra?: React.ReactNode
  mode?: 'card' | 'default'
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function Item({ title, extra, mode = 'card', children, className, style }: IArrayItemsItemProps) {
  const prefixCls = usePrefixCls('formily-array-items')
  const layout = useFormLayout()
  const hasHeader = (title !== undefined && title !== null && title !== false)
    || (extra !== undefined && extra !== null && extra !== false)
  return (
    <div className={cls(`${prefixCls}-item`, `${prefixCls}-item-${mode}`, className)} style={style}>
      {hasHeader && (
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{title}</div>
          <div className={`${prefixCls}-extra`}>{extra}</div>
        </div>
      )}
      <FormLayout {...layout} className={`${prefixCls}-fields`} style={undefined} mode={mode}>
        {children}
      </FormLayout>
    </div>
  )
}

export const ArrayItems = ArrayBase.mixin(Object.assign(observer((props: IArrayItemsProps) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const prefixCls = usePrefixCls('formily-array-items')
  const {
    disabled,
    onAdd,
    onRemove,
    onMoveDown,
    onMoveUp,
    className,
    children: _children,
    value: _value,
    onChange: _onChange,
    ...rest
  } = props as IArrayItemsProps & { value?: unknown }
  const values = Array.isArray(field.value) ? field.value : []
  return (
    <ArrayBase disabled={disabled} onAdd={onAdd} onRemove={onRemove} onMoveDown={onMoveDown} onMoveUp={onMoveUp}>
      <div {...rest} className={cls(prefixCls, className)}>
        {values.map((record, index) => {
          const itemSchema = Array.isArray(schema.items) ? schema.items[index] || schema.items[0] : schema.items
          if (!itemSchema)
            return null
          return (
            <ArrayBase.Item key={index} index={index} record={record}>
              <RecursionField schema={itemSchema} name={index} />
            </ArrayBase.Item>
          )
        })}
        {schema.reduceProperties((children, property, name) => {
          if (isAdditionComponent(property))
            children.push(<RecursionField key={name} schema={property} name={name} />)
          return children
        }, [] as React.ReactNode[])}
      </div>
    </ArrayBase>
  )
}), { Item }))

export default ArrayItems
