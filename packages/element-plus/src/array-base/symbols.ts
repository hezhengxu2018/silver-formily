import type { InjectionKey } from 'vue'
import type { IArrayBaseContext, IArrayBaseItemProps } from './types'

export const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> = Symbol('ArrayBaseContext')
export const ItemSymbol: InjectionKey<IArrayBaseItemProps> = Symbol('ItemContext')
