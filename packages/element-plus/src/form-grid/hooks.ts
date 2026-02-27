import type { Grid as IGrid } from '@formily/grid'
import type { InjectionKey, Ref } from 'vue'
import { Grid } from '@formily/grid'
import { markRaw } from '@formily/reactive'
import { inject } from 'vue'

export const FormGridSymbol: InjectionKey<Ref<IGrid<HTMLElement>>> = Symbol('FormGridContext')

export function createFormGrid(props): IGrid<HTMLElement> {
  return markRaw(new Grid(props))
}

export const useFormGrid = (): Ref<IGrid<HTMLElement>> => inject(FormGridSymbol)
