import type { Grid, IGridOptions } from '@silver-formily/grid'
import type { HTMLAttributes } from 'react'
import { createGrid } from '@silver-formily/grid'
import { observer } from '@silver-formily/reactive-react'
import cls from 'clsx'
import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { createBem } from '../__builtins__'
import './style.css'

const b = createBem('form-grid')

export interface IFormGridProps extends IGridOptions, HTMLAttributes<HTMLDivElement> {
  grid?: Grid<HTMLElement>
}

export interface IGridColumnProps extends HTMLAttributes<HTMLDivElement> {
  gridSpan?: number
}

const FormGridContext = createContext<Grid<HTMLElement> | undefined>(undefined)

export const useFormGrid = () => useContext(FormGridContext)
export const createFormGrid = (options?: IGridOptions) => createGrid<HTMLElement>(options)

export function GridColumn({ gridSpan = 1, children, style, ...props }: IGridColumnProps) {
  return (
    <div
      {...props}
      data-grid-span={gridSpan}
      style={{ gridColumn: gridSpan === -1 ? '1 / -1' : `span ${gridSpan} / auto`, ...style }}
    >
      {children}
    </div>
  )
}

export const FormGrid = Object.assign(observer(({
  grid,
  maxRows,
  minColumns,
  maxColumns,
  minWidth,
  maxWidth,
  breakpoints,
  columnGap,
  rowGap,
  colWrap,
  strictAutoFit,
  shouldVisible,
  onDigest,
  onInitialized,
  className,
  style,
  children,
  ...props
}: IFormGridProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const instance = useMemo(() => grid ?? createFormGrid(Object.fromEntries(Object.entries({
    maxRows,
    minColumns,
    maxColumns,
    minWidth,
    maxWidth,
    breakpoints,
    columnGap,
    rowGap,
    colWrap,
    strictAutoFit,
    shouldVisible,
    onDigest,
    onInitialized,
  }).filter(([, value]) => value !== undefined))), [grid, maxRows, minColumns, maxColumns, minWidth, maxWidth, breakpoints, columnGap, rowGap, colWrap, strictAutoFit, shouldVisible, onDigest, onInitialized])

  useEffect(() => {
    if (ref.current)
      return instance.connect(ref.current)
  }, [instance])

  return (
    <FormGridContext.Provider value={instance}>
      <div
        {...props}
        ref={ref}
        className={cls(b(), className)}
        style={{ gridTemplateColumns: instance.templateColumns, gap: instance.gap, ...style }}
      >
        {children}
      </div>
    </FormGridContext.Provider>
  )
}), { GridColumn, useFormGrid, createFormGrid })

export default FormGrid
