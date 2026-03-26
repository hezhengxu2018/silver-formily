import type { Grid as GridInstance } from '@silver-formily/grid'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export const GridSymbol: InjectionKey<Ref<GridInstance<HTMLElement>>> = Symbol('VantGridContext')

export const useGrid = (): Ref<GridInstance<HTMLElement>> => inject(GridSymbol)

export const useFormGrid = useGrid
