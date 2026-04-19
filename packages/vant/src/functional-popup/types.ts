import type { PopupProps as VanPopupProps } from 'vant'
import type { Component, VNodeChild } from 'vue'

export type FunctionalPopupReservedComponentPropName
  = | 'show'
    | 'onUpdate:show'
    | 'onConfirm'
    | 'onCancel'
    | 'onUpdate:modelValue'

export type FunctionalPopupComponentProps<TComponentProps extends object = Record<string, any>>
  = Partial<Omit<TComponentProps, FunctionalPopupReservedComponentPropName>>
    & Partial<Record<FunctionalPopupReservedComponentPropName, never>>

export type FunctionalPopupProps = Partial<VanPopupProps> & Record<string, any>

export interface FunctionalPopupSlots {
  [key: string]: ((...args: any[]) => VNodeChild) | undefined
}

export type FunctionalPopupComponent<TComponentProps extends object = Record<string, any>>
  = Component<TComponentProps>

export interface IFunctionalPopup<
  TComponentProps extends object = Record<string, any>,
  TResult = any,
> {
  open: (componentProps?: FunctionalPopupComponentProps<TComponentProps>) => Promise<TResult>
}

export type { VanPopupProps }
