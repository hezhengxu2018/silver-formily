import type { Form, IFormProps } from '@formily/core'
import type { IMiddleware } from '@formily/shared'
import type { ButtonProps, DialogProps } from 'element-plus'
import type { SlotsType, VNode } from 'vue'

// #region props
export type IFormDialogProps = Partial<DialogProps> & {
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
export interface FormDialogResolve {
  (type?: string): void
}

interface FormDialogBaseSlotProps<T extends object = any> {
  resolve: FormDialogResolve
  reject: () => void
  form: Form<T>
}

export type FormDialogSlotProps<T extends object = any> = FormDialogBaseSlotProps<T> & Record<string, any>

export interface FormDialogSlots<T extends object = any, _DynamicMiddlewareName extends string = never> {
  header?: (props: FormDialogSlotProps<T>) => VNode | VNode[]
  default?: (props: FormDialogSlotProps<T>) => VNode | VNode[]
  footer?: (props: FormDialogSlotProps<T>) => VNode | VNode[]
}
// #endregion slots

export type FormDialogDefaultSlot<T extends object = any, DynamicMiddlewareName extends string = never>
  = FormDialogSlots<T, DynamicMiddlewareName>['default']

export type FormDialogSlotContent<T extends object = any, DynamicMiddlewareName extends string = never>
  = FormDialogDefaultSlot<T, DynamicMiddlewareName> | SlotsType<FormDialogSlots<T, DynamicMiddlewareName>> | {
    [key in keyof FormDialogSlots<T, DynamicMiddlewareName>]?: FormDialogSlots<T, DynamicMiddlewareName>[key]
  }

// #region iformdialog
type ReservedFormDialogMiddlewareName = 'open' | 'confirm' | 'cancel'
type ReservedFormDialogMiddlewareMethodName = `for${Capitalize<ReservedFormDialogMiddlewareName>}`

type NormalizeFormDialogDynamicMiddlewareName<T extends string> = string extends T
  ? string
  : T extends `${infer Head}-${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<NormalizeFormDialogDynamicMiddlewareName<Tail>>}`
    : T extends `${infer Head}_${infer Tail}`
      ? `${Lowercase<Head>}${Capitalize<NormalizeFormDialogDynamicMiddlewareName<Tail>>}`
      : T extends `${infer Head} ${infer Tail}`
        ? `${Lowercase<Head>}${Capitalize<NormalizeFormDialogDynamicMiddlewareName<Tail>>}`
        : T

type FormDialogDynamicMiddlewareMethodName<T extends string> = `for${Capitalize<NormalizeFormDialogDynamicMiddlewareName<T>>}`

type FormDialogDynamicMiddlewareMethods<T extends object, DynamicMiddlewareName extends string> = {
  [K in FormDialogDynamicMiddlewareMethodName<DynamicMiddlewareName> as K extends ReservedFormDialogMiddlewareMethodName ? never : K]: (middleware: IMiddleware<Form<T>>) => IFormDialog<T, DynamicMiddlewareName>
}

interface IFormDialogBase<T extends object = any, DynamicMiddlewareName extends string = never> {
  forOpen: (middleware: IMiddleware<IFormProps<T>>) => IFormDialog<T, DynamicMiddlewareName>
  forConfirm: (middleware: IMiddleware<Form<T>>) => IFormDialog<T, DynamicMiddlewareName>
  forCancel: (middleware: IMiddleware<Form<T>>) => IFormDialog<T, DynamicMiddlewareName>
  open: (props?: IFormProps<T>) => Promise<any>
  close: () => void
}

export type IFormDialog<T extends object = any, DynamicMiddlewareName extends string = never>
  = IFormDialogBase<T, DynamicMiddlewareName> & FormDialogDynamicMiddlewareMethods<T, DynamicMiddlewareName>
// #endregion iformdialog
