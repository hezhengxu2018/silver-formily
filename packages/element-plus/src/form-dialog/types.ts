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
export interface IFormDialog<T extends object = any> {
  forOpen: (middleware: IMiddleware<IFormProps<T>>) => IFormDialog<T>
  forConfirm: (middleware: IMiddleware<Form<T>>) => IFormDialog<T>
  forCancel: (middleware: IMiddleware<Form<T>>) => IFormDialog<T>
  [key: `for${string}`]: (middleware: IMiddleware<IFormProps<T>> | IMiddleware<Form<T>>) => IFormDialog<T>
  open: (props?: IFormProps<T>) => Promise<any>
  close: () => void
}
// #endregion iformdialog
