import type { ArrayField } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import type { JSXComponent } from '@silver-formily/react'
import type { ButtonProps } from 'antd-mobile/es/components/button'
import type { HTMLProps } from 'react'
import {
  RecordScope,
  RecordsScope,
  useField,
  useFieldSchema,
} from '@silver-formily/react'
import { clone, isValid } from '@silver-formily/shared'
import { Button, Space } from 'antd-mobile'
import {
  AddOutline,
  DeleteOutline,
  DownOutline,
  UnorderedListOutline,
  UpOutline,
} from 'antd-mobile-icons'
import cls from 'classnames'
import React, { createContext, useContext } from 'react'
import { usePrefixCls } from '../__builtins__'

export * from './utils'

export type IconProps = HTMLProps<any> & React.SVGProps<SVGSVGElement>

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}

export interface IArrayBaseItemProps {
  index: number
  record: any
  children?: React.ReactNode
}

export type ArrayBaseMixins = {
  Addition?: (props: IArrayBaseAdditionProps) => React.ReactNode
  Remove?: (props: IconProps & { index?: number }) => React.ReactNode
  MoveUp?: (props: IconProps & { index?: number }) => React.ReactNode
  MoveDown?: (props: IconProps & { index?: number }) => React.ReactNode
  SortHandle?: (props: IconProps & { index?: number }) => React.ReactNode
  Copy?: (props: IconProps & { index?: number }) => React.ReactNode
  Index?: (props: React.HTMLAttributes<HTMLSpanElement>) => React.ReactNode
  Empty?: (props: { children?: React.ReactNode }) => React.ReactNode
  useArray?: () => IArrayBaseContext
  useIndex?: () => number
  useRecord?: () => any
}

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
  onCopy?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
  children?: React.ReactNode
}

const ArrayBaseContext = createContext<IArrayBaseContext>(null as any)

const ItemContext = createContext<IArrayBaseItemProps>(null as any)

function CopyOutlined(
  props: React.HTMLAttributes<HTMLSpanElement>
    & { ref?: React.Ref<HTMLSpanElement> },
) {
  return (
    <span {...props}>
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="copy"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
      </svg>
    </span>
  )
}

function takeRecord(val: any, index?: number) {
  return typeof val === 'function' ? val(index) : val
}

function useArray() {
  return useContext(ArrayBaseContext)
}

function useIndex(index?: number) {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index ?? 0
}

function useRecord(record?: number) {
  const ctx = useContext(ItemContext)
  return takeRecord(ctx ? ctx.record : record, ctx?.index)
}
function getSchemaDefaultValue(schema?: Schema): any {
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

function getDefaultValue(defaultValue: any, schema: Schema) {
  if (isValid(defaultValue))
    return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getSchemaDefaultValue(schema?.items[0])
  return getSchemaDefaultValue(schema?.items)
}

function SortHandle(props: any) {
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <span
      className={cls(`${prefixCls}-sort-handle`, props.className)}
      {...props}
      style={{ ...props.style }}
    >
      <UnorderedListOutline />
    </span>
  )
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

    SortHandle: (props: IconProps & { index?: number }) => {
      const array = useArray()
      if (!array)
        return null
      if (array.field?.pattern !== 'editable')
        return null
      return <SortHandle {...props} />
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
        array.field?.pattern !== 'editable'
        && array.field?.pattern !== 'disabled'
      ) {
        return null
      }
      return (
        <Button
          fill="outline"
          block
          {...props}
          disabled={array.field?.disabled}
          className={cls(`${prefixCls}-addition`, props.className)}
          onClick={(e) => {
            if (array.props?.disabled)
              return
            const defaultValue = getDefaultValue(props.defaultValue, array.schema)
            if (props.method === 'unshift') {
              array.field?.unshift?.(defaultValue)
              array.props?.onAdd?.(0)
            }
            else {
              array.field?.push?.(defaultValue)
              array.props?.onAdd?.(array?.field?.value?.length - 1)
            }
            if (props.onClick) {
              props.onClick(e)
            }
          }}
        >
          <Space>
            <AddOutline />
            {props.title || self.title}
          </Space>
        </Button>
      )
    },

    Copy: React.forwardRef<HTMLSpanElement, IconProps & { index?: number }>((props, ref) => {
      const self = useField()
      const array = useArray()
      const index = useIndex(props.index)
      const prefixCls = usePrefixCls('formily-array-base')
      if (!array)
        return null
      if (array.field?.pattern !== 'editable')
        return null
      return (
        <CopyOutlined
          {...props}
          className={cls(
            `${prefixCls}-copy`,
            self?.disabled ? `${prefixCls}-copy-disabled` : '',
            props.className,
          )}
          ref={ref}
          onClick={(e) => {
            if (self?.disabled)
              return
            e.stopPropagation()
            if (array.props?.disabled)
              return
            const value = clone(array?.field?.value[index])
            const distIndex = index + 1
            array.field?.insert?.(distIndex, value)
            array.props?.onCopy?.(distIndex)
            if (props.onClick) {
              props.onClick(e)
            }
          }}
        />

      )
    }),

    Remove: React.forwardRef<HTMLSpanElement, IconProps & { index?: number }>((props, ref) => {
      const index = useIndex(props.index)
      const array = useArray()
      const prefixCls = usePrefixCls('formily-array-base')
      if (!array)
        return null
      if (array.field?.pattern !== 'editable')
        return null
      return (
        <span
          {...props}
          className={cls(`${prefixCls}-remove`, props.className)}
          ref={ref}
          onClick={(e) => {
            if (array.props?.disabled)
              return
            e.stopPropagation()
            array.field?.remove?.(index)
            array.props?.onRemove?.(index)
            if (props.onClick) {
              props.onClick(e)
            }
          }}
        >
          <DeleteOutline />
        </span>
      )
    }),

    MoveDown: React.forwardRef<HTMLSpanElement, IconProps & { index?: number }>((props, ref) => {
      const index = useIndex(props.index)
      const array = useArray()
      const prefixCls = usePrefixCls('formily-array-base')
      if (!array)
        return null
      if (array.field?.pattern !== 'editable')
        return null
      return (
        <span
          {...props}
          className={cls(`${prefixCls}-move-down`, props.className)}
          ref={ref}
          onClick={(e) => {
            if (array.props?.disabled)
              return
            e.stopPropagation()
            array.field?.moveDown?.(index)
            array.props?.onMoveDown?.(index)
            if (props.onClick) {
              props.onClick(e)
            }
          }}
        >
          <DownOutline />
        </span>
      )
    }),

    MoveUp: React.forwardRef<HTMLSpanElement, IconProps & { index?: number }>((props, ref) => {
      const index = useIndex(props.index)
      const array = useArray()
      const prefixCls = usePrefixCls('formily-array-base')
      if (!array)
        return null
      if (array.field?.pattern !== 'editable')
        return null
      return (
        <span
          {...props}
          className={cls(`${prefixCls}-move-up`, props.className)}
          ref={ref}
          onClick={(e) => {
            if (array.props?.disabled)
              return
            e.stopPropagation()
            array?.field?.moveUp(index)
            array?.props?.onMoveUp?.(index)
            if (props.onClick) {
              props.onClick(e)
            }
          }}
        >
          <UpOutline />
        </span>
      )
    }),

    useArray,
    useIndex,
    useRecord,
    mixin: mixinArrayBase,
  },
)

function mixinArrayBase<T extends JSXComponent>(target: T): T & ArrayBaseMixins {
  const record = target as any
  record.Index = ArrayBase.Index
  record.Empty = ArrayBase.Empty
  record.SortHandle = ArrayBase.SortHandle
  record.Addition = ArrayBase.Addition
  record.Remove = ArrayBase.Remove
  record.Copy = ArrayBase.Copy
  record.MoveDown = ArrayBase.MoveDown
  record.MoveUp = ArrayBase.MoveUp
  record.useArray = ArrayBase.useArray
  record.useIndex = ArrayBase.useIndex
  record.useRecord = ArrayBase.useRecord
  return record as T & ArrayBaseMixins
}

export default ArrayBase
