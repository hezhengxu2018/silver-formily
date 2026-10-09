import type React from 'react'
import type { IObserverOptions, IObserverProps } from './types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { forwardRef, memo } from 'react'
import { useObserver } from './hooks/useObserver'

type WithForwardRef<P> = P & {
  // 未声明 ref 的组件走 unknown 兜底：React 类型的 RefCallback 用 method 语法（双变），
  // 对象 ref 靠结构协变，两种 ref 形态都能正确收窄
  ref?: 'ref' extends keyof P ? P['ref'] : React.RefAttributes<unknown>['ref']
}

// React 18+ 的函数组件类型不再隐式包含 children，这里显式合并，
// 让未声明 children 的组件仍可接收 children
type ObserverRenderProps<P>
  = Omit<{ children?: React.ReactNode | undefined }, keyof P> & P

type ObserverRenderFunction<P>
  = (props: ObserverRenderProps<P>) => React.ReactNode

type ObserverComponent<P, Options extends IObserverOptions>
  = React.MemoExoticComponent<
    ObserverRenderFunction<
      Options extends { forwardRef: true }
        ? WithForwardRef<P>
        : React.PropsWithoutRef<P>
    >
  >

export function observer<
  P,
  Options extends IObserverOptions = IObserverOptions,
>(
  component: ObserverRenderFunction<P>,
  options?: Options,
): ObserverComponent<P, Options> {
  const realOptions = {
    forwardRef: false,
    ...options,
  }

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef<unknown, ObserverRenderProps<P>>((props, ref) => {
        // React 19 的 ReactNode 联合包含 Promise 成员，ReturnType 泛型推断会变宽，
        // 断言回渲染函数的标准返回类型
        return useObserver(
          () => component({ ...props, ref } as ObserverRenderProps<P>),
          realOptions,
        ) as React.ReactNode
      })
    : (props: ObserverRenderProps<P>): React.ReactNode => {
        return useObserver(() => component(props), realOptions) as React.ReactNode
      }

  const memoComponent = memo(wrappedComponent)

  hoistNonReactStatics(memoComponent, component)

  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName
  }

  // 包装组件对 props 完全透传，运行时形状与声明一致；memo×forwardRef×条件类型的
  // 静态形状无法在未解析泛型上证明等价，只能在出口断言到具体类型
  return memoComponent as ObserverComponent<P, Options>
}

export const Observer = observer((props: IObserverProps) => {
  const children
    = typeof props.children === 'function' ? props.children() : props.children
  return <>{children}</>
})
