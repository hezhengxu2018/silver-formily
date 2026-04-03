import type { Form, IFormProps } from '@formily/core'
import type { IMiddleware } from '@formily/shared'
import type { ButtonProps, PopupProps as VanPopupProps } from 'vant'
import type { Component, SlotsType, VNode } from 'vue'

// #region props
export type FormPopupProps = Partial<VanPopupProps> & Record<string, any> & {
  title?: string
  cancelText?: string
  cancelButtonProps?: Partial<ButtonProps>
  okText?: string
  okButtonProps?: Partial<ButtonProps>
}
// #endregion props

// #region slots
type FormPopupDynamicResolveMethods<DynamicMiddlewareName extends string> = {
  [K in NormalizeFormPopupDynamicMiddlewareName<DynamicMiddlewareName> as K extends ReservedFormPopupMiddlewareName ? never : K]: () => void
}

export interface FormPopupResolve {
  (type?: string): void
}

interface FormPopupBaseSlotProps<TValues extends object = any> {
  resolve: FormPopupResolve
  reject: () => void
  form: Form<TValues>
}

export type FormPopupSlotProps<TValues extends object = any> = FormPopupBaseSlotProps<TValues> & Record<string, any>

export type FormPopupResolvedSlotProps<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = FormPopupBaseSlotProps<TValues> & FormPopupDynamicResolveMethods<DynamicMiddlewareName>

export interface FormPopupSlots<TValues extends object = any, DynamicMiddlewareName extends string = never> {
  header?: (props: FormPopupResolvedSlotProps<TValues, DynamicMiddlewareName>) => VNode | VNode[]
  default?: (props: FormPopupResolvedSlotProps<TValues, DynamicMiddlewareName>) => VNode | VNode[]
  footer?: (props: FormPopupResolvedSlotProps<TValues, DynamicMiddlewareName>) => VNode | VNode[]
}
// #endregion slots

export type FormPopupDefaultSlot<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = FormPopupSlots<TValues, DynamicMiddlewareName>['default']

export type FormPopupSlotContent<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = Component | FormPopupDefaultSlot<TValues, DynamicMiddlewareName> | SlotsType<FormPopupSlots<TValues, DynamicMiddlewareName>> | {
    [key in keyof FormPopupSlots<TValues, DynamicMiddlewareName>]?: FormPopupSlots<TValues, DynamicMiddlewareName>[key]
  }

export type FormPopupOpenMiddleware<TValues extends object = any> = IMiddleware<
  IFormProps<TValues>,
  Promise<IFormProps<TValues> | undefined> | IFormProps<TValues> | undefined
>

export type FormPopupConfirmMiddleware<TValues extends object = any, TResult = any> = IMiddleware<
  Form<TValues>,
  Promise<TResult> | TResult
>

export type FormPopupCancelMiddleware<TValues extends object = any, TResult = any> = IMiddleware<
  Form<TValues>,
  Promise<TResult> | TResult
>

type ReservedFormPopupMiddlewareName = 'open' | 'confirm' | 'cancel'
type ReservedFormPopupMiddlewareMethodName = `for${Capitalize<ReservedFormPopupMiddlewareName>}`

type NormalizeFormPopupDynamicMiddlewareName<T extends string> = string extends T
  ? string
  : T extends `${infer Head}-${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<NormalizeFormPopupDynamicMiddlewareName<Tail>>}`
    : T extends `${infer Head}_${infer Tail}`
      ? `${Lowercase<Head>}${Capitalize<NormalizeFormPopupDynamicMiddlewareName<Tail>>}`
      : T extends `${infer Head} ${infer Tail}`
        ? `${Lowercase<Head>}${Capitalize<NormalizeFormPopupDynamicMiddlewareName<Tail>>}`
        : T

type FormPopupDynamicMiddlewareMethodName<T extends string> = `for${Capitalize<NormalizeFormPopupDynamicMiddlewareName<T>>}`

type FormPopupDynamicMiddlewareMethods<TValues extends object, DynamicMiddlewareName extends string> = {
  [K in FormPopupDynamicMiddlewareMethodName<DynamicMiddlewareName> as K extends ReservedFormPopupMiddlewareMethodName ? never : K]: (middleware: FormPopupConfirmMiddleware<TValues>) => IFormPopup<TValues, DynamicMiddlewareName>
}

interface IFormPopupBase<TValues extends object = any, DynamicMiddlewareName extends string = never> {
  forOpen: (middleware: FormPopupOpenMiddleware<TValues>) => IFormPopup<TValues, DynamicMiddlewareName>
  forConfirm: (middleware: FormPopupConfirmMiddleware<TValues>) => IFormPopup<TValues, DynamicMiddlewareName>
  forCancel: (middleware: FormPopupCancelMiddleware<TValues>) => IFormPopup<TValues, DynamicMiddlewareName>
  open: (props?: IFormProps<TValues>) => Promise<any>
  close: () => void
}

export type IFormPopup<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = IFormPopupBase<TValues, DynamicMiddlewareName> & FormPopupDynamicMiddlewareMethods<TValues, DynamicMiddlewareName>

export type { ButtonProps, VanPopupProps }
