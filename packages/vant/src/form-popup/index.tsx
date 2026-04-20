import type { Form, IFormProps } from '@formily/core'
import type { IMiddleware } from '@formily/shared'
import type { Component } from 'vue'
import type {
  FormPopupProps,
  FormPopupResolvedSlotProps,
  FormPopupSlotContent,
  IFormPopup,
} from './types'
import { createForm } from '@formily/core'
import { toJS } from '@formily/reactive'
import { camelCase, isFn, isValid, pascalCase } from '@formily/shared'
import { cloneDeep } from 'es-toolkit/compat'
import { isVueOptions } from '../__builtins__'
import {
  applyMiddlewareWithFallback,
  callListener,
  createDetachedRenderer,
  normalizeDynamicMiddlewareNames,
} from '../__builtins__/shared/popup-runtime'
import PopupContent from './popup-content.vue'
import './style.scss'

const DEFAULT_FORM_POPUP_PROPS: FormPopupProps = {
  position: 'bottom',
  round: true,
  overlay: true,
  lockScroll: true,
  lazyRender: true,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
  safeAreaInsetBottom: true,
}

type FormPopupPendingOutcome
  = { status: 'resolve', value: any }
    | { status: 'reject', reason: unknown }

interface FormPopupRenderBindings<TValues extends object> {
  popupProps: FormPopupProps
  form: Form<TValues>
  resolve: (type?: string) => void
  reject: () => void
  onClosed: () => void
}

export function FormPopup<
  TValues extends object = any,
  const DynamicMiddlewareNames extends readonly string[] = [],
>(
  popupProps: FormPopupProps | string,
  content?: Component | FormPopupSlotContent<TValues, DynamicMiddlewareNames[number]>,
  dynamicMiddlewareNames?: DynamicMiddlewareNames,
): IFormPopup<TValues, DynamicMiddlewareNames[number]> {
  const formPopupProps: FormPopupProps = {
    ...DEFAULT_FORM_POPUP_PROPS,
    ...(typeof popupProps === 'string'
      ? { title: popupProps }
      : popupProps),
  }

  const env: {
    form?: Form<TValues>
    promise?: Promise<any>
    resolvePromise?: (value: any) => void
    rejectPromise?: (reason?: unknown) => void
    pendingOutcome?: FormPopupPendingOutcome
    outcomeSettled: boolean
    settling: boolean
    openMiddlewares: IMiddleware<IFormProps<TValues>>[]
    confirmMiddlewares: IMiddleware<Form<TValues>>[]
    cancelMiddlewares: IMiddleware<Form<TValues>>[]
    [key: `${string}Middlewares`]: IMiddleware<Form<TValues>>[] | IMiddleware<IFormProps<TValues>>[] | undefined
  } = {
    form: undefined,
    promise: undefined,
    resolvePromise: undefined,
    rejectPromise: undefined,
    pendingOutcome: undefined,
    outcomeSettled: false,
    settling: false,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }

  const normalizedDynamicMiddlewareNames = normalizeDynamicMiddlewareNames(dynamicMiddlewareNames)

  normalizedDynamicMiddlewareNames.forEach((middlewareName) => {
    env[`${middlewareName}Middlewares`] = []
  })

  function createSlotProps(): FormPopupResolvedSlotProps<TValues, DynamicMiddlewareNames[number]> {
    const dynamicActions = Object.fromEntries(
      normalizedDynamicMiddlewareNames.map((middlewareName) => {
        return [middlewareName, () => handleResolve(middlewareName)]
      }),
    ) as Record<DynamicMiddlewareNames[number], () => void>

    return {
      form: env.form as Form<TValues>,
      resolve: handleResolve,
      reject: handleReject,
      ...dynamicActions,
    }
  }

  function renderSlotByName(
    slotName: 'default' | 'header' | 'footer',
    slotProps: FormPopupResolvedSlotProps<TValues, DynamicMiddlewareNames[number]>,
  ) {
    if (slotName === 'default' && isVueOptions(content)) {
      const Content = content as any

      return <Content {...(slotProps as unknown as Record<string, unknown>)} />
    }

    if (slotName === 'default' && isFn(content)) {
      return (content as (props: FormPopupResolvedSlotProps<TValues, DynamicMiddlewareNames[number]>) => any)(slotProps)
    }

    return (content as {
      [key in 'default' | 'header' | 'footer']?: (props: FormPopupResolvedSlotProps<TValues, DynamicMiddlewareNames[number]>) => any
    } | undefined)?.[slotName]?.(slotProps) ?? null
  }

  function hasNamedSlot(slotName: 'header' | 'footer') {
    return Boolean(
      !isVueOptions(content)
      && !isFn(content)
      && (content as {
        [key in 'header' | 'footer']?: unknown
      } | undefined)?.[slotName],
    )
  }

  const renderer = createDetachedRenderer<FormPopupRenderBindings<TValues>>('FunctionalFormPopupRenderer', ({
    form,
    onClosed,
    popupProps,
    reject,
    resolve,
    visible,
  }) => {
    const slotProps = createSlotProps()
    const formPopupSlots = {
      default: () => renderSlotByName('default', slotProps),
      ...(hasNamedSlot('header')
        ? {
            header: () => renderSlotByName('header', slotProps),
          }
        : {}),
      ...(hasNamedSlot('footer')
        ? {
            footer: () => renderSlotByName('footer', slotProps),
          }
        : {}),
    }

    return (
      <PopupContent
        popupProps={popupProps}
        visible={visible}
        form={form}
        resolve={resolve}
        reject={reject}
        handlePopupShowChange={(value: boolean) => {
          callListener(popupProps['onUpdate:show'], value)

          if (!value) {
            reject()
          }
        }}
        handlePopupClosed={() => {
          callListener((popupProps as Record<string, unknown>).onClosed)
          onClosed()
        }}
        v-slots={formPopupSlots}
      />
    )
  })

  function resetRuntimeState() {
    env.form = undefined
    env.pendingOutcome = undefined
    env.promise = undefined
    env.rejectPromise = undefined
    env.resolvePromise = undefined
    env.outcomeSettled = false
    env.settling = false
  }

  function createRenderBindings(): FormPopupRenderBindings<TValues> {
    return {
      popupProps: formPopupProps,
      form: env.form as Form<TValues>,
      resolve: handleResolve,
      reject: handleReject,
      onClosed: handleClosed,
    }
  }

  function renderPopup(visible: boolean) {
    renderer.render(createRenderBindings(), visible)
  }

  function settlePendingOutcome() {
    if (!env.pendingOutcome || env.outcomeSettled) {
      return
    }

    env.outcomeSettled = true

    if (env.pendingOutcome.status === 'resolve') {
      env.resolvePromise?.(env.pendingOutcome.value)
      return
    }

    env.rejectPromise?.(env.pendingOutcome.reason)
  }

  function handleClosed() {
    renderer.dispose()
    settlePendingOutcome()
    resetRuntimeState()
  }

  function getConfirmMiddlewares(type?: string) {
    const normalizedType = isValid(type) ? camelCase(type) : undefined

    return normalizedType
      ? env[`${normalizedType}Middlewares`] ?? env.confirmMiddlewares
      : env.confirmMiddlewares
  }

  function handleResolve(type?: string) {
    if (!env.promise || env.settling || !env.form) {
      return
    }

    env.settling = true

    env.form.submit(async () => {
      try {
        const result = await applyMiddlewareWithFallback<Form<TValues>, any>(
          env.form as Form<TValues>,
          getConfirmMiddlewares(type) as IMiddleware<Form<TValues>>[],
          (currentForm) => {
            return toJS((currentForm ?? env.form as Form<TValues>).values)
          },
        )

        env.pendingOutcome = {
          status: 'resolve',
          value: result,
        }
      }
      catch (error) {
        env.pendingOutcome = {
          status: 'reject',
          reason: error,
        }
      }

      settlePendingOutcome()
      renderPopup(false)
    }).catch(() => {
      env.settling = false
    })
  }

  async function handleReject() {
    if (!env.promise || env.settling || !env.form) {
      return
    }

    env.settling = true

    try {
      await applyMiddlewareWithFallback(
        env.form,
        env.cancelMiddlewares,
        env.form,
      )
      env.pendingOutcome = {
        status: 'reject',
        reason: new Error('cancel'),
      }
    }
    catch (error) {
      env.pendingOutcome = {
        status: 'reject',
        reason: error,
      }
    }

    settlePendingOutcome()
    renderPopup(false)
  }

  const formPopup = {
    forOpen(middleware: IMiddleware<IFormProps<TValues>>) {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }

      return formPopup
    },
    forConfirm(middleware: IMiddleware<Form<TValues>>) {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }

      return formPopup
    },
    forCancel(middleware: IMiddleware<Form<TValues>>) {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }

      return formPopup
    },
    open(payload?: IFormProps<TValues>) {
      if (env.promise) {
        return env.promise
      }

      env.promise = new Promise((resolve, reject) => {
        env.resolvePromise = resolve
        env.rejectPromise = reject
      })

      const initialPayload = cloneDeep(payload ?? {}) as IFormProps<TValues>

      applyMiddlewareWithFallback<IFormProps<TValues>>(
        initialPayload,
        env.openMiddlewares,
        initialPayload,
      )
        .then((nextPayload) => {
          env.form = createForm<TValues>(nextPayload)
          renderPopup(true)
        })
        .catch((error) => {
          renderer.dispose()
          env.pendingOutcome = {
            status: 'reject',
            reason: error,
          }
          settlePendingOutcome()
          resetRuntimeState()
        })

      return env.promise
    },
    close() {
      if (!env.promise) {
        renderer.dispose()
        resetRuntimeState()
        return
      }

      void handleReject()
    },
  }

  normalizedDynamicMiddlewareNames.forEach((middlewareName) => {
    formPopup[`for${pascalCase(middlewareName)}`] = (middleware: IMiddleware<Form<TValues>>) => {
      if (isFn(middleware)) {
        (env[`${middlewareName}Middlewares`] as IMiddleware<Form<TValues>>[] | undefined)?.push(middleware)
      }

      return formPopup
    }
  })

  return formPopup as IFormPopup<TValues, DynamicMiddlewareNames[number]>
}

export default FormPopup

export type {
  ButtonProps,
  FormPopupCancelMiddleware,
  FormPopupConfirmMiddleware,
  FormPopupOpenMiddleware,
  FormPopupProps,
  FormPopupSlotContent,
  FormPopupSlotProps,
  FormPopupSlots,
  IFormPopup,
  VanPopupProps,
} from './types'
