import type { Form, IFormProps } from '@formily/core'
import type { IMiddleware } from '@formily/shared'
import type { App, Component } from 'vue'
import type { FormDrawerSlotContent, IFormDrawer, IFormDrawerProps } from './types'
import { createForm } from '@formily/core'
import { toJS } from '@formily/reactive'
import { applyMiddleware, isArr, isFn, isStr, isValid, pascalCase } from '@formily/shared'
import { observer } from '@silver-formily/reactive-vue'
import { camelCase } from 'lodash-es'
import { createApp, h, ref } from 'vue'
import { getTransitionDuration, isVueOptions, loading } from '../__builtins__'
import DrawerContent from './drawer-content.vue'

export function FormDrawer<T extends object = any>(
  title: IFormDrawerProps | string,
  content?: Component | FormDrawerSlotContent,
  dynamicMiddlewareNames?: string[],
): IFormDrawer<T> {
  const env: {
    root?: HTMLElement
    form?: Form<T>
    promise?: Promise<any>
    instance?: any
    app?: App<Element>
    openMiddlewares: IMiddleware<IFormProps<T>>[]
    confirmMiddlewares: IMiddleware<Form<T>>[]
    cancelMiddlewares: IMiddleware<Form<T>>[]
    [key: `${string}Middlewares`]: IMiddleware<Form<T>>[] | IMiddleware<IFormProps<T>>[] | undefined
  } = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    app: null,
    instance: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }

  if (isArr(dynamicMiddlewareNames)) {
    for (const middlewareName of dynamicMiddlewareNames) {
      /* istanbul ignore if -- @preserve */
      if (!isStr(middlewareName))
        return
      const _middlewareName = camelCase(middlewareName)
      /* istanbul ignore if -- @preserve */
      if (['open', 'cancel', 'confirm'].includes(_middlewareName)) {
        throw new Error(`for${pascalCase(_middlewareName)} is presved`)
      }
      (env[`${_middlewareName}Middlewares`] = [])
    }
  }

  document.body.append(env.root)

  const props = (isStr(title) ? ({ title }) : title) as IFormDrawerProps

  function render(visible: boolean, resolve?: (type?: string) => any, reject?: () => any) {
    const _content = isVueOptions(content) ? { default: () => h(content) } : content
    if (!env.instance) {
      const ComponentConstructor = observer({
        setup(_, { expose }) {
          const visible = ref(false)
          expose({
            visible,
          })
          return () => h(DrawerContent, {
            drawerProps: props,
            form: env.form,
            resolve,
            reject,
            visible: visible.value,
          }, _content)
        },
      })
      env.app = createApp(ComponentConstructor)
      env.instance = env.app.mount(env.root)
    }
    env.instance.visible = visible
  }

  function disposeDrawer() {
    const animationDuration = getTransitionDuration()
    setTimeout(() => {
      env.app?.unmount?.()
      env.app = null
      env.instance = null
      env.root?.remove()
      env.root = undefined
    }, animationDuration)
  }

  const formDrawer = {
    forOpen: (middleware: IMiddleware<IFormProps<T>>) => {
      isFn(middleware) && env.openMiddlewares.push(middleware)
      return formDrawer
    },
    forConfirm: (middleware: IMiddleware<Form<T>>) => {
      isFn(middleware) && env.confirmMiddlewares.push(middleware)
      return formDrawer
    },
    forCancel: (middleware: IMiddleware<Form<T>>) => {
      isFn(middleware) && env.cancelMiddlewares.push(middleware)
      return formDrawer
    },
    open: (payload: IFormProps<T>) => {
      /* istanbul ignore if -- @preserve */
      if (env.promise)
        return env.promise

      env.promise = new Promise((res, rej) => {
        loading(props.loadingText, () => applyMiddleware(payload, env.openMiddlewares))
          .then((resPayload) => {
            env.form = env.form || createForm(resPayload as IFormProps<T>)
            render(true, (type: string) => {
              env.form.submit(async () => {
                await (isValid(type) ? applyMiddleware(env.form, env[`${type}Middlewares`]) : applyMiddleware(env.form, env.confirmMiddlewares))
                res(toJS(env.form.values))
                formDrawer.close()
                disposeDrawer()
              }).catch((error) => {
                console.warn(error)
              })
            }, async () => {
              await loading(props.loadingText, () =>
                applyMiddleware(env.form, env.cancelMiddlewares))
              formDrawer.close()
              disposeDrawer()
              rej(new Error('cancel'))
            })
          })
          .catch(/* istanbul ignore next -- @preserve */ error => rej(error))
      })
      return env.promise
    },
    close: () => {
      /* istanbul ignore if -- @preserve */
      if (!env.root)
        return
      render(false)
    },
  }

  if (isArr(dynamicMiddlewareNames)) {
    for (const middlewareName of dynamicMiddlewareNames) {
      const _middlewareName = camelCase(middlewareName)
      formDrawer[`for${pascalCase(_middlewareName)}`] = (middleware: IMiddleware<Form<T>>) => {
        isFn(middleware) && env[`${_middlewareName}Middlewares`].push(middleware)
        return formDrawer
      }
    }
  }

  return formDrawer as IFormDrawer<T>
}

export default FormDrawer
