import type { Grid as IGrid } from '@silver-formily/grid'
import type { InjectionKey, Ref } from 'vue'
import { markRaw } from '@formily/reactive'
import { Grid } from '@silver-formily/grid'
import { inject } from 'vue'

export const FormGridSymbol: InjectionKey<Ref<IGrid>> = Symbol('FormGridContext')

export function createFormGrid(props): IGrid {
  return markRaw(new Grid(props))
}

export const useFormGrid = (): Ref<IGrid> => inject(FormGridSymbol)
