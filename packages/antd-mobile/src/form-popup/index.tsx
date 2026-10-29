import type { Form, IFormProps } from '@silver-formily/core'
import type { IMiddleware } from '@silver-formily/shared'
import type { ReactNode } from 'react'
import type { FormPopupContent, FormPopupContentProps, FormPopupSlots, IFormPopup, IFormPopupProps } from './types'
import { createForm } from '@silver-formily/core'
import { FormProvider, observer } from '@silver-formily/react'
import { toJS } from '@silver-formily/reactive'
import { camelCase, clone, pascalCase } from '@silver-formily/shared'
import { Button, Popup, SafeArea } from 'antd-mobile'
import { createElement, isValidElement } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { startOpenLoading } from './loading'
import { applyMiddlewareWithFallback, normalizeDynamicMiddlewareNames } from './middleware'
import './style.less'

export type * from './types'

const Actions = observer(({ form, props, resolve, reject }: {
  form: Form
  props: IFormPopupProps
  resolve: () => void
  reject: () => void
}) => (
  <>
    <Button block {...props.cancelButtonProps} type="button" disabled={form.submitting || props.cancelButtonProps?.disabled} onClick={reject}>
      {props.cancelText ?? props.cancelButtonProps?.children ?? '取消'}
    </Button>
    <Button block color="primary" {...props.okButtonProps} type="button" loading={form.submitting || props.okButtonProps?.loading} onClick={resolve}>
      {props.okText ?? props.okButtonProps?.children ?? '确定'}
    </Button>
  </>
))

interface Session<TValues extends object> {
  promise: Promise<any>
  resolve: (value: any) => void
  reject: (reason: unknown) => void
  form?: Form<TValues>
  close: () => void
  settled: boolean
  busy: boolean
  stopOpenLoading?: () => void
}

export function FormPopup<
  TValues extends object = any,
  const DynamicMiddlewareNames extends readonly string[] = [],
>(
  popupProps: IFormPopupProps | string,
  content?: FormPopupContent<TValues, DynamicMiddlewareNames[number]>,
  dynamicMiddlewareNames?: DynamicMiddlewareNames,
): IFormPopup<TValues, DynamicMiddlewareNames[number]> {
  const props = typeof popupProps === 'string' ? { title: popupProps } : { ...popupProps }
  const names = normalizeDynamicMiddlewareNames(dynamicMiddlewareNames)
  const openMiddlewares: IMiddleware<IFormProps<TValues>>[] = []
  const middlewares = new Map<string, IMiddleware<Form<TValues>>[]>([
    ['confirm', []],
    ['cancel', []],
    ...names.map(name => [name, []] as [string, IMiddleware<Form<TValues>>[]]),
  ])
  let active: Session<TValues> | undefined

  function settle(session: Session<TValues>, outcome: { value: any } | { error: unknown }) {
    if (session.settled)
      return
    session.stopOpenLoading?.()
    session.settled = true
    if (active === session)
      active = undefined
    if ('error' in outcome)
      session.reject(outcome.error)
    else
      session.resolve(outcome.value)
    session.close()
  }

  async function cancel(session: Session<TValues>) {
    if (session.settled || session.busy)
      return
    session.busy = true
    try {
      if (session.form)
        await applyMiddlewareWithFallback(session.form, middlewares.get('cancel'), session.form)
      settle(session, { error: new Error('cancel') })
    }
    catch (error) {
      settle(session, { error })
    }
  }

  function confirm(session: Session<TValues>, type?: string) {
    if (session.settled || session.busy || !session.form)
      return
    session.busy = true
    const form = session.form
    const name = type ? camelCase(type) : 'confirm'
    const dynamic = names.includes(name)
    form.submit(async () => {
      try {
        const result = await applyMiddlewareWithFallback<Form<TValues>, any>(
          form,
          middlewares.get(name) ?? middlewares.get('confirm'),
          (current: Form<TValues> | undefined) => toJS((current ?? form).values),
        )
        settle(session, { value: dynamic ? toJS(form.values) : result })
      }
      catch (error) {
        settle(session, { error })
      }
    }).catch(() => { session.busy = false })
  }

  function mount(session: Session<TValues>) {
    const host = document.createElement('div')
    host.className = 'adm-formily-form-popup-root'
    document.body.append(host)
    const root = createRoot(host)
    let disposed = false
    function dispose() {
      if (disposed)
        return
      disposed = true
      queueMicrotask(() => {
        root.unmount()
        host.remove()
      })
    }
    const { loadingText: _loadingText, title, cancelText, cancelButtonProps, okText, okButtonProps, safeArea = true, afterClose, onClose, ...nativeProps } = props
    const bindings = {
      form: session.form!,
      resolve: (type?: string) => confirm(session, type),
      reject: () => { void cancel(session) },
      ...Object.fromEntries(names.map(name => [name, () => confirm(session, name)])),
    } as FormPopupContentProps<TValues, DynamicMiddlewareNames[number]>
    const slots = content && typeof content === 'object' && !isValidElement(content) && !Array.isArray(content)
      ? content as FormPopupSlots<TValues, DynamicMiddlewareNames[number]>
      : undefined
    function renderContent(value: ReactNode | ((props: typeof bindings) => ReactNode)): ReactNode {
      return typeof value === 'function' ? createElement(value, bindings) : value
    }
    function render(visible: boolean) {
      flushSync(() => root.render(
        <Popup
          position="bottom"
          getContainer={null}
          {...nativeProps}
          visible={visible}
          forceRender={false}
          destroyOnClose
          onClose={() => {
            void cancel(session)
            onClose?.()
          }}
          afterClose={() => {
            try {
              afterClose?.()
            }
            finally {
              dispose()
            }
          }}
        >
          <FormProvider form={session.form!}>
            <div className="adm-formily-form-popup">
              {(slots?.header || title != null) && <div className="adm-formily-form-popup-header">{slots?.header ? renderContent(slots.header) : title}</div>}
              <div className="adm-formily-form-popup-body">{renderContent(slots ? slots.default : content as ReactNode | ((props: typeof bindings) => ReactNode))}</div>
              <div className="adm-formily-form-popup-footer">
                {slots?.footer ? renderContent(slots.footer) : <Actions form={session.form!} props={{ cancelText, cancelButtonProps, okText, okButtonProps }} resolve={() => confirm(session)} reject={bindings.reject} />}
              </div>
              {safeArea && <SafeArea position="bottom" />}
            </div>
          </FormProvider>
        </Popup>,
      ))
    }
    // A same-tick reversal can leave the spring at rest without afterClose.
    session.close = () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!disposed)
          render(false)
      }))
    }
    try {
      render(false)
      render(true)
    }
    catch (error) {
      dispose()
      throw error
    }
  }

  const controller = {
    forOpen(middleware: IMiddleware<IFormProps<TValues>>) {
      openMiddlewares.push(middleware)
      return controller
    },
    forConfirm(middleware: IMiddleware<Form<TValues>>) {
      middlewares.get('confirm')!.push(middleware)
      return controller
    },
    forCancel(middleware: IMiddleware<Form<TValues>>) {
      middlewares.get('cancel')!.push(middleware)
      return controller
    },
    open(payload?: IFormProps<TValues>) {
      if (active)
        return active.promise
      let resolve!: Session<TValues>['resolve']
      let reject!: Session<TValues>['reject']
      const promise = new Promise<any>((done, fail) => {
        resolve = done
        reject = fail
      })
      const session: Session<TValues> = { promise, resolve, reject, settled: false, busy: false, close() {} }
      active = session
      const stopOpenLoading = startOpenLoading(props.loadingText)
      session.stopOpenLoading = stopOpenLoading
      void Promise.resolve().then(() => {
        const initial = clone(payload ?? {}) as IFormProps<TValues>
        return applyMiddlewareWithFallback<IFormProps<TValues>>(initial, openMiddlewares, current => current ?? initial)
      }).finally(stopOpenLoading).then((nextPayload) => {
        if (session.settled)
          return
        session.form = createForm<TValues>(nextPayload)
        mount(session)
      }).catch(error => settle(session, { error }))
      return promise
    },
    close() {
      if (active)
        void cancel(active)
    },
  }
  names.forEach((name) => {
    Object.assign(controller, {
      [`for${pascalCase(name)}`]: (middleware: IMiddleware<Form<TValues>>) => {
        middlewares.get(name)!.push(middleware)
        return controller
      },
    })
  })
  return controller as IFormPopup<TValues, DynamicMiddlewareNames[number]>
}

export default FormPopup
