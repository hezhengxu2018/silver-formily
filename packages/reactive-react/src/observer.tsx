import type React from 'react'
import type { IObserverOptions, IObserverProps } from './types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { forwardRef, memo } from 'react'
import { useObserver } from './hooks/useObserver'

// Keep the original call signature (including generics) and custom statics.
type RenderResult = ReturnType<React.FunctionComponent>
type RenderComponent = (props: any) => RenderResult
type ObserverMetadata = Pick<React.NamedExoticComponent, '$$typeof' | 'displayName'>
type ComponentStatics<C> = Pick<C, Exclude<
  keyof C,
  keyof React.FunctionComponent<any> | keyof React.ExoticComponent | 'type' | 'compare' | 'render'
>>
type WithForwardRef<P> = P & {
  ref?: 'ref' extends keyof P ? P['ref'] : React.Ref<unknown>
}
type ObserverRenderProps<P> = Omit<{ children?: React.ReactNode }, keyof P> & P
type ObserverRenderFunction<P> = (props: ObserverRenderProps<P>) => RenderResult

// This overload also supports observer<Props>(render, { forwardRef: true }).
export function observer<C extends RenderComponent>(
  component: C,
  options: IObserverOptions & { forwardRef: true },
): React.NamedExoticComponent<WithForwardRef<React.ComponentProps<C>>> & ComponentStatics<C>
export function observer<P>(
  component: ObserverRenderFunction<P>,
  options: IObserverOptions & { forwardRef: true },
): React.NamedExoticComponent<WithForwardRef<ObserverRenderProps<P>>>
export function observer<C extends RenderComponent>(
  component: C,
  options?: IObserverOptions & { forwardRef?: false },
): C & ObserverMetadata
// Support explicit <Props, Options> calls. Preserve declared ref props for React 19.
export function observer<P, Options extends IObserverOptions = IObserverOptions>(
  component: ObserverRenderFunction<P>,
  options?: Options,
): React.NamedExoticComponent<ObserverRenderProps<
  Options extends { forwardRef: true } ? WithForwardRef<P> : P
>>
export function observer(component: RenderComponent, options: IObserverOptions = {}): RenderComponent {
  const wrapped = createObserver(component, options)
  if (options.displayName)
    wrapped.displayName = options.displayName
  return wrapped
}

// Exotic components have callable TS types, but are objects at runtime.
// Unwrap only known React wrappers, keeping memo comparators and ref semantics.
interface ExoticComponent {
  $$typeof?: symbol
  type: RenderComponent
  compare: ((previous: any, next: any) => boolean) | null
  render: React.ForwardRefRenderFunction<unknown, any>
}

function createObserver(
  component: RenderComponent,
  options: IObserverOptions,
  memoize = true,
): RenderComponent & { displayName?: string } {
  const exotic = component as unknown as ExoticComponent
  if (exotic.$$typeof === Symbol.for('react.memo')) {
    const wrapped = memo(createObserver(exotic.type, options, false), exotic.compare ?? undefined)
    return hoistNonReactStatics(wrapped, component)
  }

  const isForwardRef = exotic.$$typeof === Symbol.for('react.forward_ref')
  if (!isForwardRef && typeof component !== 'function') {
    throw new TypeError('observer expects a function component, memo, or forwardRef component')
  }

  const wrapped = isForwardRef || options.forwardRef
    ? forwardRef<unknown, any>((props, ref) => useObserver(
        () => isForwardRef ? exotic.render(props, ref) : component({ ...props, ref }),
        options,
      ) as React.ReactNode)
    : (props: any) => useObserver(() => component(props), options)

  // An existing memo already owns props comparison. Adding an inner default
  // memo would incorrectly override a custom comparator that returns false.
  return hoistNonReactStatics(memoize ? memo(wrapped) : wrapped, component)
}

export const Observer = observer((props: IObserverProps) => {
  const children = typeof props.children === 'function' ? props.children() : props.children
  return <>{children}</>
})
