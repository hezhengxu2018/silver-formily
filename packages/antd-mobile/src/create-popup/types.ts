import type { PopupProps } from 'antd-mobile/es/components/popup'
import type { ComponentProps, ComponentType } from 'react'

export interface PopupContentCallbacks<TResult> {
  onConfirm: (value: Exclude<TResult, null>) => void
  onCancel: () => void
}

export type PopupOptions = Omit<PopupProps, 'visible' | 'children' | 'onMaskClick' | 'forceRender' | 'destroyOnClose' | 'onClose'> & { safeArea?: boolean }
export type PopupResult<TComponent extends ComponentType<any>>
  = ComponentProps<TComponent> extends { onConfirm: (value: infer TResult) => void } ? Exclude<TResult, null> : unknown

export type PopupPromptProps<TComponent extends ComponentType<any>, TResult = PopupResult<TComponent>>
  = Omit<ComponentProps<TComponent>, keyof PopupContentCallbacks<TResult> | 'onClose'>
    & Partial<PopupContentCallbacks<TResult>> & { onClose?: () => void }

export interface PopupController<TComponent extends ComponentType<any>, TResult = PopupResult<TComponent>> {
  prompt: (props: PopupPromptProps<TComponent, TResult>) => Promise<Exclude<TResult, null> | null>
  close: () => void
}
