import type { IGridOptions } from '@silver-formily/grid'
import { Grid } from '@silver-formily/grid'
import { observer } from '@silver-formily/react'
import cls from 'classnames'
import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { pickDataProps, usePrefixCls } from '../__builtins__'
import { useFormLayout } from '../form-layout'
import './style.less'

const FormGridContext = React.createContext<Grid<HTMLElement>>(null as any)

export interface IFormGridProps extends IGridOptions {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
}

export interface IGridColumnProps {
  gridSpan?: number
  style?: React.CSSProperties
  className?: string
}

function useFormGrid(props: IFormGridProps) {
  const layout = useFormLayout()
  const options = {
    columnGap: layout?.gridColumnGap ?? 8,
    rowGap: layout?.gridRowGap ?? 4,
    ...props,
  }
  return useMemo(() => new Grid(options), [Grid.id(options)])
}

/**
 * @deprecated
 */
export function useGridSpan(gridSpan = 1) {
  return gridSpan
}

/**
 * @deprecated
 */
export function useGridColumn(gridSpan = 1) {
  return gridSpan
}

export const GridColumn = observer(
  ({ gridSpan = 1, children, ...props }: React.PropsWithChildren<IGridColumnProps>) => {
    return (
      <div {...props} style={props.style} data-grid-span={gridSpan}>
        {children}
      </div>
    )
  },
)

export const FormGrid = Object.assign(
  observer(
    ({
      children,
      className,
      style,
      ...props
    }: React.PropsWithChildren<IFormGridProps>) => {
      const grid = useFormGrid(props)
      const ref = useRef<HTMLDivElement>(null)
      const prefixCls = usePrefixCls('formily-grid', props)
      const dataProps = pickDataProps(props)
      useLayoutEffect(() => {
        if (!ref.current)
          return
        return grid.connect(ref.current)
      }, [grid])
      return (
        <FormGridContext.Provider value={grid}>
          <div
            {...dataProps}
            className={cls(`${prefixCls}-layout`, className)}
            style={{
              ...style,
              gridTemplateColumns: grid.templateColumns,
              gap: grid.gap,
            }}
            ref={ref}
          >
            {children}
          </div>
        </FormGridContext.Provider>
      )
    },
    {
      forwardRef: true,
    },
  ),
  { useGridSpan, GridColumn },
)

export default FormGrid
