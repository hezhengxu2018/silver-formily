import type { Grid as IGrid, IGridOptions } from '@silver-formily/grid'
import type { InjectionKey, Ref } from 'vue'
import { createGrid } from '@silver-formily/grid'
import { inject } from 'vue'

export const FormGridSymbol: InjectionKey<Ref<IGrid<HTMLElement>>> = Symbol('FormGridContext')

export function createFormGrid(props?: IGridOptions): IGrid<HTMLElement> {
  return createGrid(props)
}

export const useFormGrid = (): Ref<IGrid<HTMLElement>> => inject(FormGridSymbol)
