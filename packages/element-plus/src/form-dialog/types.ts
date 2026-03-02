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
}
// #endregion props

// #region slots
export interface FormDialogSlotProps {
  resolve: (type?: string) => void
  reject: () => void
  form: Form
}

export interface FormDialogSlots {
  header?: (props: FormDialogSlotProps) => VNode
  default?: () => VNode
  footer?: (props: FormDialogSlotProps) => VNode
}
// #endregion slots

export type FormDialogSlotContent = SlotsType<FormDialogSlots> | {
  [key in keyof FormDialogSlots]?: FormDialogSlots[key]
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
