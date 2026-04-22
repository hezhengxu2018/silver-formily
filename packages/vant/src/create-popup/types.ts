import type { PopupProps as VanPopupProps } from 'vant'
import type { Component, FunctionalComponent, MaybeRefOrGetter, VNodeChild } from 'vue'

export type FunctionalPopupReservedPopupPropName
  = | 'show'
    | 'onUpdate:show'

export type FunctionalPopupReservedComponentPropName
  = | 'show'
    | 'onUpdate:show'
    | 'onConfirm'
    | 'onFinish'
    | 'onCancel'
    | 'onUpdate:modelValue'

export type FunctionalPopupComponent = Component

type ResolveFunctionalPopupComponentProps<TComponent extends FunctionalPopupComponent>
  = TComponent extends new (...args: any[]) => { $props: infer TProps extends object }
    ? TProps
    : TComponent extends FunctionalComponent<infer TProps extends object>
      ? TProps
      : TComponent extends (props: infer TProps extends object, ...args: any[]) => any
        ? TProps
        : Record<string, unknown>

export type FunctionalPopupComponentProps<TComponent extends FunctionalPopupComponent = FunctionalPopupComponent>
  = Partial<Omit<ResolveFunctionalPopupComponentProps<TComponent>, FunctionalPopupReservedComponentPropName>>
    & Partial<Record<FunctionalPopupReservedComponentPropName, never>>

export type FunctionalPopupComponentPropsSource<TComponent extends FunctionalPopupComponent = FunctionalPopupComponent>
  = MaybeRefOrGetter<FunctionalPopupComponentProps<TComponent> | undefined>

export type FunctionalPopupProps
  = Partial<Omit<VanPopupProps, FunctionalPopupReservedPopupPropName>>
    & Partial<Record<FunctionalPopupReservedPopupPropName, never>>
    & Record<string, any>

export interface FunctionalPopupSlots {
  [key: string]: ((...args: any[]) => VNodeChild) | undefined
}

export interface PopupController<
  TComponent extends FunctionalPopupComponent = FunctionalPopupComponent,
  TResult = any,
> {
  open: (componentProps?: FunctionalPopupComponentPropsSource<TComponent>) => Promise<TResult>
  close: (reason?: unknown) => void
}

export type { VanPopupProps }
