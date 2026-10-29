import type { Form, IFormProps } from '@silver-formily/core'
import type { IMiddleware } from '@silver-formily/shared'
import type { ButtonProps, PopupProps } from 'antd-mobile'
import type { ComponentType, ReactNode } from 'react'

export interface IFormPopupProps extends Omit<PopupProps, 'visible' | 'children' | 'forceRender' | 'destroyOnClose'> {
  loadingText?: string
  title?: ReactNode
  cancelText?: ReactNode
  cancelButtonProps?: ButtonProps
  okText?: ReactNode
  okButtonProps?: ButtonProps
  safeArea?: boolean
}

type FormPopupDynamicResolveMethods<DynamicMiddlewareName extends string> = {
  [K in NormalizeFormPopupDynamicMiddlewareName<DynamicMiddlewareName> as K extends ReservedFormPopupMiddlewareName ? never : K]: () => void
}

export interface FormPopupResolve {
  (type?: string): void
}

interface FormPopupBaseContentProps<TValues extends object = any> {
  resolve: FormPopupResolve
  reject: () => void
  form: Form<TValues>
}

export type FormPopupContentProps<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = FormPopupBaseContentProps<TValues> & FormPopupDynamicResolveMethods<DynamicMiddlewareName>

export interface FormPopupSlots<TValues extends object = any, DynamicMiddlewareName extends string = never> {
  header?: (props: FormPopupContentProps<TValues, DynamicMiddlewareName>) => ReactNode
  default?: (props: FormPopupContentProps<TValues, DynamicMiddlewareName>) => ReactNode
  footer?: (props: FormPopupContentProps<TValues, DynamicMiddlewareName>) => ReactNode
}

export type FormPopupDefaultContent<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = FormPopupSlots<TValues, DynamicMiddlewareName>['default']

export type FormPopupContent<TValues extends object = any, DynamicMiddlewareName extends string = never>
  = ReactNode | ComponentType<FormPopupContentProps<TValues, DynamicMiddlewareName>> | {
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

type ReservedFormPopupMiddlewareName = 'open' | 'confirm' | 'cancel' | 'form' | 'resolve' | 'reject'
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
