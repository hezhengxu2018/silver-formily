import type { Form, IFormProps } from '@formily/core'
import type { IMiddleware } from '@formily/shared'
import type { ButtonProps, DrawerProps } from 'element-plus'
import type { SlotsType, VNode } from 'vue'

// #region props
export type IFormDrawerProps = Partial<DrawerProps> & {
  cancelText?: string
  cancelButtonProps?: ButtonProps
  okText?: string
  okButtonProps?: ButtonProps
  loadingText?: string
  enterSubmit?: boolean
  closeOnUrlChange?: boolean
}
// #endregion props

// #region slots
export interface FormDrawerResolve {
  (type?: string): void
}

interface FormDrawerBaseSlotProps<T extends object = any> {
  resolve: FormDrawerResolve
  reject: () => void
  form: Form<T>
}

export type FormDrawerSlotProps<T extends object = any> = FormDrawerBaseSlotProps<T> & Record<string, any>

export interface FormDrawerSlots<T extends object = any, _DynamicMiddlewareName extends string = never> {
  header?: (props: FormDrawerSlotProps<T>) => VNode | VNode[]
  default?: (props: FormDrawerSlotProps<T>) => VNode | VNode[]
  footer?: (props: FormDrawerSlotProps<T>) => VNode | VNode[]
}
// #endregion slots

export type FormDrawerDefaultSlot<T extends object = any, DynamicMiddlewareName extends string = never>
  = FormDrawerSlots<T, DynamicMiddlewareName>['default']

export type FormDrawerSlotContent<T extends object = any, DynamicMiddlewareName extends string = never>
  = FormDrawerDefaultSlot<T, DynamicMiddlewareName> | SlotsType<FormDrawerSlots<T, DynamicMiddlewareName>> | {
    [key in keyof FormDrawerSlots<T, DynamicMiddlewareName>]?: FormDrawerSlots<T, DynamicMiddlewareName>[key]
  }

// #region iformdrawer
type ReservedFormDrawerMiddlewareName = 'open' | 'confirm' | 'cancel'
type ReservedFormDrawerMiddlewareMethodName = `for${Capitalize<ReservedFormDrawerMiddlewareName>}`

type NormalizeFormDrawerDynamicMiddlewareName<T extends string> = string extends T
  ? string
  : T extends `${infer Head}-${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<NormalizeFormDrawerDynamicMiddlewareName<Tail>>}`
    : T extends `${infer Head}_${infer Tail}`
      ? `${Lowercase<Head>}${Capitalize<NormalizeFormDrawerDynamicMiddlewareName<Tail>>}`
      : T extends `${infer Head} ${infer Tail}`
        ? `${Lowercase<Head>}${Capitalize<NormalizeFormDrawerDynamicMiddlewareName<Tail>>}`
        : T

type FormDrawerDynamicMiddlewareMethodName<T extends string> = `for${Capitalize<NormalizeFormDrawerDynamicMiddlewareName<T>>}`

type FormDrawerDynamicMiddlewareMethods<T extends object, DynamicMiddlewareName extends string> = {
  [K in FormDrawerDynamicMiddlewareMethodName<DynamicMiddlewareName> as K extends ReservedFormDrawerMiddlewareMethodName ? never : K]: (middleware: IMiddleware<Form<T>>) => IFormDrawer<T, DynamicMiddlewareName>
}

interface IFormDrawerBase<T extends object = any, DynamicMiddlewareName extends string = never> {
  forOpen: (middleware: IMiddleware<IFormProps<T>>) => IFormDrawer<T, DynamicMiddlewareName>
  forConfirm: (middleware: IMiddleware<Form<T>>) => IFormDrawer<T, DynamicMiddlewareName>
  forCancel: (middleware: IMiddleware<Form<T>>) => IFormDrawer<T, DynamicMiddlewareName>
  open: (props?: IFormProps<T>) => Promise<any>
  close: () => void
}

export type IFormDrawer<T extends object = any, DynamicMiddlewareName extends string = never>
  = IFormDrawerBase<T, DynamicMiddlewareName> & FormDrawerDynamicMiddlewareMethods<T, DynamicMiddlewareName>
// #endregion iformdrawer
