import type { IMiddleware } from '@formily/shared'
import type { App, Ref, VNodeChild } from 'vue'
import { camelCase, isStr, pascalCase } from '@formily/shared'
import { observer } from '@silver-formily/reactive-vue'
import { createApp, ref } from 'vue'

const DEFAULT_RESERVED_MIDDLEWARE_NAMES = ['open', 'confirm', 'cancel']

interface DetachedRendererInstance<TProps extends object> {
  setRenderProps: (props: TProps) => void
  setVisible: (value: boolean) => void
}

export function callListener(listener: unknown, ...args: unknown[]) {
  if (Array.isArray(listener)) {
    listener.forEach((currentListener) => {
      if (typeof currentListener === 'function') {
        currentListener(...args)
      }
    })
    return
  }

  if (typeof listener === 'function') {
    listener(...args)
  }
}

export async function applyMiddlewareWithFallback<TPayload, TResult = TPayload>(
  payload: TPayload,
  middlewares: IMiddleware[] | undefined,
  fallback: TResult | ((payload: TPayload | undefined) => TResult),
) {
  const queue = middlewares ?? []
  const resolveFallback = (currentPayload: TPayload | undefined) => {
    return typeof fallback === 'function'
      ? (fallback as (payload: TPayload | undefined) => TResult)(currentPayload)
      : fallback
  }

  async function dispatch(index: number, currentPayload: TPayload | undefined): Promise<unknown> {
    if (index >= queue.length) {
      return resolveFallback(currentPayload)
    }

    const middleware = queue[index]
    let nextCalled = false
    let nextResult: Promise<unknown> | undefined

    const next = (nextPayload?: TPayload) => {
      nextCalled = true
      nextResult = dispatch(index + 1, nextPayload === undefined ? currentPayload : nextPayload)
      return nextResult
    }

    const result = await middleware(currentPayload, next as any)

    if (!nextCalled) {
      return result === undefined
        ? resolveFallback(currentPayload)
        : result
    }

    if (result !== undefined) {
      return result
    }

    return nextResult
  }

  return await dispatch(0, payload) as TResult
}

export function normalizeDynamicMiddlewareNames(
  dynamicMiddlewareNames?: readonly string[],
  reservedNames: string[] = DEFAULT_RESERVED_MIDDLEWARE_NAMES,
) {
  return (dynamicMiddlewareNames ?? []).map((middlewareName) => {
    if (!isStr(middlewareName)) {
      throw new TypeError('dynamic middleware name must be a string')
    }

    const normalizedName = camelCase(middlewareName)

    if (reservedNames.includes(normalizedName)) {
      throw new Error(`for${pascalCase(normalizedName)} is preserved`)
    }

    return normalizedName
  })
}

export function createDetachedRenderer<TProps extends object>(
  name: string,
  renderContent: (props: TProps & { visible: boolean }) => VNodeChild,
) {
  const env: {
    app?: App<Element>
    root?: HTMLElement
    instance?: DetachedRendererInstance<TProps>
  } = {}

  function ensureRoot() {
    if (env.root) {
      return env.root
    }

    env.root = document.createElement('div')
    document.body.append(env.root)
    return env.root
  }

  function ensureInstance(initialProps: TProps) {
    if (env.instance) {
      return env.instance
    }

    const RootComponent = observer({
      name,
      setup(_, { expose }) {
        const visible = ref(false)
        const renderProps = ref(initialProps) as Ref<TProps>

        expose({
          setRenderProps(nextProps: TProps) {
            renderProps.value = nextProps
          },
          setVisible(value: boolean) {
            visible.value = value
          },
        })

        return () => renderContent({
          ...renderProps.value,
          visible: visible.value,
        })
      },
    })

    env.app = createApp(RootComponent)
    env.instance = env.app.mount(ensureRoot()) as unknown as DetachedRendererInstance<TProps>

    return env.instance
  }

  function render(props: TProps, visible: boolean) {
    const instance = ensureInstance(props)

    instance.setRenderProps(props)
    instance.setVisible(visible)
  }

  function dispose() {
    env.app?.unmount?.()
    env.root?.remove()
    env.app = undefined
    env.instance = undefined
    env.root = undefined
  }

  return {
    dispose,
    render,
  }
}
