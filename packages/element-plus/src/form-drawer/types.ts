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
}
// #endregion props

// #region slots
export interface FormDrawerSlotProps {
  resolve: (type?: string) => void
  reject: () => void
  form: Form
}

export interface FormDrawerSlots {
  header?: (props: FormDrawerSlotProps) => VNode
  default?: () => VNode
  footer?: (props: FormDrawerSlotProps) => VNode
}
// #endregion slots

export type FormDrawerSlotContent = SlotsType<FormDrawerSlots> | {
  [key in keyof FormDrawerSlots]?: FormDrawerSlots[key]
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
