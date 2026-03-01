import type { Grid as IGrid } from '@silver-formily/grid'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export const FormGridSymbol: InjectionKey<Ref<IGrid<HTMLElement>>> = Symbol('FormGridContext')

export const useFormGrid = (): Ref<IGrid<HTMLElement>> => inject(FormGridSymbol)
