import type { InjectionKey, Ref } from 'vue'
import type { GridInstance } from './types'
import { inject } from 'vue'

export const GridSymbol: InjectionKey<Ref<GridInstance>> = Symbol('VantGridContext')

export function useGrid(): Ref<GridInstance> {
  const grid = inject(GridSymbol)

  if (!grid)
    throw new Error('useGrid 必须在 Grid 组件内部使用')

  return grid
}

export const useFormGrid = useGrid
