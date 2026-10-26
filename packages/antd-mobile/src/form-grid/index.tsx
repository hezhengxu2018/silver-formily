import cls from 'classnames'
import React from 'react'
import { pickDataProps, usePrefixCls } from '../__builtins__'
import { useFormLayout } from '../form-layout'
import './style.less'

export interface IFormGridProps {
  columns?: number
  columnGap?: number
  rowGap?: number
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
}

export interface IGridColumnProps {
  gridSpan?: number
  style?: React.CSSProperties
  className?: string
}

function normalizeGap(gap: number | undefined, fallback: number) {
  return typeof gap === 'number' && Number.isFinite(gap) && gap >= 0 ? gap : fallback
}

export function GridColumn({ gridSpan = 1, children, ...props }: React.PropsWithChildren<IGridColumnProps>) {
  return (
    <div
      {...props}
      data-grid-span={gridSpan}
      style={{
        ...props.style,
        gridColumn: gridSpan === -1 ? '1 / -1' : `span ${gridSpan} / auto`,
      }}
    >
      {children}
    </div>
  )
}

export const FormGrid = Object.assign(
  ({ columns = 1, columnGap, rowGap, children, className, style, ...props }: React.PropsWithChildren<IFormGridProps>) => {
    const layout = useFormLayout()
    const prefixCls = usePrefixCls('formily-grid', props)
    const count = Number.isFinite(columns) ? Math.max(1, Math.round(columns)) : 1
    return (
      <div
        {...pickDataProps(props)}
        className={cls(`${prefixCls}-layout`, className)}
        style={{
          ...style,
          gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
          gap: `${normalizeGap(rowGap ?? layout.gridRowGap, 4)}px ${normalizeGap(columnGap ?? layout.gridColumnGap, 8)}px`,
        }}
      >
        {children}
      </div>
    )
  },
  { GridColumn },
)

export default FormGrid
