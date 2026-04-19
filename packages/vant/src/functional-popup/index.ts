import type { Component } from 'vue'
import type {
  FunctionalPopupComponent,
  FunctionalPopupComponentProps,
  FunctionalPopupProps,
  FunctionalPopupReservedComponentPropName,
  FunctionalPopupSlots,
  IFunctionalPopup,
} from './types'
import { Popup as VanPopup } from 'vant'
import { h, markRaw } from 'vue'
import { cloneValue } from '../__builtins__'
import {
  callListener,
  createDetachedRenderer,
} from '../__builtins__/shared/functional-popup'

const RESERVED_COMPONENT_PROP_NAMES: FunctionalPopupReservedComponentPropName[] = [
  'show',
  'onUpdate:show',
  'onConfirm',
  'onCancel',
  'onUpdate:modelValue',
]

const DEFAULT_FUNCTIONAL_POPUP_PROPS: FunctionalPopupProps = {
  position: 'bottom',
  round: true,
  overlay: true,
  lockScroll: true,
  lazyRender: true,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
}

type FunctionalPopupPendingOutcome<TResult>
  = { status: 'resolve', value: TResult }
    | { status: 'reject', reason: unknown }

interface FunctionalPopupRenderBindings<TComponentProps extends object> {
  component: Component
  componentProps: TComponentProps
  popupProps: FunctionalPopupProps
  slots?: FunctionalPopupSlots
  handlePopupClosed: () => void
  handlePopupShowChange: (value: boolean) => void
}

function cloneSessionModelValue<T>(value: T): T {
  return cloneValue(value)
}

function resolveInitialComponentProps<TComponentProps extends object>(
  componentProps?: FunctionalPopupComponentProps<TComponentProps>,
) {
  const nextComponentProps = {
    ...(componentProps ?? {}),
  } as Record<string, unknown>

  if ('modelValue' in nextComponentProps) {
    nextComponentProps.modelValue = cloneSessionModelValue(nextComponentProps.modelValue)
  }

  return nextComponentProps as TComponentProps
}

function assertNoReservedComponentProps(componentProps?: object) {
  if (!componentProps) {
    return
  }

  const reservedComponentPropName = RESERVED_COMPONENT_PROP_NAMES.find((name) => {
    return name in componentProps
  })

  if (reservedComponentPropName) {
    throw new Error(`${reservedComponentPropName} is reserved in FunctionalPopup()`)
  }
}

export function FunctionalPopup<TComponentProps extends object = Record<string, any>, TResult = any>(
  popupProps: FunctionalPopupProps = {},
  component: FunctionalPopupComponent<TComponentProps>,
  slots?: FunctionalPopupSlots,
): IFunctionalPopup<TComponentProps, TResult> {
  const rawComponent = markRaw(component)
  const rawSlots = slots ? markRaw(slots) : undefined
  const resolvedPopupProps: FunctionalPopupProps = {
    ...DEFAULT_FUNCTIONAL_POPUP_PROPS,
    ...(popupProps ?? {}),
  }

  const env: {
    componentProps: TComponentProps
    outcomeSettled: boolean
    pendingOutcome?: FunctionalPopupPendingOutcome<TResult>
    promise?: Promise<TResult>
    rejectPromise?: (reason?: unknown) => void
    resolvePromise?: (value: TResult) => void
    settling: boolean
  } = {
    componentProps: resolveInitialComponentProps(),
    outcomeSettled: false,
    pendingOutcome: undefined,
    promise: undefined,
    rejectPromise: undefined,
    resolvePromise: undefined,
    settling: false,
  }

  const renderer = createDetachedRenderer<FunctionalPopupRenderBindings<TComponentProps>>(
    'FunctionalPopupRenderer',
    ({
      component,
      componentProps,
      handlePopupClosed,
      handlePopupShowChange,
      popupProps,
      slots,
      visible,
    }) => {
      const {
        show: _show,
        onClosed: _onClosed,
        'onUpdate:show': _onUpdateShow,
        ...popupBindings
      } = popupProps

      return h(
        VanPopup,
        {
          ...popupBindings,
          'show': visible,
          'onUpdate:show': (value: boolean) => {
            callListener(popupProps['onUpdate:show'], value)
            handlePopupShowChange(value)
          },
          'onClosed': () => {
            callListener((popupProps as Record<string, unknown>).onClosed)
            handlePopupClosed()
          },
        },
        {
          default: () => h(component as Component, componentProps as any, slots),
        },
      )
    },
  )

  function resetRuntimeState() {
    env.componentProps = resolveInitialComponentProps()
    env.pendingOutcome = undefined
    env.promise = undefined
    env.rejectPromise = undefined
    env.resolvePromise = undefined
    env.outcomeSettled = false
    env.settling = false
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

  function handlePopupClosed() {
    renderer.dispose()
    settlePendingOutcome()
    resetRuntimeState()
  }

  function createRuntimeComponentProps() {
    return {
      ...(env.componentProps as Record<string, unknown>),
      'onConfirm': (payload: TResult) => handleResolve(payload),
      'onCancel': () => handleReject(new Error('cancel')),
      'onUpdate:modelValue': (value: unknown) => updateModelValue(value),
    } as TComponentProps
  }

  function createRenderBindings(): FunctionalPopupRenderBindings<TComponentProps> {
    return {
      component: rawComponent,
      componentProps: createRuntimeComponentProps(),
      popupProps: resolvedPopupProps,
      slots: rawSlots,
      handlePopupClosed,
      handlePopupShowChange(value: boolean) {
        if (value) {
          return
        }

        handleReject(new Error('cancel'))
      },
    }
  }

  function renderPopup(visible: boolean) {
    renderer.render(createRenderBindings(), visible)
  }

  function updateModelValue(value: unknown) {
    env.componentProps = {
      ...(env.componentProps as Record<string, unknown>),
      modelValue: cloneSessionModelValue(value),
    } as TComponentProps

    renderPopup(true)
  }

  function handleResolve(payload: TResult) {
    if (!env.promise || env.settling) {
      return
    }

    env.settling = true
    env.pendingOutcome = {
      status: 'resolve',
      value: payload,
    }

    renderPopup(false)
  }

  function handleReject(reason: unknown = new Error('cancel')) {
    if (!env.promise || env.settling) {
      return
    }

    env.settling = true
    env.pendingOutcome = {
      status: 'reject',
      reason,
    }

    renderPopup(false)
  }

  return {
    open(componentProps?: FunctionalPopupComponentProps<TComponentProps>) {
      if (env.promise) {
        return env.promise
      }

      assertNoReservedComponentProps(componentProps)
      env.componentProps = resolveInitialComponentProps(componentProps)

      env.promise = new Promise<TResult>((resolve, reject) => {
        env.resolvePromise = resolve
        env.rejectPromise = reject
        renderPopup(true)
      })

      return env.promise
    },
  }
}

export default FunctionalPopup

export type {
  FunctionalPopupComponent,
  FunctionalPopupComponentProps,
  FunctionalPopupProps,
  FunctionalPopupReservedComponentPropName,
  FunctionalPopupSlots,
  IFunctionalPopup,
  VanPopupProps,
} from './types'
