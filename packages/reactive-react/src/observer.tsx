import type React from 'react'
import type { IObserverOptions, IObserverProps, ReactFC } from './types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { forwardRef, memo } from 'react'
import { useObserver } from './hooks/useObserver'

type WithForwardRef<P> = P & {
  ref?: 'ref' extends keyof P ? P['ref'] : React.RefAttributes<any>['ref']
}

type ObserverComponent<P, Options extends IObserverOptions>
  = React.MemoExoticComponent<
    ReactFC<
      Options extends { forwardRef: true }
        ? WithForwardRef<P>
        : React.PropsWithoutRef<P>
    >
  >

export function observer<
  P,
  Options extends IObserverOptions = IObserverOptions,
>(
  component: ReactFC<P>,
  options?: Options,
): ObserverComponent<P, Options> {
  const realOptions = {
    forwardRef: false,
    ...options,
  }

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef((props: any, ref: any) => {
        // React 19 的 ReactNode 联合包含 Promise 成员，ReturnType 泛型推断会变宽，
        // 断言回渲染函数的标准返回类型
        return useObserver(
          () => component({ ...props, ref }),
          realOptions,
        ) as React.ReactNode
      })
    : (props: any): React.ReactNode => {
        return useObserver(() => component(props), realOptions) as React.ReactNode
      }

  const memoComponent = memo(wrappedComponent)

  hoistNonReactStatics(memoComponent, component)

  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName
  }

  return memoComponent
}

export const Observer = observer((props: IObserverProps) => {
  const children
    = typeof props.children === 'function' ? props.children() : props.children
  return <>{children}</>
})
