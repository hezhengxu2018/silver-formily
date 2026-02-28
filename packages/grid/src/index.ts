import type { GridNode, IGridOptions } from './types'
import { batch, define, observable, reaction } from '@formily/reactive'
import { ChildListMutationObserver } from './observer'
import {
  calcBreakpointIndex,
  calcChildOriginTotalColumns,
  calcChildTotalColumns,
  calcSatisfyColumns,
  factor,
  nextTick,
  parseGridNode,
  resolveChildren,
} from './utils'

export type {
  GridNode,
  IGridOptions,
} from './types'

export class Grid<Container extends HTMLElement> {
  options: IGridOptions
  width = 0
  height = 0
  container!: Container
  children: GridNode[] = []
  childTotalColumns = 0
  shadowChildTotalColumns = 0
  childOriginTotalColumns = 0
  shadowChildOriginTotalColumns = 0
  ready = false

  constructor(options?: IGridOptions) {
    this.options = {
      breakpoints: [720, 1280, 1920],
      columnGap: 8,
      rowGap: 4,
      minWidth: 100,
      colWrap: true,
      strictAutoFit: false,
      ...options,
    }

    define(this, {
      options: observable.shallow,
      width: observable.ref,
      height: observable.ref,
      ready: observable.ref,
      children: observable.ref,
      childOriginTotalColumns: observable.ref,
      shadowChildOriginTotalColumns: observable.ref,
      shadowChildTotalColumns: observable.ref,
      childTotalColumns: observable.ref,
      columns: observable.computed,
      templateColumns: observable.computed,
      gap: observable.computed,
      maxColumns: observable.computed,
      minColumns: observable.computed,
      maxWidth: observable.computed,
      minWidth: observable.computed,
      breakpoints: observable.computed,
      breakpoint: observable.computed,
      rowGap: observable.computed,
      columnGap: observable.computed,
      colWrap: observable.computed,
    })
  }

  set breakpoints(breakpoints: number[]) {
    this.options.breakpoints = breakpoints
  }

  get breakpoints() {
    return this.options.breakpoints ?? []
  }

  get breakpoint() {
    return calcBreakpointIndex(this.breakpoints, this.width)
  }

  set maxWidth(maxWidth: number) {
    this.options.maxWidth = maxWidth
  }

  get maxWidth(): number {
    return factor(this.options.maxWidth, this) ?? Infinity
  }

  set minWidth(minWidth: number) {
    this.options.minWidth = minWidth
  }

  get minWidth(): number {
    return factor(this.options.minWidth, this) ?? 100
  }

  set maxColumns(maxColumns: number) {
    this.options.maxColumns = maxColumns
  }

  get maxColumns(): number {
    return factor(this.options.maxColumns, this) ?? Infinity
  }

  set maxRows(maxRows: number) {
    this.options.maxRows = maxRows
  }

  get maxRows() {
    return this.options.maxRows ?? Infinity
  }

  set minColumns(minColumns: number) {
    this.options.minColumns = minColumns
  }

  get minColumns(): number {
    return factor(this.options.minColumns, this) ?? 1
  }

  set rowGap(rowGap: number) {
    this.options.rowGap = rowGap
  }

  get rowGap(): number {
    return factor(this.options.rowGap, this) ?? 5
  }

  set columnGap(columnGap: number) {
    this.options.columnGap = columnGap
  }

  get columnGap(): number {
    return factor(this.options.columnGap, this) ?? 10
  }

  set colWrap(colWrap: boolean) {
    this.options.colWrap = colWrap
  }

  get colWrap(): boolean {
    return factor(this.options.colWrap, this) ?? true
  }

  get columns() {
    if (!this.ready) {
      return 0
    }

    const originTotalColumns = this.childOriginTotalColumns

    if (this.colWrap === false) {
      return originTotalColumns
    }

    const baseColumns = this.childSize

    const strictMaxWidthColumns = Math.round(
      this.width / (this.maxWidth + this.columnGap),
    )

    const looseMaxWidthColumns = Math.min(
      originTotalColumns,
      strictMaxWidthColumns,
    )

    const maxWidthColumns = this.options.strictAutoFit
      ? strictMaxWidthColumns
      : looseMaxWidthColumns

    const strictMinWidthColumns = Math.round(
      this.width / (this.minWidth + this.columnGap),
    )

    const looseMinWidthColumns = Math.min(
      originTotalColumns,
      strictMinWidthColumns,
    )

    const minWidthColumns = this.options.strictAutoFit
      ? strictMinWidthColumns
      : looseMinWidthColumns

    const minCalculatedColumns = Math.min(
      baseColumns,
      originTotalColumns,
      maxWidthColumns,
      minWidthColumns,
    )

    const maxCalculatedColumns = Math.max(
      baseColumns,
      originTotalColumns,
      maxWidthColumns,
      minWidthColumns,
    )

    const finalColumns = calcSatisfyColumns(
      this.width,
      maxCalculatedColumns,
      minCalculatedColumns,
      this.maxWidth,
      this.minWidth,
      this.columnGap,
    )

    if (finalColumns >= this.maxColumns) {
      return this.maxColumns
    }
    if (finalColumns <= this.minColumns) {
      return this.minColumns
    }

    return finalColumns
  }

  get rows() {
    return Math.ceil(this.childTotalColumns / this.columns)
  }

  get shadowRows() {
    return Math.ceil(this.shadowChildTotalColumns / this.columns)
  }

  get templateColumns() {
    if (!this.width) {
      return ''
    }

    if (this.maxWidth === Infinity) {
      return `repeat(${this.columns},minmax(0,1fr))`
    }

    if (this.options.strictAutoFit !== true) {
      const columnWidth = (this.width - (this.columns - 1) * this.columnGap) / this.columns
      if (columnWidth < this.minWidth || columnWidth > this.maxWidth) {
        return `repeat(${this.columns},minmax(0,1fr))`
      }
    }

    return `repeat(${this.columns},minmax(${this.minWidth}px,${this.maxWidth}px))`
  }

  get gap() {
    return `${this.rowGap}px ${this.columnGap}px`
  }

  get childSize() {
    return this.children.length
  }

  get fullnessLastColumn() {
    return this.columns === this.children[this.childSize - 1]?.span
  }

  connect = (container: Container) => {
    if (!container) {
      return () => {}
    }

    this.container = container

    const digest = batch.bound!(() => {
      this.children = parseGridNode(this.container.children)
      this.childTotalColumns = calcChildTotalColumns(this.children)
      this.shadowChildTotalColumns = calcChildTotalColumns(this.children, true)
      this.childOriginTotalColumns = calcChildOriginTotalColumns(this.children)
      this.shadowChildOriginTotalColumns = calcChildOriginTotalColumns(this.children, true)

      const rect = this.container.getBoundingClientRect()
      if (rect.width && rect.height) {
        this.width = rect.width
        this.height = rect.height
      }

      resolveChildren(this)
      nextTick(() => {
        this.options.onDigest?.(this as unknown as Grid<HTMLElement>)
      })

      if (!this.ready) {
        nextTick(() => {
          this.options.onInitialized?.(this as unknown as Grid<HTMLElement>)
        })
      }
    })

    const initialize = batch.bound!(() => {
      digest()
      this.ready = true
    })

    const mutationObserver = new ChildListMutationObserver(digest)
    const smoothDigest = () => {
      requestAnimationFrame(() => {
        digest()
      })
    }

    const resizeObserver = new ResizeObserver(smoothDigest)
    const dispose = reaction(() => ({ ...this.options }), digest)

    resizeObserver.observe(this.container)
    mutationObserver.observe(this.container, {
      attributeFilter: ['data-grid-span'],
      attributes: true,
    })

    initialize()

    return () => {
      resizeObserver.unobserve(this.container)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      dispose()
      this.children = []
    }
  }

  static id = (options: IGridOptions = {}) => {
    const keys: Array<keyof IGridOptions> = [
      'maxRows',
      'maxColumns',
      'minColumns',
      'maxWidth',
      'minWidth',
      'breakpoints',
      'columnGap',
      'rowGap',
      'colWrap',
      'strictAutoFit',
    ]

    return JSON.stringify(keys.map(key => options[key]))
  }
}
