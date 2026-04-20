import type { App, ShallowRef } from 'vue'
import type {
  FunctionalPopupComponent,
  FunctionalPopupComponentProps,
  FunctionalPopupProps,
  FunctionalPopupSlots,
  PopupController,
} from './types'
import { cloneDeep } from 'es-toolkit/compat'
import { Popup as VanPopup } from 'vant'
import { createApp, defineComponent, ref, shallowRef } from 'vue'

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
type PopupRenderableComponent<TProps extends object> = new (...args: any[]) => {
  $props: TProps & Record<string, unknown>
}

type PopupRuntimeComponentProps<
  TComponent extends FunctionalPopupComponent,
  TResult,
> = FunctionalPopupComponentProps<TComponent> & {
  'onCancel': () => void
  'onConfirm': (payload: TResult) => void
  'onFinish': (payload: TResult) => void
  'onUpdate:modelValue': (value: unknown) => void
}

export function createPopup<TComponent extends FunctionalPopupComponent = FunctionalPopupComponent, TResult = any>(
  popupProps: FunctionalPopupProps = {},
  component: TComponent,
  slots?: FunctionalPopupSlots,
): PopupController<TComponent, TResult> {
  const resolvedPopupProps: FunctionalPopupProps = {
    ...DEFAULT_FUNCTIONAL_POPUP_PROPS,
    ...(popupProps ?? {}),
  }

  const env: {
    componentProps: FunctionalPopupComponentProps<TComponent>
    promise?: Promise<TResult>
    rejectPromise?: (reason?: unknown) => void
    resolvePromise?: (value: TResult) => void
  } = {
    componentProps: {} as FunctionalPopupComponentProps<TComponent>,
    promise: undefined,
    rejectPromise: undefined,
    resolvePromise: undefined,
  }
  const rendererEnv: {
    app?: App<Element>
    props?: ShallowRef<PopupRuntimeComponentProps<TComponent, TResult>>
    root?: HTMLElement
    visible?: ShallowRef<boolean>
  } = {}
  const PopupContentComponent = component as PopupRenderableComponent<PopupRuntimeComponentProps<TComponent, TResult>>

  function ensureRoot() {
    if (rendererEnv.root) {
      return rendererEnv.root
    }

    rendererEnv.root = document.createElement('div')
    document.body.append(rendererEnv.root)
    return rendererEnv.root
  }

  function ensureRenderer(initialProps: PopupRuntimeComponentProps<TComponent, TResult>) {
    if (rendererEnv.app && rendererEnv.props && rendererEnv.visible) {
      return
    }

    rendererEnv.props = shallowRef(initialProps)
    rendererEnv.visible = ref(false)

    const RootComponent = defineComponent({
      name: 'FunctionalPopupRenderer',
      setup() {
        return () => {
          const {
            show: _show,
            'onUpdate:show': _onUpdateShow,
            ...popupBindings
          } = resolvedPopupProps

          return (
            <VanPopup
              {...popupBindings}
              show={rendererEnv.visible!.value}
              onUpdate:show={(value: boolean) => {
                if (value) {
                  return
                }

                handleReject(new Error('cancel'))
              }}
              onClosed={handlePopupClosed}
            >
              <PopupContentComponent {...rendererEnv.props!.value} v-slots={slots} />
            </VanPopup>
          )
        }
      },
    })

    rendererEnv.app = createApp(RootComponent)
    rendererEnv.app.mount(ensureRoot())
  }

  function disposeRenderer() {
    rendererEnv.app?.unmount?.()
    rendererEnv.root?.remove()
    rendererEnv.app = undefined
    rendererEnv.props = undefined
    rendererEnv.root = undefined
    rendererEnv.visible = undefined
  }

  function resetRuntimeState() {
    env.componentProps = {} as FunctionalPopupComponentProps<TComponent>
    env.promise = undefined
    env.rejectPromise = undefined
    env.resolvePromise = undefined
  }

  function handlePopupClosed() {
    disposeRenderer()
    resetRuntimeState()
  }

  function createRuntimeComponentProps() {
    return {
      ...(env.componentProps as Record<string, unknown>),
      'onConfirm': (payload: TResult) => handleResolve(payload),
      'onFinish': (payload: TResult) => handleResolve(payload),
      'onCancel': () => handleReject(new Error('cancel')),
      'onUpdate:modelValue': (value: unknown) => updateModelValue(value),
    } as PopupRuntimeComponentProps<TComponent, TResult>
  }

  function renderPopup(visible: boolean) {
    const runtimeComponentProps = createRuntimeComponentProps()
    ensureRenderer(runtimeComponentProps)
    rendererEnv.props!.value = runtimeComponentProps
    rendererEnv.visible!.value = visible
  }

  function updateModelValue(value: unknown) {
    env.componentProps = {
      ...(env.componentProps as Record<string, unknown>),
      modelValue: cloneDeep(value),
    } as unknown as FunctionalPopupComponentProps<TComponent>

    renderPopup(true)
  }

  function handleResolve(payload: TResult) {
    env.resolvePromise?.(payload)
    renderPopup(false)
  }

  function handleReject(reason: unknown = new Error('cancel')) {
    env.rejectPromise?.(reason)
    renderPopup(false)
  }

  return {
    open(componentProps?: FunctionalPopupComponentProps<TComponent>) {
      if (env.promise) {
        return env.promise
      }

      env.componentProps = (componentProps ?? {}) as FunctionalPopupComponentProps<TComponent>

      env.promise = new Promise<TResult>((resolve, reject) => {
        env.resolvePromise = resolve
        env.rejectPromise = reject
        renderPopup(true)
      })

      return env.promise
    },
  }
}

export default createPopup
