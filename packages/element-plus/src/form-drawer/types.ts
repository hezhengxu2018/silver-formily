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
export interface IFormDrawer<T extends object = any> {
  forOpen: (middleware: IMiddleware<IFormProps<T>>) => IFormDrawer<T>
  forConfirm: (middleware: IMiddleware<Form<T>>) => IFormDrawer<T>
  forCancel: (middleware: IMiddleware<Form<T>>) => IFormDrawer<T>
  [key: `for${string}`]: (middleware: IMiddleware<IFormProps<T>> | IMiddleware<Form<T>>) => IFormDrawer<T>
  open: (props?: IFormProps<T>) => Promise<any>
  close: () => void
}
// #endregion iformdrawer
