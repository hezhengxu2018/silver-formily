import type { ArrayField } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import type { JSXComponent } from '@silver-formily/react'
import type { ButtonProps } from 'antd-mobile/es/components/button'
import {
  observer,
  RecordScope,
  RecordsScope,
  useField,
  useFieldSchema,
} from '@silver-formily/react'
import { clone, isValid } from '@silver-formily/shared'
import { Button, List, Space } from 'antd-mobile'
import {
  AddCircleOutline,
  DeleteOutline,
  DownOutline,
  UpOutline,
} from 'antd-mobile-icons'
import cls from 'classnames'
import React, { createContext, useContext } from 'react'
import { usePrefixCls } from '../__builtins__'
import './style.less'

export * from './utils'

export interface IArrayBaseOperationProps extends React.HTMLAttributes<HTMLSpanElement> {
  index?: number
}

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: unknown
}

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}

export interface IArrayBaseItemProps {
  index: number
  record: unknown
  children?: React.ReactNode
}

export type ArrayBaseMixins = Pick<typeof ArrayBase, | 'Addition' | 'Remove' | 'MoveUp' | 'MoveDown'
  | 'Index' | 'Empty' | 'useArray' | 'useIndex' | 'useRecord'>

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
  children?: React.ReactNode
}

const ArrayBaseContext = createContext<IArrayBaseContext | null>(null)

const ItemContext = createContext<IArrayBaseItemProps | null>(null)

function takeRecord(val: unknown, index?: number): unknown {
  return typeof val === 'function' ? val(index) : val
}

function useArray() {
  return useContext(ArrayBaseContext)
}

function useIndex(index?: number) {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index ?? 0
}

function useRecord(record?: unknown) {
  const ctx = useContext(ItemContext)
  return takeRecord(ctx ? ctx.record : record, ctx?.index)
}
function getSchemaDefaultValue(schema?: Schema): unknown {
  if (schema?.type === 'array')
    return []
  if (schema?.type === 'object')
    return {}
  if (schema?.type === 'void') {
    for (const key in schema.properties) {
      const value = getSchemaDefaultValue(schema.properties[key])
      if (isValid(value))
        return value
    }
  }
}

function getDefaultValue(defaultValue: unknown, schema: Schema) {
  if (isValid(defaultValue))
    return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getSchemaDefaultValue(schema?.items[0])
  return getSchemaDefaultValue(schema?.items)
}

type ArrayOperationName = 'remove' | 'move-down' | 'move-up'

const operationIcons = {
  'remove': DeleteOutline,
  'move-down': DownOutline,
  'move-up': UpOutline,
}

function performArrayOperation(operation: ArrayOperationName, array: IArrayBaseContext, index: number) {
  switch (operation) {
    case 'remove':
      array.field.remove(index)
      array.props.onRemove?.(index)
      break
    case 'move-down':
      array.field.moveDown(index)
      array.props.onMoveDown?.(index)
      break
    case 'move-up':
      array.field.moveUp(index)
      array.props.onMoveUp?.(index)
      break
  }
}

function createArrayOperation(operation: ArrayOperationName) {
  return observer(React.forwardRef<HTMLSpanElement, IArrayBaseOperationProps>((props, ref) => {
    const array = useArray()
    const index = useIndex(props.index)
    const prefixCls = usePrefixCls('formily-array-base')
    if (!array || array.field.pattern !== 'editable')
      return null
    if (operation === 'move-up' && index <= 0)
      return null
    if (operation === 'move-down' && index >= (array.field.value?.length ?? 0) - 1)
      return null
    const Icon = operationIcons[operation]
    return (
      <span
        {...props}
        ref={ref}
        className={cls(`${prefixCls}-${operation}`, props.className)}
        onClick={(event) => {
          if (array.props.disabled)
            return
          event.stopPropagation()
          performArrayOperation(operation, array, index)
          props.onClick?.(event)
        }}
      >
        <Icon />
      </span>
    )
  }))
}

export const ArrayBase = Object.assign(
  (props: IArrayBaseProps) => {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()
    return (
      <RecordsScope getRecords={() => field.value}>
        <ArrayBaseContext.Provider value={{ field, schema: schema as Schema, props }}>
          {props.children}
        </ArrayBaseContext.Provider>
      </RecordsScope>
    )
  },
  {
    Item: ({ children, ...props }: IArrayBaseItemProps) => {
      const index = props.index
      const record = takeRecord(props.record, props.index)
      return (
        <ItemContext.Provider value={props}>
          <RecordScope getIndex={() => index} getRecord={() => record}>
            {children}
          </RecordScope>
        </ItemContext.Provider>
      )
    },

    Index: (props: React.HTMLAttributes<HTMLSpanElement>) => {
      const index = useIndex()
      const prefixCls = usePrefixCls('formily-array-base')
      return (
        <span {...props} className={`${prefixCls}-index`}>
          #
          {index + 1}
          .
        </span>
      )
    },

    Empty: (props: { children?: React.ReactNode }) => <>{props.children}</>,

    Addition: (props: IArrayBaseAdditionProps) => {
      const self = useField()
      const array = useArray()
      const prefixCls = usePrefixCls('formily-array-base')
      if (!array)
        return null
      if (
        array.field.pattern !== 'editable'
        && array.field.pattern !== 'disabled'
      ) {
        return null
      }
      return (
        <List mode="card" className={`${prefixCls}-addition-list`}>
          <Button
            color="primary"
            fill="none"
            block
            {...props}
            disabled={array.field.disabled}
            className={cls(`${prefixCls}-addition`, props.className)}
            onClick={(e) => {
              if (array.props.disabled)
                return
              const defaultValue = getDefaultValue(props.defaultValue, array.schema)
              if (props.method === 'unshift') {
                array.field.unshift(defaultValue)
                array.props.onAdd?.(0)
              }
              else {
                array.field.push(defaultValue)
                array.props.onAdd?.(array.field.value.length - 1)
              }
              if (props.onClick) {
                props.onClick(e)
              }
            }}
          >
            <Space align="center" style={{ '--gap': '4px' }}>
              <AddCircleOutline />
              {props.title || self.title}
            </Space>
          </Button>
        </List>
      )
    },

    Remove: createArrayOperation('remove'),
    MoveDown: createArrayOperation('move-down'),
    MoveUp: createArrayOperation('move-up'),

    useArray,
    useIndex,
    useRecord,
    mixin: mixinArrayBase,
  },
)

function mixinArrayBase<T extends JSXComponent>(target: T): T & ArrayBaseMixins {
  return Object.assign(target, {
    Index: ArrayBase.Index,
    Empty: ArrayBase.Empty,
    Addition: ArrayBase.Addition,
    Remove: ArrayBase.Remove,
    MoveDown: ArrayBase.MoveDown,
    MoveUp: ArrayBase.MoveUp,
    useArray: ArrayBase.useArray,
    useIndex: ArrayBase.useIndex,
    useRecord: ArrayBase.useRecord,
  })
}

export default ArrayBase
